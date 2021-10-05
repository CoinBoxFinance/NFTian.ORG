// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import { IERC721, IERC165 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IArtistNFT {
    function getIsArtistNFT() external view returns (bool);
}

contract SaleBase is IERC721Receiver, AccessControl, ERC1155Holder {
    using Address for address payable;
    
    // ERC721 interface id
    bytes4 constant InterfaceSignature_ERC721 = bytes4(0x80ac58cd);

    // ERC1155 interface id
    bytes4 constant InterfaceSignature_ERC1155 = bytes4(0xd9b67a26);
    
    // address of the platform wallet to which the platform cut will be sent
    address internal platformWalletAddress;
    
    // address of the Artist NFT
    address public artistNFTAddress;

    /**
     * @dev Implementation of ERC721Receiver
     */
    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes memory _data
    ) public override virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /**
     * @dev Internal function to transfer the NFT from this contract to another address
     * @param _nftAddress Address of NFT
     * @param _receiver The address to send the NFT to
     * @param _tokenId ID of the token to transfer
     */
    function _transfer(address _nftAddress, address _receiver, uint256 _tokenId, bool _isERC721, uint256 _amount) internal {
        if(_isERC721) {
            IERC721(_nftAddress).safeTransferFrom(address(this), _receiver, _tokenId);
        } else {
            IERC1155(_nftAddress).safeTransferFrom(address(this), _receiver, _tokenId, _amount, "");
        }
    }

    /**
     * @dev Internal function that calculates the cuts of all parties and distributes the payment among them.
     * If the sale involves an ERC1155 token, the secondarySale will always be false
     * @param _seller Address of the seller
     * @param _platformCut The cut that goes to the Ecchi platform
     * @param _amount The total amount to be split
     */
    function _payout(
        bool _isArtistNFT,
        address payable _seller,
        uint16 _platformCut,
        uint256 _amount
    ) internal {
        // dividing by 1000 because percentages are multiplied by 10 for values < 1%
        uint256 platformAmount = (_platformCut * _amount) / 1000;
        
        // calculate the amount to send to the seller
        uint256 sellerAmount = _amount - (platformAmount);

        _seller.sendValue(sellerAmount);
        payable(platformWalletAddress).sendValue(platformAmount);
    }

    /**
     * @dev External function to allow admin to change the address of the platform wallet
     * @param _address Address of the new wallet
     */
    function setPlatformWalletAddress(address _address) external onlyRole(DEFAULT_ADMIN_ROLE) {
        platformWalletAddress = _address;
    }
    
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155Receiver, AccessControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}