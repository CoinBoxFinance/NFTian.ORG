// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./SaleBase.sol";


/**
 * @title Base auction contract
 * @author Sanan bin Tahir
 * @dev This is the base auction contract which implements the auction functionality
 */
contract AuctionBase is SaleBase {
    using Address for address payable;

    // auction struct to keep track of the auctions
    struct Auction {
        bool isArtistNFT;
        bool isERC721;
        address seller;
        address nftContract;
        address buyer;
        uint128 currentPrice;
        uint64 duration;
        uint64 startedAt;
        uint16 platformCut;
        uint256 amount; // only relevant for ERC1155
    }

    // mapping for tokenId to its auction
    mapping (address => mapping(uint256 => Auction)) tokenIdToAuction;
    
    // The minimum percentage difference between the last bid amount and the current bid.
    uint8 public minBidIncrementPercentage = 50;

    event AuctionCreated(bool isArtistNFT, bool isERC721, uint256 amount, uint256 tokenId, uint256 startingPrice, uint64 startingTime, uint256 duration, address seller, uint16 platformCut);
    event AuctionSuccessful(uint256 tokenId, uint256 totalPrice, uint256 duration, address winner, address seller, uint16 platformCut);
    event BidCreated(uint256 tokenId, uint256 totalPrice, uint256 duration, address winner, address seller);

    /**
     * @dev Add the auction to the mapping and emit the AuctionCreated event, duration must meet the requirements
     * @param _tokenId ID of the token to auction
     * @param _auction Reference to the auction struct to add to the mapping
     */
    function _addAuction(uint256 _tokenId, Auction memory _auction) internal {
        // check minimum and maximum time requirements
        require(_auction.duration >= 1 hours && _auction.duration <= 30 days, "time requirement failed");

        // update mapping
        tokenIdToAuction[_auction.nftContract][_tokenId] = _auction;

        // emit event
        emit AuctionCreated(
            _auction.isArtistNFT,
            _auction.isERC721,
            _auction.amount,
            _tokenId,
            _auction.currentPrice,
            _auction.startedAt,
            _auction.duration,
            _auction.seller,
            _auction.platformCut
        );
    }

    /**
     * @dev Remove the auction from the mapping (sets everything to zero/false)
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to remove auction of
     */
    function _removeAuction(address _nftAddress, uint256 _tokenId) internal {
        delete tokenIdToAuction[_nftAddress][_tokenId];
    }

    /**
     * @dev Internal function to check the current price of the auction
     * @param auction Reference to the auction to check price of
     * @return uint128 The current price of the auction
     */
    function _currentPrice(Auction storage auction) internal view returns (uint128) {
        return (auction.currentPrice);
    }

    /**
     * @dev Internal function to return the bid to the previous bidder if there was one
     * @param _destination Address of the previous bidder
     * @param _amount Amount to return to the previous bidder
     */
    function _returnBid(address payable _destination, uint256 _amount) private {
        // zero address means there was no previous bidder
        if (_destination != address(0)) {
            _destination.sendValue(_amount);
        }
    }

    /**
     * @dev Internal function to check if an auction started. By default startedAt is at 0
     * @param _auction Reference to the auction struct to check
     * @return bool Weather the auction has started
     */
    function _isOnAuction(Auction storage _auction) internal view returns (bool) {
        return (_auction.startedAt > 0 && _auction.startedAt <= block.timestamp);
    }

    /**
     * @dev Internal function to implement the bid functionality
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to bid upon
     * @param _bidAmount Amount to bid
     */
    function _bid(address _nftAddress, uint _tokenId, uint _bidAmount) internal {
        // get reference to the auction struct
        Auction storage auction = tokenIdToAuction[_nftAddress][_tokenId];

        // check if the item is on auction
        require(_isOnAuction(auction), "Item is not on auction");

        // check if auction time has ended
        uint256 secondsPassed = block.timestamp - auction.startedAt;
        require(secondsPassed <= auction.duration, "Auction time has ended");

        // check if bid is higher than the previous one
        uint256 price = auction.currentPrice;
        require(_bidAmount > price, "Bid is too low");
        require(_bidAmount >= (price + ((price * minBidIncrementPercentage) / 1000)),
        "increment not met");

        // return the previous bidder's bid amount
        _returnBid(payable(auction.buyer), auction.currentPrice);

        // update the current bid amount and the bidder address
        auction.currentPrice = uint128(_bidAmount);
        auction.buyer = msg.sender;

        // if the bid is made in the last 15 minutes, increase the duration of the
        // auction so that the timer resets to 15 minutes
        uint256 timeRemaining = auction.duration - secondsPassed;
        if (timeRemaining <= 15 minutes) {
            uint256 timeToAdd = 15 minutes - timeRemaining;
            auction.duration += uint64(timeToAdd);
        }
        
        emit BidCreated(
            _tokenId,
            auction.currentPrice,
            auction.duration,
            auction.buyer,
            auction.seller
            );
    }

    /**
     * @dev Internal function to finish the auction after the auction time has ended
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to finish auction of
     */
    function _finishAuction(address _nftAddress, uint256 _tokenId) internal {
        // using storage for _isOnAuction
        Auction storage auction = tokenIdToAuction[_nftAddress][_tokenId];

        // check if token was on auction
        require(_isOnAuction(auction), "Token was not on auction");

        // check if auction time has ended
        uint256 secondsPassed = block.timestamp - auction.startedAt;
        require(secondsPassed > auction.duration, "Auction hasn't ended");

        // using struct to avoid stack too deep error
        Auction memory referenceAuction = auction;
        address _nftContract = auction.nftContract;

        // delete the auction
        _removeAuction(_nftAddress, _tokenId);

        // if there was no successful bid, return token to the seller
        if (referenceAuction.buyer == address(0)) {
            _transfer(_nftContract, referenceAuction.seller, _tokenId, referenceAuction.isERC721, referenceAuction.amount);

            emit AuctionSuccessful(
                _tokenId,
                0,
                referenceAuction.duration,
                referenceAuction.seller,
                referenceAuction.seller,
                referenceAuction.platformCut
            );
        }
        // if there was a successful bid, pay the seller and transfer the token to the buyer
        else {
            _payout(
                referenceAuction.isArtistNFT,
                payable(referenceAuction.seller),
                referenceAuction.platformCut,
                referenceAuction.currentPrice
            );
            _transfer(_nftContract, referenceAuction.buyer, _tokenId, referenceAuction.isERC721, referenceAuction.amount);

            emit AuctionSuccessful(
                _tokenId,
                referenceAuction.currentPrice,
                referenceAuction.duration,
                referenceAuction.buyer,
                referenceAuction.seller,
                referenceAuction.platformCut
            );
        }
    }

    /**
     * @dev This is an internal function to end auction meant to only be used as a safety
     * mechanism if an NFT got locked within the contract. Can only be called by the super admin
     * after a period of 7 days has passed since the auction ended
     * @param _nftAddress Address of NFT
     * @param _tokenId Id of the token to end auction of
     * @param _nftBeneficiary Address to send the NFT to
     * @param _paymentBeneficiary Address to send the payment to
     */
    function _forceFinishAuction(
        address _nftAddress, 
        uint256 _tokenId,
        address _nftBeneficiary,
        address _paymentBeneficiary
    )
    internal
    {
        // using storage for _isOnAuction
        Auction storage auction = tokenIdToAuction[_nftAddress][_tokenId];

        // check if token was on auction
        require(_isOnAuction(auction), "Token was not on auction");

        // check if auction time has ended
        uint256 secondsPassed = block.timestamp - auction.startedAt;
        require(secondsPassed > auction.duration, "Auction hasn't ended");

        // check if its been more than 7 days since auction ended
        require(secondsPassed - auction.duration >= 7 days);

        // using struct to avoid stack too deep error
        Auction memory referenceAuction = auction;

        // delete the auction
        _removeAuction(_nftAddress, _tokenId);

        // transfer ether to the beneficiary
        payable(_paymentBeneficiary).sendValue(referenceAuction.currentPrice);

        // transfer nft to the nft beneficiary
        _transfer(referenceAuction.nftContract, _nftBeneficiary, _tokenId, referenceAuction.isERC721, referenceAuction.amount);

        emit AuctionSuccessful(
            _tokenId,
            0,
            referenceAuction.duration,
            _nftBeneficiary,
            _paymentBeneficiary,
            referenceAuction.platformCut
        );
    }
}


/**
 * @title Auction sale contract that provides external functions
 * @author Sanan bin Tahir
 * @dev Implements the external and public functions of the auction implementation
 */
contract AuctionSale is AuctionBase {
    // sanity check for the nft contract
    bool public isEcchiSaleAuction = true;

    /**
     * @dev Internal function to create auction.
     * @param _isArtistNFT If this NFT is an artist NFT (different fees)
     * @param _isERC721 If this token is an ERC721 token
     * @param _tokenId ID of the token to create auction for
     * @param _amount Amount of tokens in this sale (only relevant for ERC1155)
     * @param _nftAddress Address of NFT
     * @param _startingPrice Starting price of the auction in wei
     * @param _duration Duration of the auction in seconds
     * @param _seller Address of the seller of the NFT
     * @param _platformCut The cut that goes to the platform if it is a primary sale
     */
    function createAuctionSale(
        bool _isArtistNFT,
        bool _isERC721,
        uint256 _tokenId,
        uint256 _amount, // only relevant for ERC1155
        address _nftAddress, 
        uint128 _startingPrice,
        uint64 _startingTime,
        uint64 _duration,
        address _seller,
        uint16 _platformCut
    )
    internal
    {
        // create and add the auction
        Auction memory auction = Auction(
            _isArtistNFT,
            _isERC721,
            _seller,
            _nftAddress,
            address(0),
            uint128(_startingPrice),
            uint64(_duration),
            _startingTime,
            _platformCut,
            _amount
        );
        _addAuction(_tokenId, auction);
    }

    /**
     * @dev External payable bid function. Sellers can not bid on their own artworks
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to bid on
     */
    function bid(address _nftAddress, uint256 _tokenId) external payable {
        // do not allow sellers to bid on their own artwork
        require(tokenIdToAuction[_nftAddress][_tokenId].seller != msg.sender,
            "Sellers not allowed");

        _bid(_nftAddress, _tokenId, msg.value);
    }

    /**
     * @dev External function to finish the auction. Currently can be called by anyone
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to finish auction of
     */
    function finishAuction(address _nftAddress, uint256 _tokenId) external {
        _finishAuction(_nftAddress, _tokenId);
    }

    /**
     * @dev External view function to get the details of an auction
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to get the auction information of
     * @return seller Address of the seller
     * @return buyer Address of the buyer
     * @return currentPrice Current Price of the auction in wei
     * @return duration Duration of the auction in seconds
     * @return startedAt Unix timestamp for when the auction started
     */
    function getAuction(address _nftAddress, uint256 _tokenId)
    external
    view
    returns
    (
        address seller,
        address buyer,
        uint256 currentPrice,
        uint256 duration,
        uint256 startedAt
    ) {
        Auction storage auction = tokenIdToAuction[_nftAddress][_tokenId];
        require(_isOnAuction(auction));
        return (
        auction.seller,
        auction.buyer,
        auction.currentPrice,
        auction.duration,
        auction.startedAt
        );
    }

    /**
     * @dev External view function to get the current price of an auction
     * @param _nftAddress Address of NFT
     * @param _tokenId ID of the token to get the current price of
     * @return uint128 Current price of the auction in wei
     */
    function getCurrentPrice(address _nftAddress, uint256 _tokenId)
    external
    view
    returns (uint128)
    {
        Auction storage auction = tokenIdToAuction[_nftAddress][_tokenId];
        require(_isOnAuction(auction));
        return _currentPrice(auction);
    }

    /**
     * @dev This is an internal function to end auction meant to only be used as a safety
     * mechanism if an NFT got locked within the contract. Can only be called by the super admin
     * after a period f 7 days has passed since the auction ended
     * @param _nftAddress Address of NFT
     * @param _tokenId Id of the token to end auction of
     * @param _nftBeneficiary Address to send the NFT to
     * @param _paymentBeneficiary Address to send the payment to
     */
    function forceFinishAuction(
        address _nftAddress, 
        uint256 _tokenId,
        address _nftBeneficiary,
        address _paymentBeneficiary
    )
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _forceFinishAuction(_nftAddress, _tokenId, _nftBeneficiary, _paymentBeneficiary);
    }
}