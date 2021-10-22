import { Button, Dropdown, Modal, Nav} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useMoralis,useMoralisFile } from "react-moralis";
import axios from 'axios';  
import 'react-tabs/style/react-tabs.css';
import React,{useState} from "react";
import {nftAbi,marketAbi} from "./abi";
import { formValidation } from '../_services';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ethers } from 'ethers'
import profile from "../images/profile/pro.jpg"
import cover from "../images/profile/cover.jpg"
import {
    nftaddress, nftmarketaddress
  } from './config'
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { useParams } from 'react-router-dom';
  import { NFTStorage, File } from 'nft.storage'
  import { IpfsUrl } from 'react-ipfs-url';
  import { LoadingSpinerComponent } from '../components/common/loader';
const Author = () => {
    const { web3, enableWeb3,user,Moralis } = useMoralis()
    const [tokenContractAddress, settokenContractAddress] = React.useState();
    const [marketContractAddress, setMarketContractAddress] = React.useState();
    const [imageFile, setimageFile] = React.useState();
    const [imageFileshow, setimageFileshow] = React.useState();
    const [profileFile, setprofileFile] = React.useState();
    const [profileFileshow, setprofileFileshow] = React.useState();
    const [coverFile, setcoverFile] = React.useState();
    const [coverFileshow, setcoverFileshow] = React.useState();
    const [name, setname] = React.useState('');
    const [price, setprice] = React.useState();
    const [description, setdescription] = React.useState();
    const [selectedcat, setselectedcat] = React.useState('Art');
    const [myitems, setMyitems] = React.useState();
    const [ERR, setErrs] = React.useState();
    const [currentUserAddress, setusrAddress] = React.useState();
    const [message1, setmessage1] = React.useState('');
    const [message2, setmessage2] = React.useState('');
    const [marketItems,setMarketitems] = React.useState([]);
    const [myNftitems,setMyNftitems] = React.useState([]);
    const [nftType , setNftType] = React.useState("fixed_price");
    const [copy , setCopy] = React.useState(false);
    const[loader,setLoader]=useState(false)
    const [ERRs, setERR] = React.useState('');
    const [show, setShow] = useState(false);
    const [showm, setshowmodale] = React.useState(false);
    const [username, setusername] = React.useState('');
    const [fname, setfname] = React.useState('');
    const [lname, setlname] = React.useState('');
    const [email, setemail] = React.useState('');
    const [social1, setsocial1] = React.useState('');
    const [social2, setsocial2] = React.useState('');
    const [nameAuction, setNameAuction] = React.useState('');
    const [descriptionAuction, setDescriptionAuction] = React.useState('');
    const [minBid, setMinBid] = React.useState('');
    const [startDate , setStartDate] = React.useState(new Date());
    const [endDate , setEndDate] = React.useState('');
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const TOKEN_CONTRACT_ADDRESS = "0x16e2715443373a907416206D80eA42e424Fd683f";
  const { userWalletAddress } = useParams();
  console.log("userWalletAddress",userWalletAddress);
  const queryParams = new URLSearchParams(window.location.search);
  const tabSelected = queryParams.get('tab');
  
  const handleClosem = () => setshowmodale(false);
  console.log("tabtabSelected",tabSelected);
 

    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4QUI4NmU3NWNEZDkyZUQ2RmFiOTIxNEI1NDhkNDlmMTNENWFEODkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDU0MTc3OTg3MywibmFtZSI6ImNiZmkifQ.LOyAxxdCPLhoT3rAnMJrVkzSqzsQ1GVRP3ic_l7ZC7o';
    const client = new NFTStorage({ token: apiKey })
    const ipfs = client;
  
  const formerrors = {
         name:"",
         image:"",
         description:"",
         price:"",
         formIsValid:false,

     }
      let Categories = ["Art"," Trading Cards","Gaming","Music","Tweets"," Rare Item","Collectibles","NFT Gifts"];
        let icons = ["icofont-vector-path"," icofont-penalty-card","icofont-ui-game","icofont-music-disk","icofont-twitter","icofont-bill",
        " icofont-box","icofont-gift"];
            
      let Cat = []
      if(Categories){
          Cat =  Categories.map(function(c, index){
              let classname = "item-cat-btn"
              if(c == selectedcat){
                // alert(c+"=="+ selectedcat)
                classname= "item-cat-btn active"
              }
          return(<li class={
            classname
          }
onClick={()=>selectcat(c)} id={c}>
          <span><i class={icons[index]}></i></span>
          {c}
      </li>)
      
          })
         } 

         const openTab = (tab_link) => {
            console.log("tab_link----",tab_link);
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?tab='+tab_link;
            window.history.pushState({path:newurl},'',newurl);
            check_active_tab(tab_link);
            if(tab_link== "created"){
                console.log("in created tab and getitems going to call");
                getitems()
            }

         }
         const openDetail = (token_id) => {
            console.log("token_id",token_id);
            window.location.href = "/nft/"+token_id;
         }
         const errorsp = {
            email: "",
            firsname:"",
            lastname:"",
            link1:"",
            link2:"",
           formIsValid:false,
         };
       
         const createprofile = async () => {
            // console.log(user,"=====current");
           
            // setLoader(true)
            let params = {
                "username":username,
                "firstname":fname,
                "lastname":lname,
                "email":email,
                "social_link1":social1,
                "social_link2":social2,
                
            }
            
            let validate = formValidation.createprofile(params,errorsp);
            setERR(validate)
            if(validate.formIsValid){
                setLoader(true)
            user.set("username", username);
            user.set("firstname", fname);
            user.set("lastname", lname);
            user.set("email", email);
            user.set("social_link1", social1);
            user.set("social_link2", social2);
          
            await user.save() .then((response) => {
               
                
                    console.log("Sucessfully updated")
                    console.log(response)
                    setLoader(false)
                    setshowmodale(false)
                
            })
            .catch((err) => {
                setLoader(true)
                console.log("Failed update")
                //  console.log(error)
                console.error("Error signing in.", err.toString());
            // setErrorMsg(response.toString());
            })
        }
           
          };   

const selectcat = (c)=>{
    // const currentClass = document.getElementsByClassName("item-cat-btn");
    // for (let i = 0; i < currentClass.length; i++) {
    //   currentClass[i].classList.toggle("active");
    //   console.log(currentClass[i]);
    // }
    setselectedcat(c)   
}
    function checkfile(file_img){
		var get_ext = file_img.name.split('.');
		
		 var exts = ['png','jpg','jpeg','gif'];
		  get_ext = get_ext.reverse();
		 
		  var a = exts.indexOf(get_ext[0].toLowerCase());
		
		  if (a > -1 ){
		// alert( 'Allowed extension!' );
		  return true;
		  } else {
	   
			alert("Please select a valid image file")
		   return false;
		  }
		}


function date_diff_from_now(date_future_time_stamp){
    let date_future = date_future_time_stamp*1000;
// get total seconds between the times
let date_now = new Date();
var delta = Math.abs(date_future - date_now) / 1000;

// calculate (and subtract) whole days
var days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;  // in theory the modulus is not required
    let hsh = {};
    hsh.days = days;
    hsh.hours = hours;
    hsh.minutes = minutes;
    hsh.seconds = Math.floor(seconds);
    return hsh;

}
const saveprofileimage= async(file)=>{
    console.log("00000000")
    const data = file
    const files = new Moralis.File(data.name, data);
    await files.saveIPFS();
    const nftFileMetadataFilePath = files.ipfs();
    user.set("profile",nftFileMetadataFilePath)
     console.log(nftFileMetadataFilePath)
     await user.save() .then((response) => {
         setprofileFileshow(nftFileMetadataFilePath)
         console.log(response)
      })  .catch((err) => { })
   
}
const savecoverimage= async(file)=>{
   
    const data = file
    const files = new Moralis.File(data.name, data);
    await files.saveIPFS();
    const nftFileMetadataFilePath = files.ipfs();
    user.set("cover",nftFileMetadataFilePath)
  
     console.log(nftFileMetadataFilePath)
     await user.save() .then((response) => {
        setcoverFileshow(nftFileMetadataFilePath)
        console.log(response)
     })  .catch((err) => { })
   
}

function readURLprofile(input) {
    //
   
    if (input.files && input.files[0]) {
      var filetype = checkfile(input.files[0]);
       if(filetype===true){
           setprofileFile(input.files[0])
           saveprofileimage(input.files[0])
        var reader = new FileReader();
        reader.onload = function(e) {
            setprofileFileshow(e.target.result)
          }
        reader.readAsDataURL(input.files[0]);
        //console.log(formData)
      }
    }
    // openModalcrop()
}
function readURLcover(input) {
    //
   
    if (input.files && input.files[0]) {
      var filetype = checkfile(input.files[0]);
       if(filetype===true){
           setcoverFile(input.files[0])
           savecoverimage(input.files[0])
        var reader = new FileReader();
        reader.onload = function(e) {
            setcoverFileshow(e.target.result)
          }
        reader.readAsDataURL(input.files[0]);
        //console.log(formData)
      }
    }
    // openModalcrop()
}
	function readURL(input) {
		//
		if (input.files && input.files[0]) {
		  var filetype = checkfile(input.files[0]);
		   if(filetype===true){
               setimageFile(input.files[0])
              
            var reader = new FileReader();
			reader.onload = function(e) {
				setimageFileshow(e.target.result)
			  }
			reader.readAsDataURL(input.files[0]);
			//console.log(formData)
		  }
		}
		// openModalcrop()
	}
//create item 

function check_active_tab(tabSelected){
    if(tabSelected == "create"){
        setSelectedTabIndex(0)
      }else if(tabSelected == "sale"){
        setSelectedTabIndex(1)
      }else if(tabSelected == "owned"){
        setSelectedTabIndex(2)
      }else if(tabSelected == "created"){
        setSelectedTabIndex(3)
      }else if(tabSelected == "collection"){
        setSelectedTabIndex(4)
      }
      else{
    
      } 
}


React.useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const tabSelected = queryParams.get('tab');
    console.log("tabtabSelected",tabSelected);
    check_active_tab(tabSelected);
   


    if(user && user.get('profile')){
       
        setprofileFileshow(user.get('profile'))
    }else{
        setprofileFileshow(profile)  
    }
        
    if(user && user.get('cover')){
       
        setcoverFileshow(user.get('cover'))
    }else{
        setcoverFileshow(cover)  
    }
     if(user){
        if(user.get('profile')){
           
            setprofileFileshow(user.get('profile'))
        }
        if(user.get('cover')){
           
            setcoverFileshow(user.get('cover'))
        }
        if(user.get('firstname')){
           
            setfname(user.get('firstname'))
        }
        if(user.get('lastname')){
           
            setlname(user.get('lastname'))
        }
        if(user.get('email')){
           
            setemail(user.get('email'))
        }
        if(user.get('social_link1')){
           
            setsocial1(user.get('social_link1'))
        }
        if(user.get('social_link2')){
           
            setsocial1(user.get('social_link2'))
        }
        if(user.get('username')){
           
            setusername(user.get('username'))
        }
        
        const userAddress = user.get('ethAddress');
        setusrAddress(userAddress)


            getitems(userAddress);


       } 
    
    // console.log("this.props.location.search",this.props);
    // console.log("------------------------999999999999999",ethers.utils.parseEther("1.0"))
    init();
    
    //  getitems()
  }, [user]);
//   const init = () => {
//     enableWeb3()
   
//     console.log(tokenContractAbi,"===tokenContractAbi")
//     console.log("-----tokenContract",TOKEN_CONTRACT_ADDRESS)
//     const tokenContract = new web3.eth.Contract(tokenContractAbi, TOKEN_CONTRACT_ADDRESS);
  
//     settokenContractAddress(tokenContract)
  
//   }
const clipto = () => {
    setCopy(true)
    setTimeout(function(){ setCopy(false) }, 500);
}

const init = async () => {
    // hideElement(userItemsSection);
  
  const web3 = await Moralis.Web3.enable();
//   console.log("abiiii",tokenContractAbi)
  const tokenContract = new web3.eth.Contract(nftAbi, nftaddress);
  const marketContract = new web3.eth.Contract(marketAbi,nftmarketaddress)
  var  user = await Moralis.User.current();
  console.log("user===>",user)
  if(user){
    // if(user.get('profile')){
       
    //     setprofileFileshow(user.get('profile'))
    // }
    // if(user.get('cover')){
       
    //     setcoverFileshow(user.get('cover'))
    // }
    // if(user.get('firstname')){
       
    //     setfname(user.get('firstname'))
    // }
    // if(user.get('lastname')){
       
    //     setlname(user.get('lastname'))
    // }
    // if(user.get('email')){
       
    //     setemail(user.get('email'))
    // }
    // if(user.get('social_link1')){
       
    //     setsocial1(user.get('social_link1'))
    // }
    // if(user.get('social_link2')){
       
    //     setsocial1(user.get('social_link2'))
    // }
    // if(user.get('username')){
       
    //     setusername(user.get('username'))
    // }
    
    const userAddress = user.get('ethAddress');
    setusrAddress(userAddress)
    settokenContractAddress(tokenContract)
    setMarketContractAddress(marketContract);
  }  


//  loadNFTs(tokenContract,marketContract)
//  loadMyNfts(tokenContract,marketContract)
//  fetchMyNFTs

}

  const createItem = async () => {
    handleShow()
    setmessage1("Initiating")
    setmessage2("Image saving to IPFS");
    let params,validate;
    if(nftType == "fixed_price"){
        params = { name:name, image:imageFile,description:description, price:price }
        validate = formValidation.item_validation(params,formerrors);
    }else{
        
        params = { name:nameAuction, image:imageFile,description:descriptionAuction }
        console.log("description auction",descriptionAuction);
        validate = formValidation.item_validation_auction(params,formerrors);
    }
    console.log("params")
    console.log("validate",validate);
    if(validate.formIsValid){
    var attributes = [{
        "trait_type" : "Category",
        "value" : selectedcat,
    },
    {
        "trait_type" : "Price",
        "value" : price,
    }
]
console.log("imaged going to saved");

console.log("imagefile",imageFile);
const metadata = await client.store({
    name: params.name,
    description: params.description,
    image: imageFile,
    attribute:attributes
  })

  console.log("image saved");
  console.log("metadata.url",metadata.url)


    //  const nftFile = new Moralis.File("nftFile.jpg",imageFile);
    //  await nftFile.saveIPFS();
     setmessage2("Image saved to IPFS");
    console.log("imaged saved");
    // const nftFilePath = nftFile.ipfs();
//  const nftFile = saveFile("nftFile.jpeg", imageFile.files[0], { saveIPFS: true });
   
//    const  nftFilePath = nftFile.ipfs

    // const metadata = {
    //     name: params.name,
    //     description: params.description,
    //     image: nftFilePath,
    //     attribute:attributes

    // };
    setmessage2("Waiting for approval");
    // const  nftFileMetadataFile = saveFile("metadata.json", {base64 : btoa(JSON.stringify(metadata))}, { saveIPFS: true });
//  const nftFileMetadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
//      await nftFileMetadataFile.saveIPFS()

    //  const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();
    //  console.log(nftFileMetadataFilePath)

    const nftId = await mintNft(metadata.url);


}else{
    setErrs(validate)  
}
}


const clearfields = () =>{
    setname('')
    setdescription('')
    setprice('')
    setimageFile('')
    setselectedcat("Art")
    setimageFileshow()
}



  const mintNft = async (metadataUrl) => {
    var  user = await Moralis.User.current();
    const userAddress = user.get('ethAddress');
    console.log(userAddress)
    console.log(tokenContractAddress)
 await tokenContractAddress.methods.createToken(metadataUrl).send({from: userAddress}) 
.on("transactionHash", function (hash) {
    // handleShow()
    setmessage1("Initiating")
    setmessage2("Waiting for reciept.")
    console.log("Hash",hash);
})
.on("receipt", function (tx) {
    console.log("receipt mint",tx);

// let tokenId = tx.events.Transfer.returnValues.tokenId;
    setmessage1("Got reciept!!")
    // setmessage2("waiting for confirmation!!")
    setmessage2("Transaction submitted. Item will be available in your profile once we receive a blockchain confirmation.");
    // addToMarket(tokenId);
//    console.log("receipt",receipt);
})
.on("confirmation", function (conf) {
    console.log("confirmedddd mint",conf);
    setmessage1("")
    setmessage2("Confirmed!!")
    
    setTimeout(() => {
        clearfields()
        handleClose()
        window.location.href="/user/"+userAddress+"?tab=created";
        getitems()
        // alert("send to detail page");
    }, 1000);
  
})
.on("error", async function (error) {
    console.log("Error",error);
});

    // return receipt.events.Transfer.returnValues.tokenId;
}


const addToMarket = async (tokenId) => {
    console.log("start addming market");
    var  user = await Moralis.User.current();
    const userAddress = user.get('ethAddress');
    console.log(userAddress)
    console.log(tokenContractAddress)
    console.log("get price",price);
    var tmp_listing_price = ethers.utils.parseUnits("0.025", 'ether');
    if (nftType == "fixed_price"){
    let price_eth = ethers.utils.parseUnits(price, 'ether')
    console.log("price_eth",price_eth);

    
    

        await marketContractAddress.methods.createMarketItem(nftaddress, tokenId, price_eth).send({from: userAddress , value: tmp_listing_price })
        .on("transactionHash", function (hash) {
            handleShow()
            setmessage1("Initiating")
            setmessage2("Waiting for reciept.")
            console.log("Hash",hash);
        })
        .on("receipt", function (tx) {
            console.log("receipt market",tx);
            setmessage1("Got reciept!!")
            setmessage2("waiting for confirmation!!")
            setTimeout(() => {
                console.log("timeouttttt");
                clearfields()
                handleClose()
            }, 5000);
        })
        .on("confirmation", function (conf) {
            console.log("confirmedddd market",conf);
            setmessage1("")
            setmessage2("Confirmed!!")
        
        })
        .on("error", async function (error) {
            console.log("Error market",error);
        });
    }else{
       let price_eth = ethers.utils.parseUnits("1", 'ether')
        console.log("price_eth",price_eth);
    console.log("creating sale auctionnnn");

    let start_date_send = startDate.getTime();
    let start_date_sendTimestamp = Math.floor(start_date_send / 1000);
    let end_date_send = endDate.getTime();
    let end_date_sendTimestamp = Math.floor( end_date_send / 1000);
console.log("start_date_sendTimestamp",start_date_sendTimestamp);
console.log("end_date_sendTimestamp",end_date_sendTimestamp);

        await marketContractAddress.methods.createMarketItemAuction(nftaddress, tokenId, price_eth ,start_date_sendTimestamp , end_date_sendTimestamp ).send({from: userAddress , value: tmp_listing_price })
        .on("transactionHash", function (hash) {
            handleShow()
            setmessage1("Initiating")
            setmessage2("Waiting for reciept.")
            console.log("Hash",hash);
        })
        .on("receipt", function (tx) {
            console.log("receipt market",tx);
            setmessage1("Got reciept!!")
            setmessage2("waiting for confirmation!!")
            setTimeout(() => {
                console.log("timeouttttt");
                clearfields()
                handleClose()
            }, 5000);
        })
        .on("confirmation", function (conf) {
            console.log("confirmedddd market",conf);
            setmessage1("")
            setmessage2("Confirmed!!")
        
        })
        .on("error", async function (error) {
            console.log("Error market",error);
        });


    }



    // return receipt.events.Transfer.returnValues.tokenId;
}


//creted listing
const getitems = (address_on_load = null) => {
    console.log("get items calleddddddd");

    const userAddress = currentUserAddress;
    // const token = "0xAdD3D936A8EC1A4969bA73e19815cad2B7CDb086";
    // alert(userAddress)
    console.log("userAddress",userAddress)
    let tmp_adr = userAddress || address_on_load
    console.log("nftaddress",nftaddress)
    let url =  `https://deep-index.moralis.io/api/v2/`+tmp_adr+`/nft/`+nftaddress+`?chain=rinkeby&format=decimal`;
    const headers = {  headers: {"X-API-Key": "3Ur7Kdm9AtnEnIt6haF5rEFGy2gzRFRUwVI4HxtYCJJq38su3dxYEsHpxk1v5Lip"} }
      axios.get(url,headers).then(function (response) {
        console.log("response.dataaaaaaaaaaaa",response.data)
        setMyitems(response.data.result)
    }).catch(error => {
    });
    // loadNFTs()


   }

   async function loadNFTs(tokenContract,marketContract) {
    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()

    // const provider = new ethers.providers.Web3Provider(connection)    
    // const signer = provider.getSigner()

    // let contract = new ethers.Contract(nftaddress, NFT.abi, signer)


    // const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    // // const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    // const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    console.log("marketContract",marketContract)
    const fetch_market_items = await marketContract.methods.fetchMarketItems().call()
    console.log("dataaaaaaaa market contract address",fetch_market_items);
    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(fetch_market_items.map(async i => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()
        
      //   const tokenUri = 1;
      const meta = await axios.get(tokenUri)
    //   debugger
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: parseInt(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        startingTime: i.startingTime,
        is_auction: i.is_auction,
        endTime: i.endTime
      }
      return item
    }))
    console.log("itemsssssssss 1",items);
    // setNfts(items)
    setMarketitems(items);
    // setLoadingState('loaded') 
  }



   async function loadMyNfts(tokenContract,marketContract) {
    console.log("marketContract",marketContract)
    const fetch_market_items = await marketContract.methods.fetchMyNFTs().call()
    console.log("dataaaaaaaa loadMyNfts",fetch_market_items);
    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(fetch_market_items.map(async i => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()
        
      //   const tokenUri = 1;
      const meta = await axios.get(tokenUri)
    //   debugger
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: parseInt(i.tokenId),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    console.log("itemsssssssss",items);
    // setNfts(items)
    setMyNftitems(items);
    // setLoadingState('loaded') 
  }


//   bidNft

async function bidNft(nft) {
    console.log("nft bidNft",nft);
  /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  // const web3Modal = new Web3Modal()
  // const connection = await web3Modal.connect()
  // const provider = new ethers.providers.Web3Provider(connection)
  // const signer = provider.getSigner()
  // const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  
  // /* user will be prompted to pay the asking proces to complete the transaction */
  // const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
  // const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
  //   value: price
  // })
  // await transaction.wait()
  // loadNFTs()
  try {

      handleShow()
      setmessage1("Initiating")
      setmessage2("Waiting for approval.")
      const price_buy = ethers.utils.parseUnits(nft.price.toString(), 'ether')
      console.log("price",price_buy);
      console.log("nftaddress",nftaddress);
      console.log("nft.tokenId",nft.tokenId);

       await marketContractAddress.methods.createMarketSale(nftaddress, nft.tokenId).send({from: currentUserAddress , value: price_buy })
       setmessage2("successfully bid");
       setTimeout(() => {
          console.log("timeouttttt");
          handleClose()
      }, 2000);
    } catch (error) {
      alert("something went wrong")
      window.location.reload();
    }


}


  async function buyNft(nft) {
      console.log("nft buy",nft);
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()
    // const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    
    // /* user will be prompted to pay the asking proces to complete the transaction */
    // const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    // const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    //   value: price
    // })
    // await transaction.wait()
    // loadNFTs()
    try {

        handleShow()
        setmessage1("Initiating")
        setmessage2("Waiting for approval.")
        const price_buy = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        console.log("price",price_buy);
        console.log("nftaddress",nftaddress);
        console.log("nft.tokenId",nft.tokenId);
        
         await marketContractAddress.methods.createMarketSale(nftaddress, nft.tokenId).send({from: currentUserAddress , value: price_buy })
         setmessage2("successfully transferred to account")
         setTimeout(() => {
            console.log("timeouttttt");
            handleClose()
        }, 2000);
      } catch (error) {
        alert("something went wrong")
        window.location.reload();
      }


  }





   let createdItems = []
   if(myitems){
       createdItems = myitems.map(function(item,index){
        console.log("createdItemssss",createdItems)
        let itemdata  = JSON.parse(item.metadata);
      
    if(itemdata){
        console.log("itemdatasssss",itemdata);
        let attri = []
        attri  = itemdata.attribute.map(function(item1,index){
            return(<><p>{item1.trait_type}:
                <span
                    class="yellow-color">{item1.value}
                   {item1.trait_type=="Category"?(<></>):(<>ETH</>)} </span>
            </p><br></br></>)
                })
           return (  <div class="col-lg-4 col-sm-6">
           <div class="nft-item" onClick={() => openDetail(item.token_id)} >
               <div class="nft-inner">
                   
                   <div class="nft-item-top d-flex justify-content-between align-items-center">
                       <div class="author-part">
                           <ul class="author-list d-flex">
                            
                               <li
                                   class="single-author d-flex align-items-center">
                                  
                                   <h6><a href="/user">{item.owner_of}</a>
                                   </h6>
                               </li>
                           </ul>
                       </div>
                       <div class="more-part">
                           <div class=" dropstart">
                               <a class=" dropdown-toggle"
                                   href="#" role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false"
                                   data-bs-offset="25,0">
                                   <i
                                       class="icofont-flikr"></i>
                               </a>

                               <ul class="dropdown-menu">
                                   <li><a class="dropdown-item"
                                           href="#"><span>
                                               <i
                                                   class="icofont-warning"></i>
                                           </span> Report </a>
                                   </li>
                                   <li><a class="dropdown-item"
                                           href="#"><span><i
                                                   class="icofont-reply"></i></span>
                                           Share</a></li>
                               </ul>
                           </div>
                       </div>
                   </div>
                   
                   <div class="nft-item-bottom">
                       <div class="nft-thumb">

                       <IpfsUrl ipfs={ ipfs } input={itemdata.image} >
        { ({ status, value }) => (
            <>
                { status === 'pending' && 'Loading...' }
                { status === 'rejected' && 'Oops, failed to load' }
                { status === 'fulfilled' && <img src={ value } alt="" /> }
            </ >
        ) }
    </IpfsUrl>


                       {/* {itemdata.image?(<img src={itemdata.image} alt="" />):(<img src={require('../images/nft-item/03.gif') .default} alt="" />)} */}
                
                         

                       </div>
                       <div class="nft-content">
                          {itemdata.name?( <h4><a href="/nftdetails">{itemdata.name}</a> </h4>):(<></>)}
                           <div
                               class="price-like d-flex justify-content-between align-items-center">
                                  
                               {attri}


                               {/* <a href="#" class="nft-like"><i
                                       class="icofont-heart"></i>
                                   230</a> */}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>)
    }
      })
   } 

    return(
        <>
         
    <section class="profile-section padding-top padding-bottom">
    <LoadingSpinerComponent promiseInProgress={loader} />
        <div class="container">
            <div class="section-wrapper">
                <div class="member-profile">
                    <div class="profile-item">
                        <div class="profile-cover">
                            <img src={coverFileshow} alt="" />
                            {/* <img src="assets/images/profile/cover.jpg" alt="cover-pic"> */}
                            <div class="edit-photo custom-upload">
                                <div class="file-btn"><i class="icofont-camera"></i>
                                    Edit Photo</div>
                                <input type="file" onChange={(e)=>readURLcover(e.target)}/>
                            </div>
                        </div>
                        <div class="profile-information">
                            <div class="profile-pic"> 
                            
                                <img src={profileFileshow} alt="" />
                                {/* <img src="assets/images/profile/Profile.jpg" alt="DP"> */}
                                <div class="custom-upload">
                                    <div class="file-btn">
                                        <span class="d-none d-lg-inline-block"> <i class="icofont-camera"></i>
                                            Edit</span>
                                        <span class="d-lg-none mr-0"><i class="icofont-plus"></i></span>
                                    </div>
                                    <input type="file"  onChange={(e)=>readURLprofile(e.target)}/>
                                </div>
                            </div>
                            <div class="profile-name">
                             {user && user.get('firstname')?(<h4>{user.get('firstname')} {user.get('lastname')}</h4>):(<h4>-- --</h4>)}  
                             <i class="fa fa-pencil-square-o edit-icon" aria-hidden="true"onClick={()=>setshowmodale(true)}></i> 
                             {user && user.get('email')?( <p>{user.get('email')}</p>):(<></>)}
                             {user && user.get('social_link1')?( <h6><i class="fa fa-link" aria-hidden="true"></i> {user.get('social_link1')}</h6>):(<></>)}
                             {user && user.get('social_link2')?( <h6><i class="fa fa-link" aria-hidden="true"></i> {user.get('social_link2')}</h6>):(<></>)}
                            </div>
                            <ul class="profile-contact">
                                <li class="crypto-copy">
                                    <div id="cryptoCode" class="crypto-page">
                                        <input id="cryptoLink" value={currentUserAddress} readonly />
                                        <div id="cryptoCopy" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Copy Address">
                                                   <CopyToClipboard text={currentUserAddress} onCopy={clipto}>
                                            <span class="copy-icon">
                                                
                                                <i class="icofont-ui-copy" aria-hidden="true"
                                                    data-copytarget="#cryptoLink"></i>
                                            </span>
                                            </CopyToClipboard>
                                            {copy?(<span>Copied</span>):(<></>)}

                                        </div>
                                    </div>

                                </li>
                            </ul>

                        </div>
                    </div>
                    <div class="profile-item d-none">
                        <div class="lab-inner">
                            <div class="lab-thumb">
                                <a href="#">
                                    <img src={require('../images/profile/Profile.jpg').default} alt="" />
                                    {/* <img src="assets/images/profile/Profile.jpg" alt="profile"> */}
                                </a>
                            </div>
                            <div class="lab-content">
                                <div class="profile-name">
                                    <div class="p-name-content">
                                        <h4>William Smith</h4>
                                        <p>Active 02 Minutes Ago</p>
                                    </div>

                                    <div class="contact-button">
                                        <button class="contact-btn">
                                            <i class="icofont-info-circle"></i>
                                        </button>
                                    </div>
                                </div>
                                <ul class="profile-contact">
                                    <li>
                                        <a href="#">
                                            <div class="icon"><i class="icofont-user"></i></div>
                                            <div class="text">
                                                <p>Add Friends</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div class="icon"><i class="icofont-envelope"></i></div>
                                            <div class="text">
                                                <p>Publice Message</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div class="icon"><i class="icofont-envelope"></i></div>
                                            <div class="text">
                                                <p>Private Message</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="profile-details">
                       
                                <Tabs>
                                <nav class="profile-nav">
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <TabList>
                                        <Tab className="nav-link">All NFT's</Tab>
                                        <Tab className="nav-link">About</Tab>
                                        <Tab className="nav-link">Activity</Tab>
                                        <Tab className="nav-link">Follower</Tab>
                                        <Tab className="nav-link">Following</Tab>
                                        <Tab className="nav-link">My Wallet</Tab>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                            Setting
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/author">Profile</Dropdown.Item>
                                                <Dropdown.Item href="#">Privacy</Dropdown.Item>
                                                <Dropdown.Item href="/wallet">Block user</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </TabList>
                                    </div>
                                    </nav>
                               
                            <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                        <Tabs selectedIndex={selectedTabIndex} >
                                            <article>
                                                <div class="activity-tab">
                                                    
                                                    <TabList  className="nav nav-pills mb-30 px-2 ">
                                                        <Tab onClick={() => openTab("create")} className="nav-link"><i class="icofont-flask"></i> Create NFT</Tab>
                                                        <Tab onClick={() => openTab("sale")} className="nav-link"><i class="icofont-flash"></i> On Sale</Tab>
                                                        <Tab onClick={() => openTab("owned")} className="nav-link"><i class="icofont-license"></i> Owned</Tab>
                                                        <Tab onClick={() => openTab("created")} className="nav-link" ><i class="icofont-puzzle"></i> Created</Tab>
                                                        <Tab onClick={() => openTab("collection")} className="nav-link"><i class="icofont-library"></i> Collection</Tab>
                                                        <Dropdown className="all-box-tab">
                                                            <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                                            All
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#">All</Dropdown.Item>
                                                                <Dropdown.Item href="#">Recent</Dropdown.Item>
                                                                <Dropdown.Item href="#">Relevant</Dropdown.Item>
                                                                <Dropdown.Item href="#">Popular</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </TabList>
                                                   
                                              
                                                        <TabPanel>
                                                         
                                                             <section className="form_section"> 
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-md-8">
                                                                            <h5 className="mb-2"> Upload file</h5>
                                                                            <div class="upload-item mb-30 d-create-file1">
                                                                                <p>PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                                                                <div class="custom-upload">
                                                                                
                                                                                        <input type="button" id="get_file" class="btn-main" value="Browse" />
                                                                                        <input type="file" onChange={ (e) => readURL(e.target) }/>
                                                                                </div>
                                                                            </div>
                                                                            {ERR?(<span className="errors">{ERR.image}</span>):(<></>)}
                                                                            <div className="tab_create">
                                                                                <h5 className="mb-2"> Select method</h5>
                                                                                <Tabs>
                                                                                    <TabList className="nav nav-pills mb-30 px-2 ">
                                                                                        <Tab className="nav-link" onClick={() => setNftType("fixed_price")} >
                                                                                            <span><i class="fa fa-tag"></i>Fixed price</span>
                                                                                        </Tab>
                                                                                        <Tab className="nav-link" onClick={() => setNftType("timed_auction")}>
                                                                                            <span><i class="fa fa-hourglass-1"></i>Timed auction</span>
                                                                                        </Tab>
                                                                                        {/* <Tab className="nav-link">
                                                                                        <span><i class="fa fa-users"></i>Open for bids</span>
                                                                                        </Tab> */}
                                                                                    </TabList>
                                                                                    <TabPanel>
                                                                                            <div>
                                                                                                <div>
                                                                                                    <h5>Price</h5>
                                                                                                    <input type="text"  value={price} onChange={(e)=>setprice(e.target.value)} name="item_price" id="item_price" class="input100" placeholder="enter price for one item (ETH)" />
                                                                                                    {ERR?(<span className="errors">{ERR.price}</span>):(<></>)}
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Title</h5>
                                                                                                  
                                                                                                    <input type="text" onChange={(e)=>setname(e.target.value)}  value={name} name="name" id="name" class="input100" placeholder="e.g. 'Crypto Funk" />
                                                                                                    {ERR?(<span className="errors">{ERR.name}</span>):(<></>)}
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Description</h5>
                                                                                                    <textarea class="form-control input100"
                                                                                    placeholder="Item Description"
                                                                                    id="itemDesc" onChange={ (e) => setdescription(e.target.value) }  value={description}></textarea>
                                                                                       {ERR?(<span className="errors">{ERR.description}</span>):(<></>)}
                                                                                                </div>
                                                                                                <div class="item-category-field mb-30">
                                                                                                    <h5 className="mb-3">Select Item Catergory</h5>
                                                                                                    <ul
                                                                                                        class="item-cat-list d-flex flex-wrap">
                                                                                                    {Cat}
                                                                                                    </ul>
                                                                                                </div>
                                                                                                {/* <div>
                                                                                                    <h5>Royalties</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                                                                                                </div> */}
                                                                                              
                                                                                            </div>
                                                                                        </TabPanel>
                                                                                        <TabPanel>
                                                                                            <div>
                                                                                                {/* <div>
                                                                                                    <h5>Minimum bid</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="enter minimum bid"  />
                                                                                                </div> */}
                                                                                                <div className="row">
                                                                                                    <div class="col-md-6">
                                                                                                        <h5>Starting date</h5>
                                                                                                        <DatePicker minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)} />
                                                                                                        {/* <input  id="item_price" class="input100" placeholder="dd-mm-yyyy" onChange={ (e) => setStartDate(e.target.value) }  value={startDate} /> */}
                                                                                                    </div>
                                                                                                    <div class="col-md-6">
                                                                                                        <h5>Expiration date</h5>
                                                                                                        <DatePicker minDate={new Date()} selected={endDate} onChange={(date) => setEndDate(date)} />
                                                                                                        {/* <input id="item_price" class="input100" onChange={ (e) => setEndDate(e.target.value) }  value={endDate} placeholder="dd-mm-yyyy" /> */}
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Title</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" onChange={ (e) => setNameAuction(e.target.value) }  value={nameAuction} class="input100" placeholder="e.g. 'Crypto Funk" />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Description</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" onChange={ (e) => setDescriptionAuction(e.target.value) }  value={descriptionAuction} class="input100" placeholder="e.g. 'This is very limited item'" />
                                                                                                </div>
                                                                                                {/* <div>
                                                                                                    <h5>Royalties</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                                                                                                </div> */}
                                                                                            </div>
                                                                                   </TabPanel>
                                                                                   <TabPanel>
                                                                                            <div>
                                                                                                <div>
                                                                                                    <h5>Title</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="e.g. 'Crypto Funk" />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Description</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="e.g. 'This is very limited item'" />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Royalties</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                                                                                                </div>

                                                                                            </div>
                                                                                    </TabPanel>
                                                                                    </Tabs>

                                                                                <div>
                                                                                    
                                                                                    <input type="button" class="btn-main1" value="Create Item" onClick={createItem}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4 rightaide_item">
                                                                            <h5>Preview item</h5>
                                                                            <div class="nft__item mt-3">
                                                                                    {/* <div class="de_countdown is-countdown" data-year="2021" data-month="10" data-day="16" data-hour="8" >
                                                                                        <span class="countdown-row countdown-show4"><span class="countdown-section"><span class="countdown-amount">22d</span>
                                                                                        </span><span class="countdown-section"><span class="countdown-amount">18h</span></span><span class="countdown-section">
                                                                                            <span class="countdown-amount">58m</span></span><span class="countdown-section"><span class="countdown-amount">2s</span>
                                                                                            </span></span>
                                                                                            </div> */}
                                                                                    {/* <div class="author_list_pp">
                                                                                        <a href="#">                                    
                                                                                        <img src={require('../images/coll-item-3.jpg').default} alt="" />
                                                                                            <i class="fa fa-check"></i>
                                                                                        </a>
                                                                                    </div> */}
                                                                                    <div class="nft__item_wrap">
                                                                                        <a href="#">
                                                                                            {imageFileshow?(<img src={imageFileshow} alt="" />):( <img src={require('../images/coll-item-3.jpg').default} alt="" />)}
                                                                                            
                                                                                        </a>
                                                                                    </div>
                                                                                    <div class="nft__item_info">
                                                                                        <a href="#">
                                                                                            {name?(  <h4>{name}</h4>):(  <h4>[name]</h4>)}
                                                                                          
                                                                                        </a>
                                                                                        <div class="nft__item_price">
                                                                                        {price?(<> {price}</>):(<> 0.000</>)} ETH<span></span>
                                                                                        </div>
                                                                                        <div class="nft__item_action">
                                                                                            <a href="#">{selectedcat}</a>
                                                                                        </div>
                                                                                        <a href="#">
                                                                                            {description?(<>  {description.length>40? (<h4>{description.substring(0, 40)}...</h4>):(<h4>{description}</h4>)}</>):(  <h4>[description]</h4>)}
                                                                                          
                                                                                        </a>
                                                                                     
                                                                                    
                                                                                        {/* <div class="nft__item_like">
                                                                                            <i class="fa fa-heart"></i><span>50</span>
                                                                                        </div>                             */}
                                                                                    </div> 
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </TabPanel>
                                                        {/* </div> */}
                                                        {/* <div class="tab-pane fade mentions-section show active"
                                                            id="pills-mentions" role="tabpanel"
                                                            aria-labelledby="pills-mentions-tab"> */}
                                                            <TabPanel>
                                                            
                                                            {marketItems.length>0?(
                                                            <div class="row justify-content-center gx-3 gy-2">
                                                            {marketItems.map(function(item, i){
                                                                    return(
                                                                    <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <h6><a href="author.html">{item.seller}</a>
                                                                                            </h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                           
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={item.image} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/02.jpg"
                                                                                        alt="nft-img"> */}

                                                                                    {item.is_auction ?
                                                                                        <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">{date_diff_from_now(item.endTime).days}</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">{date_diff_from_now(item.endTime).hours}</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">{date_diff_from_now(item.endTime).minutes}</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">{date_diff_from_now(item.endTime).seconds}</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                    :
                                                                                    null
                                                                                }
                                                                                    
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="#">{item.name}</a> </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                       {item.is_auction ?
                                                                                       <p class="nft-price">
                                                                                   </p>
                                                                                       :
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">{item.price}
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        }
                                                                                        {item.seller.toLowerCase() != currentUserAddress.toLowerCase() ?
                                                                                            item.is_auction ?
                                                                                            <p className="btn btn-primary float-right" onClick={() => bidNft(item)} >
                                                                                                Make Bid
                                                                                            </p>
                                                                                            :
                                                                                            <p className="btn btn-primary float-right" onClick={() => buyNft(item)} >
                                                                                                Buy now
                                                                                            </p>
                                                                                        :
                                                                                        null
                                                                                        }

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>  
                                                            )

                                                            })}
                                                            </div>                                                             ):(      <div className="nodata-found text-center">
                                                            <p>No Data Found</p>
                                                        </div>)}                                                        </TabPanel>
                                                        {/* <div class="tab-pane fade" id="pills-favorites" role="tabpanel"
                                                            aria-labelledby="pills-favorites-tab"> */}
                                                            <TabPanel>
                                                            <div class="row justify-content-center gx-3 gy-2">
                                                                
                                                                {myNftitems.length > 0 && myNftitems.map(function(item, i){
                                                                    
                                                                return(
                                                                <div class="col-lg-4 col-sm-6 test_2">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/01.gif') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/01.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/01.png') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/01.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                            <h6><a href="author.html">Jhon
                                                                                                    Doe</a>
                                                                                            </h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/04.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/04.jpg"
                                                                                        alt="nft-img"> */}

                                                                                    
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">Walking
                                                                                            On
                                                                                            Air</a> </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            230</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                )
                                                                })}
                                                            </div>
                                                        {/* </div> */}
                                                        </TabPanel>
                                                        {/* <div class="tab-pane fade" id="pills-friends" role="tabpanel"
                                                            aria-labelledby="pills-friends-tab"> */}
                                                        <TabPanel>
                                                            {createdItems.length>0?(
                                                            <div class="row justify-content-center gx-3 gy-2">
                                                                 {createdItems}
                                                            </div>
                                                            ):(      <div className="nodata-found text-center">
                                                            <p>No Data Found</p>
                                                        </div>)}
                                                      
                                                            {/* <div class="load-btn">
                                                                <a href="#" class="default-btn move-bottom"><span>Load
                                                                        More</span> </a>
                                                            </div> */}
                                                        {/* </div> */}
                                                        </TabPanel>
                                                        {/* <div class="tab-pane fade" id="pills-groups" role="tabpanel"
                                                            aria-labelledby="pills-groups-tab"> */}
                                                            <TabPanel>
                                                            <div class="row justify-content-center gx-3 gy-2">
                                                                <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/05.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/05.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/05.gif') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/05.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                            <h6><a href="author.html">Jhon
                                                                                                    Doe</a>
                                                                                            </h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/06.gif') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/06.gif"
                                                                                        alt="nft-img"> */}

                                                                                    
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">Walking
                                                                                            On
                                                                                            Air</a> </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            230</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/01.png') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/01.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                            <h6><a href="author.html">Gucci
                                                                                                    Lucas</a></h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/04.gif') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/04.gif"
                                                                                        alt="nft-img"> */}

                                                                                    
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">EUPHORIA
                                                                                            de</a>
                                                                                    </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            230</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/03.gif') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/03.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/02.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/02.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/06.png') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/06.png"
                                                                                                    alt="author-img">
                                                                                             */}
                                                                                             </a>
                                                                                            <h6><a href="author.html">Ecalo
                                                                                                    jers</a></h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/05.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/05.jpg"
                                                                                        alt="nft-img"> */}

                                                                                    
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">Mewao
                                                                                            com de</a>
                                                                                    </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            278</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/05.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/05.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/04.gif') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/04.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/08.png') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/08.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                            <h6><a href="author.html">Hola
                                                                                                    moc</a>
                                                                                            </h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/04.gif') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/04.gif"
                                                                                        alt="nft-img"> */}

                                                                                
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">pet
                                                                                            mice rio</a>
                                                                                    </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            340</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/04.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/04.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/07.gif') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/07.gif"
                                                                                                    alt="author-img"> */}
                                                                                             </a>
                                                                                            <h6><a href="author.html">Logicto
                                                                                                    pen</a></h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part">
                                                                                    <div class=" dropstart">
                                                                                        <a class=" dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                            data-bs-offset="25,0">
                                                                                            <i
                                                                                                class="icofont-flikr"></i>
                                                                                        </a>

                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span>
                                                                                                        <i
                                                                                                            class="icofont-warning"></i>
                                                                                                    </span> Report </a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item"
                                                                                                    href="#"><span><i
                                                                                                            class="icofont-reply"></i></span>
                                                                                                    Share</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/10.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/10.jpg"
                                                                                        alt="nft-img"> */}

                                                                                    
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">Logical
                                                                                            Impact </a>
                                                                                    </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            330</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4 col-sm-6">
                                                                    <div class="nft-item">
                                                                        <div class="nft-inner">
                                                                            
                                                                            <div
                                                                                class="nft-item-top d-flex justify-content-between align-items-center">
                                                                                <div class="author-part">
                                                                                    <ul class="author-list d-flex">
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/05.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/05.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/02.gif') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/02.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                    <img src={require('../images/seller/01.gif') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/01.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                            <h6><a href="author.html">unique
                                                                                                    lo</a></h6>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="more-part"><i
                                                                                        class="icofont-flikr"></i></div>
                                                                            </div>
                                                                            
                                                                            <div class="nft-item-bottom">
                                                                                <div class="nft-thumb">
                                                                                <img src={require('../images/nft-item/06.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/06.jpg"
                                                                                        alt="nft-img"> */}

                                                                                    
                                                                                    <ul class="nft-countdown count-down"
                                                                                        data-date="July 05, 2022 21:14:01">
                                                                                        <li>
                                                                                            <span
                                                                                                class="days">34</span><span
                                                                                                class="count-txt">D</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="hours">09</span><span
                                                                                                class="count-txt">H</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="minutes">32</span><span
                                                                                                class="count-txt">M</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span
                                                                                                class="seconds">32</span><span
                                                                                                class="count-txt">S</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <div class="nft-content">
                                                                                    <h4><a href="item-details.html">Fly
                                                                                            on high</a>
                                                                                    </h4>
                                                                                    <div
                                                                                        class="price-like d-flex justify-content-between align-items-center">
                                                                                        <p class="nft-price">Price:
                                                                                            <span
                                                                                                class="yellow-color">0.34
                                                                                                ETH</span>
                                                                                        </p>
                                                                                        <a href="#" class="nft-like"><i
                                                                                                class="icofont-heart"></i>
                                                                                            355</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="load-btn">
                                                                <a href="#" class="default-btn move-bottom"><span>Load
                                                                        More</span> </a>
                                                            </div>
                                                        {/* </div> */}
                                                    {/* </div> */}
                                                        </TabPanel>
                                                </div>
                                            </article>
                                            </Tabs>
                                        </div>

                                        
                                    
                                    </div>
                                </div>
                                </TabPanel>
                            {/* </div> */}

{/* about tab */}
                           
                            {/* <div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="nav-about-tab"> */}
                            <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <article>

                                                <div class="info-card mb-3">
                                                    <div class="info-card-title">
                                                        <h4>About</h4>
                                                    </div>
                                                    <div class="info-card-content">
                                                        <p>Collaboratively innovate compelling mindshare after
                                                            prospective partnerships Competently sereiz long-term
                                                            high-impact internal or "organic" sources via user friendly
                                                            strategic themesr areas creat Dramatically coordinate
                                                            premium partnerships rather than standards compliant
                                                            technologies ernd Dramatically matrix ethical collaboration
                                                            and idea-sharing through opensource methodologies and
                                                            Intrinsicly grow collaborative platforms vis-a-vis effective
                                                            scenarios. Energistically strategize cost effective ideas
                                                            before the worke unde.</p>
                                                    </div>
                                                </div>
                                                <div class="info-card">
                                                    <div class="info-card-title">
                                                        <h4>Other Info</h4>
                                                    </div>
                                                    <div class="info-card-content">
                                                        <ul class="info-list">
                                                            <li>
                                                                <p class="info-name">Name</p>
                                                                <p class="info-details">Alex Joe</p>
                                                            </li>
                                                            <li>
                                                                <p class="info-name">Country</p>
                                                                <p class="info-details">USA</p>
                                                            </li>
                                                            <li>
                                                                <p class="info-name">Specialize in</p>
                                                                <p class="info-details">Art</p>
                                                            </li>
                                                            <li>
                                                                <p class="info-name">Wallet Add</p>
                                                                <p class="info-details">fdffx1xr394k..dfdk23sl</p>
                                                            </li>
                                                            <li>
                                                                <p class="info-name">Age</p>
                                                                <p class="info-details">36</p>
                                                            </li>
                                                            <li>
                                                                <p class="info-name">Date of Birth</p>
                                                                <p class="info-details">27-02-1996</p>
                                                            </li>
                                                            <li>
                                                                <p class="info-name">Address</p>
                                                                <p class="info-details">Streop Rd, Peosur, Inphodux,
                                                                    USA.</p>
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </article>
                                        </div>

                                        
                                    </div>
                                </div>
                                </TabPanel>
                            {/* </div> */}
                            {/*activity  */}
                            {/* <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="nav-activity-tab"> */}
                            <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <article>
                                                <h4 class="h4-title">Author's Activity</h4>
                                                <div class="row gy-3">
                                                    <div class="col-12">
                                                        <div class="activity-item">
                                                            <div
                                                                class="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                                                                <div class="lab-thumb me-3 me-md-4">
                                                                    <img src={require('../images/activity/01.gif').default} alt="" />
                                                                    {/* <img src="assets/images/activity/01.gif" alt="img"> */}
                                                                </div>
                                                                <div class="lab-content">
                                                                    <h4><a href="nft-single.html">Gold digger x</a>
                                                                    </h4>
                                                                    <p class="mb-2">GOLD DIGGER (x Antoni Tudisco)
                                                                        #44/44 was put up for sale for
                                                                        <b>0.0991
                                                                            ETH</b>
                                                                    </p>
                                                                    <p class="user-id">By: <a
                                                                            href="author.html">@rasselmrh</a></p>
                                                                    <p>At: 10/07/2021, 10:03 am</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="activity-item">
                                                            <div
                                                                class="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                                                                <div class="lab-thumb me-3 me-md-4">
                                                                    <img src={require('../images/activity/02.gif').default} alt="" />
                                                                    {/* <img src="assets/images/activity/02.gif" alt="img"> */}
                                                                </div>
                                                                <div class="lab-content">
                                                                    <h4><a href="nft-single.html">ghost lix xrf</a>
                                                                    </h4>
                                                                    <p class="mb-2">two rare collection purchased for
                                                                        <b>0.001
                                                                            ETH</b>
                                                                    </p>
                                                                    <p class="user-id">By: <a
                                                                            href="author.html">@reo2lxsr</a></p>
                                                                    <p>At: 10/07/2021, 08:23 am</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="activity-item">
                                                            <div
                                                                class="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                                                                <div class="lab-thumb me-3 me-md-4">

                                                                    <img src={require('../images/activity/04.gif').default} alt="" />
                                                                    {/* <img src="assets/images/activity/04.gif" alt="img"> */}
                                                                </div>
                                                                <div class="lab-content">
                                                                    <h4><a href="nft-single.html">Trust In meh </a>
                                                                    </h4>
                                                                    <p class="mb-2">The Shopping Cart #54/65 was put up
                                                                        for sale for <b>0.021
                                                                            ETH</b>
                                                                    </p>
                                                                    <p class="user-id">By: <a
                                                                            href="author.html">@reo2lxsr</a></p>
                                                                    <p>At: 10/07/2021, 12:03 am</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="activity-item">
                                                            <div
                                                                class="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                                                                <div class="lab-thumb me-3 me-md-4">
                                                                <img src={require('../images/activity/05.gif').default} alt="" />
                                                                    {/* <img src="assets/images/activity/05.gif" alt="img"> */}
                                                                </div>
                                                                <div class="lab-content">
                                                                    <h4><a href="nft-single.html">Sysytan #0le </a>
                                                                    </h4>
                                                                    <p class="mb-2">A offer of $200.00 was placed for
                                                                        ÜNDERSTANDING (Sean Williams) #1/20
                                                                    </p>
                                                                    <p class="user-id">By: <a
                                                                            href="author.html">@reo2lxsr</a></p>
                                                                    <p>At: 10/07/2021, 10:03 am</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="activity-item">
                                                            <div
                                                                class="lab-inner d-flex flex-wrap align-items-center p-3 p-md-4">
                                                                <div class="lab-thumb me-3 me-md-4">
                                                                <img src={require('../images/activity/03.gif').default} alt="" />
                                                                    {/* <img src="assets/images/activity/03.gif" alt="img"> */}
                                                                </div>
                                                                <div class="lab-content">
                                                                    <h4><a href="nft-single.html">ghost lix xrf</a>
                                                                    </h4>
                                                                    <p class="mb-2">two rare collection purchased for
                                                                        <b>0.001
                                                                            ETH</b>
                                                                    </p>
                                                                    <p class="user-id">By: <a
                                                                            href="author.html">@reo2lxsr</a></p>
                                                                    <p>At: 10/07/2021, 02:03 pm</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>

                                        
                                        
                                    </div>
                                </div>
                            {/* </div> */}
                            </TabPanel>
                           {/* follower */}
                            {/* <div class="tab-pane fade" id="follower" role="tabpanel" aria-labelledby="nav-follower-tab"> */}
                               <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="follow-wrapper">
                                                <h4 class="h4-title">All Followers</h4>
                                                <div class="row g-3">
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">21</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/02.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/02.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Andrea Guido</a>
                                                                            </h5>
                                                                            <p>$23,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">99</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/01.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/01.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Xrl5 Yo</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">65</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/01.gif').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/01.gif"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Picha lx</a>
                                                                            </h5>
                                                                            <p>$4,302.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">05</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/03.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/03.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Xrl5 Yo</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">14</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/04.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/04.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Jhon doe</a>
                                                                            </h5>
                                                                            <p>$13,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">12</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/03.gif').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/03.gif"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">somrat ux</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">99</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/05.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/05.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">rax el</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">79</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/06.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/06.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Bigl5 Yo</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">65</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/07.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/07.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Picha lx</a>
                                                                            </h5>
                                                                            <p>$4,302.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">05</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/03.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/03.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Xrl5 Yo</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">14</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/05.gif').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/05.gif"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">Jhon doe</a>
                                                                            </h5>
                                                                            <p>$13,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="seller-item">
                                                            <div class="seller-inner">
                                                                <div class="seller-part">
                                                                    <p class="assets-number">12</p>
                                                                    <div class="assets-owner">
                                                                        <div class="owner-thumb veryfied">
                                                                            <a href="author.html">
                                                                            <img src={require('../images/seller/09.png').default} alt="" />
                                                                                {/* <img
                                                                                    src="assets/images/seller/09.png"
                                                                                    alt="seller-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="owner-content">
                                                                            <h5><a href="author.html">razx frd</a>
                                                                            </h5>
                                                                            <p>$2,002.98</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="follow-part">
                                                                    <button class="btn-follow follow-state">
                                                                        <span class="follow"><i
                                                                                class="fa fa-user-plus"></i>
                                                                            Follow</span>
                                                                        <span class="unfollow">Unfollow</span>
                                                                        <span class="following">Following</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="load-btn">
                                                    <a href="#" class="default-btn move-bottom"><span>Load
                                                            More</span> </a>
                                                </div>
                                            </div>
                                        </div>

                                        
                                       
                                    </div>
                                </div>
                            {/* </div> */}
                            </TabPanel>
                            {/*following  */}
                            {/* <div class="tab-pane fade" id="following" role="tabpanel"
                                aria-labelledby="nav-following-tab"> */}
                                <TabPanel>
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="follow-wrapper">
                                            <h4 class="h4-title">Following</h4>
                                            <div class="row g-3">
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">21</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                            <img src={require('../images/seller/02.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/02.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Andrea Guido</a>
                                                                        </h5>
                                                                        <p>$23,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">99</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/02.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/01.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Xrl5 Yo</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">65</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/01.gif').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/01.gif"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Picha lx</a>
                                                                        </h5>
                                                                        <p>$4,302.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">05</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/03.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/03.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Xrl5 Yo</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">14</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/04.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/04.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Jhon doe</a>
                                                                        </h5>
                                                                        <p>$13,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">12</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/03.gif').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/03.gif"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">somrat ux</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">99</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/05.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/05.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">rax el</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">79</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/06.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/06.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Bigl5 Yo</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">65</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/07.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/07.png"
                                                                                alt="seller-img"> */}
                                                                         </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Picha lx</a>
                                                                        </h5>
                                                                        <p>$4,302.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">05</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/03.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/03.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Xrl5 Yo</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">14</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/05.gif').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/05.gif"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">Jhon doe</a>
                                                                        </h5>
                                                                        <p>$13,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="seller-item">
                                                        <div class="seller-inner">
                                                            <div class="seller-part">
                                                                <p class="assets-number">12</p>
                                                                <div class="assets-owner">
                                                                    <div class="owner-thumb veryfied">
                                                                        <a href="author.html">
                                                                        <img src={require('../images/seller/09.png').default} alt="" />
                                                                            {/* <img
                                                                                src="assets/images/seller/09.png"
                                                                                alt="seller-img"> */}
                                                                        </a>
                                                                    </div>
                                                                    <div class="owner-content">
                                                                        <h5><a href="author.html">razx frd</a>
                                                                        </h5>
                                                                        <p>$2,002.98</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="follow-part activefollow">
                                                                <button class="btn-follow follow-state">
                                                                    <span class="follow"><i class="fa fa-user-plus"></i>
                                                                        Follow</span>
                                                                    <span class="unfollow">Unfollow</span>
                                                                    <span class="following">Following</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="load-btn">
                                                <a href="#" class="default-btn move-bottom"><span>Load
                                                        More</span> </a>
                                            </div>
                                        </div>
                                    </div>

                                   
                                   
                                </div>
                            {/* </div> */}
                            </TabPanel>
                            {/* my wallet */}
                            {/* <div class="tab-pane fade" id="wallet" role="tabpanel" aria-labelledby="nav-wallet-tab"> */}
                            <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="wallet-wrapper">
                                                <div class="wallet-title">
                                                    <h4>Connect your wallet</h4>
                                                    <p>Connect with one of available wallet providers or <a
                                                            href="signup.html">create a
                                                            new wallet</a></p>
                                                </div>
                                                <div class="wallet-section">
                                                    <div class="wallet-inner">
                                                        <div class="row g-3">
                                                            <div class="col-lg-4 col-md-6">
                                                                <div class="wallet-item">
                                                                    <div class="wallet-item-inner">
                                                                        <div class="wallet-thumb">
                                                                            <a href="signin.html">
                                                                                <img src={require('../images/wallet/01.png').default} alt="" />
                                                                                {/* <img src="assets/images/wallet/01.png"
                                                                                    alt="wallet-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="wallet-content">
                                                                            <h5><a href="signin.html">MetaMask</a></h5>
                                                                            <p>Connect with your email and password</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-6">
                                                                <div class="wallet-item">
                                                                    <div class="wallet-item-inner">
                                                                        <div class="wallet-thumb">
                                                                            <a href="signin.html">
                                                                            <img src={require('../images/wallet/02.png').default} alt="" />
                                                                                {/* <img src="assets/images/wallet/02.png"
                                                                                    alt="wallet-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="wallet-content">
                                                                            <h5><a href="signin.html">MetaMask</a></h5>
                                                                            <p>Connect with your email and password</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-6">
                                                                <div class="wallet-item">
                                                                    <div class="wallet-item-inner">
                                                                        <div class="wallet-thumb">
                                                                            <a href="signin.html">
                                                                            <img src={require('../images/wallet/03.png').default} alt="" />
                                                                                {/* <img src="assets/images/wallet/03.png"
                                                                                    alt="wallet-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="wallet-content">
                                                                            <h5><a href="signin.html">MetaMask</a></h5>
                                                                            <p>Connect with your email and password</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-6">
                                                                <div class="wallet-item">
                                                                    <div class="wallet-item-inner">
                                                                        <div class="wallet-thumb">
                                                                            <a href="signin.html">
                                                                            <img src={require('../images/wallet/04.png').default} alt="" />
                                                                                {/* <img src="assets/images/wallet/04.png"
                                                                                    alt="wallet-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="wallet-content">
                                                                            <h5><a href="signin.html">MetaMask</a></h5>
                                                                            <p>Connect with your email and password</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-6">
                                                                <div class="wallet-item">
                                                                    <div class="wallet-item-inner">
                                                                        <div class="wallet-thumb">
                                                                            <a href="signin.html">
                                                                            <img src={require('../images/wallet/05.png').default} alt="" />
                                                                                {/* <img src="assets/images/wallet/05.png"
                                                                                    alt="wallet-img"> */}
                                                                            </a>
                                                                        </div>
                                                                        <div class="wallet-content">
                                                                            <h5><a href="signin.html">MetaMask</a></h5>
                                                                            <p>Connect with your email and password</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p class="mt-5 wallet-notice"><span class="me-1 theme-color"><i
                                                                    class="icofont-bulb-alt"></i></span> We
                                                            do not own your private keys and cannot access your funds
                                                            without your confirmation.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        {/* <div class="col-xl-3">
                                            <aside class="mt-5 mt-xl-0">
                                                <div class="profile-widget search-widget">
                                                    <div class="widget-inner">
                                                        <div class="widget-title">
                                                            <h5>Search NFT</h5>
                                                        </div>
                                                        <div class="widget-content">
                                                            <p>Search from best Rarest NFT collections</p>
                                                            <div class="form-floating nft-search-input">
                                                                <input type="text" class="form-control"
                                                                    placeholder="Search NFT" />
                                                                <label>Search NFT</label>
                                                                <button type="button"> <i
                                                                        class="icofont-search-1"></i></button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="widget widget-instagram">
                                                    <div class="widget-header">
                                                        <h5 class="title">Featured NFT</h5>
                                                    </div>
                                                    <ul class="widget-wrapper d-flex flex-wrap justify-content-center">
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/01.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/01.jpg').default} alt="" />
                                                                   
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/02.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/02.jpg').default} alt="" />
                                                                   
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/03.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/03.jpg').default} alt="" />
                                                                   
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/04.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/04.jpg').default} alt="" />
                                                                  
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/05.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/05.jpg').default} alt="" />
                                                                   
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/06.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/06.jpg').default} alt="" />
                                                                  
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/07.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/07.jpg').default} alt="" />
                                                                   
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/08.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/08.jpg').default} alt="" />
                                                                   
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/09.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/09.jpg').default} alt="" />
                                                                    <img loading="lazy"
                                                                    src="assets/images/nft-item/09.jpg"
                                                                    alt="nft-img"></img>
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </aside>
                                        </div> */}
                                    </div>
                                </div>
                                </TabPanel>
                                </Tabs>
                            {/* </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
    
  

      <Modal show={show} onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered className="loader-modal">
        {/* <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="text-center py-0">
            <h3>{message1}</h3>
            <div className="loader-gif">
                <img src={require('../images/nft-pop-image.gif').default}></img>
            </div>
            <p>{message2}</p>
        </Modal.Body>
      </Modal>
      <Modal show={showm} onHide={handleClosem}
        
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered className="loader-modal">
            <Modal.Header closeButton>
            <Modal.Title> <h3 style={{marginLeft:"15px"}}>Create Profile</h3></Modal.Title>
                </Modal.Header>
          <Modal.Body className="text-center py-0">
             
              
              <form class="account-form">
                              <div class="form-floating mb-3">
                                  <input type="email" value={email} class="form-control" id="userIdInput" placeholder="name@example.com"  onChange={(e)=>setemail(e.target.value)}/>
                                  <label for="userIdInput">Email</label>
                                  {ERRs?(<span className="errors">{ERRs.email}</span>):(<></>)}
                              </div>
                              <div class="form-floating mb-3">
                                <input type="text" value={username} class="form-control" id="floatingInput"
                                    placeholder="John" onChange={(e)=>setusername(e.target.value)}/>
                                <label for="floatingInput">Username</label>
                                {ERRs?(<span className="errors">{ERRs.username}</span>):(<></>)}

                            </div>
                              <div class="form-floating mb-3">
                                  <input type="text" value={fname} class="form-control" id="floatingInput"
                                      placeholder="John" onChange={(e)=>setfname(e.target.value)}/>
                                  <label for="floatingInput">First Name</label>
                                  {ERRs?(<span className="errors">{ERRs.firstname}</span>):(<></>)}
  
                              </div>
                              {/* <div class="form-floating mb-3">
                                  <input type="password" class="form-control" id="floatingPassword"
                                      placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                  <label for="floatingPassword" >Password</label>
                                  {ERR?(<span className="errors">{ERR.password}</span>):(<></>)}
                              </div> */}
                              <div class="form-floating mb-3">
                                  <input type="text" value={lname} class="form-control" id="confirmPass"
                                      placeholder="Smith" onChange={(e)=>setlname(e.target.value)}/>
                                  <label for="confirmPass">Last Name</label>
                                  {ERRs?(<span className="errors">{ERRs.lastname}</span>):(<></>)}
                              </div>
                              <div class="form-floating mb-3">
                                  <input type="text" value={social1} class="form-control" id="social1"
                                      placeholder="https://www.facebook.com/topdev21" onChange={(e)=>setsocial1(e.target.value)}/>
                                  <label for="confirmPass">Social Link 1</label>
                                  {ERR?(<span className="errors">{ERRs.link1}</span>):(<></>)}
                              </div>
                              <div class="form-floating mb-3">
                                  <input type="text" value={social2} class="form-control" id="social2"
                                      placeholder="https://twitter.com/test" onChange={(e)=>setsocial2(e.target.value)}/>
                                  <label for="confirmPass">Social Link 2</label>
                                  {ERRs?(<span className="errors">{ERRs.link2}</span>):(<></>)}
                              </div>
                              <div class="form-group">
  
                                  <span  class="d-block create-profile" onClick={createprofile}>Update Profile</span>
                                 
                              </div>
                          </form>
                          {/* <button onClick={() => signup(username, password, email)}>Sign up</button> */}
  
  
          </Modal.Body>
        </Modal>
        </>
    )
}
export default Author;