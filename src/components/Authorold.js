import { Dropdown, Nav} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useMoralis,useMoralisFile } from "react-moralis";
import axios from 'axios';  
import 'react-tabs/style/react-tabs.css';
import React,{useState} from "react";
import {tokenContractAbi} from "./abi";
import { formValidation } from '../_services';
const Author = () => {
    const { web3, enableWeb3,user,Moralis } = useMoralis()
    const [tokenContractAddress, settokenContractAddress] = React.useState();
    const [imageFile, setimageFile] = React.useState();
    const [imageFileshow, setimageFileshow] = React.useState();
    const [name, setname] = React.useState('');
    const [price, setprice] = React.useState();
    const [description, setdescription] = React.useState();
    const [selectedcat, setselectedcat] = React.useState('Art');
    const [myitems, setMyitems] = React.useState();
    const [ERR, setErrs] = React.useState();
    const TOKEN_CONTRACT_ADDRESS = "0x7bbF3ad741968DDd43ac9393BBae9E3B0d39a340";
    const {
        error,
        isUploading,
        moralisFile,
        saveFile,
      } = useMoralisFile();
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
	   
			// setprofileERR("Please select a valid image file")
		   return false;
		  }
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

React.useEffect(() => {

    init();
    //  getitems()
  }, []);
  const init = () => {
    enableWeb3()
   
    console.log(tokenContractAbi[0].abi,"===tokenContractAbi")
    console.log("-----tokenContract",TOKEN_CONTRACT_ADDRESS)
    const tokenContract = new web3.eth.Contract(tokenContractAbi[0].abi, TOKEN_CONTRACT_ADDRESS);
  
    settokenContractAddress(tokenContract)
  
  }

 

  const createItem = async () => {
    let params = { name:name, image:imageFile,description:description, price:price}
    let validate = formValidation.item_validation(params,formerrors);
    if(validate.formIsValid){
    var attributes = [{
        "trait_type" : "Category",
        "value" : selectedcat,
    }
    // {
    //     "trait_type" : "Price",
    //     "value" : price,
    // }
]

     const nftFile = new Moralis.File("nftFile.jpg",imageFile);
     await nftFile.saveIPFS();

const nftFilePath = nftFile.ipfs();
//  const nftFile = saveFile("nftFile.jpeg", imageFile.files[0], { saveIPFS: true });
   
//    const  nftFilePath = nftFile.ipfs

    const metadata = {
        name: name,
        description: description,
        image: nftFilePath,
        attribute:attributes

    };

    // const  nftFileMetadataFile = saveFile("metadata.json", {base64 : btoa(JSON.stringify(metadata))}, { saveIPFS: true });
 const nftFileMetadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
     await nftFileMetadataFile.saveIPFS()

     const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();
     console.log(nftFileMetadataFilePath)

    const nftId = await mintNft(nftFileMetadataFilePath);


}else{
    setErrs(validate)  
}
}




  const mintNft = async (metadataUrl) => {
    var  user = await Moralis.User.current();
  
    const userAddress = user.get('ethAddress');
    console.log(userAddress)
    console.log(tokenContractAddress)
    
 await tokenContractAddress.methods.createItem(metadataUrl).send({from: userAddress}) 
.on("transactionHash", function (hash) {
    console.log("Hash",hash);
})
.on("receipt", function () {
    console.log("Receipt");
})
.on("confirmation", function () {
    console.log("Confirmed");
})
.on("error", async function (error) {
    console.log("Error",error);
});

    // return receipt.events.Transfer.returnValues.tokenId;
}


//creted listing
const getitems = () => {
    

    const userAddress = "0x6227019BE1442C55F652957219A291d2c95A8153";
    // alert(userAddress)
    let url =  `https://deep-index.moralis.io/api/v2/`+userAddress+`/nft/`+TOKEN_CONTRACT_ADDRESS+`?chain=rinkeby&format=decimal`;
    const headers = {  headers: {"X-API-Key": "3Ur7Kdm9AtnEnIt6haF5rEFGy2gzRFRUwVI4HxtYCJJq38su3dxYEsHpxk1v5Lip"} }
      axios.get(url,headers).then(function (response) {
        setMyitems(response.data.result)
    }).catch(error => {
        
        
        });
   }
   let createdItems = []
   if(myitems){
       createdItems = myitems.map(function(item,index){
           console.log(JSON.parse(item.metadata))
           return (  <div class="col-lg-4 col-sm-6">
           <div class="nft-item">
               <div class="nft-inner">
                   
                   <div class="nft-item-top d-flex justify-content-between align-items-center">
                       <div class="author-part">
                           <ul class="author-list d-flex">
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
                                           <img src={require('../images/seller/04.png') .default} alt="" />
                                           {/* <img
                                           src="assets/images/seller/04.png"
                                           alt="author-img"> */}
                                   </a>
                                   <h6><a href="author.html">Jhonsss
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
                       <img src={require('../images/nft-item/03.gif') .default} alt="" />
                           {/* <img src="assets/images/nft-item/03.gif"
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
       </div>)
      })
   } 

    return(
        <>
      
    <section class="page-header-section style-1">
        <div class="container">
            <div class="page-header-content">
                <div class="page-header-inner">
                    <div class="page-title">
                        <h2>Author Profile</h2>
                    </div>
                    <ol class="breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li class="active">Alex Joe</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
  


  
    <section class="profile-section padding-top padding-bottom">
        <div class="container">
            <div class="section-wrapper">
                <div class="member-profile">
                    <div class="profile-item">
                        <div class="profile-cover">
                            <img src={require('../images/profile/cover.jpg').default} alt="" />
                            {/* <img src="assets/images/profile/cover.jpg" alt="cover-pic"> */}
                            <div class="edit-photo custom-upload">
                                <div class="file-btn"><i class="icofont-camera"></i>
                                    Edit Photo</div>
                                <input type="file" />
                            </div>
                        </div>
                        <div class="profile-information">
                            <div class="profile-pic">
                                <img src={require('..//images/profile/Profile.jpg').default} alt="" />
                                {/* <img src="assets/images/profile/Profile.jpg" alt="DP"> */}
                                <div class="custom-upload">
                                    <div class="file-btn">
                                        <span class="d-none d-lg-inline-block"> <i class="icofont-camera"></i>
                                            Edit</span>
                                        <span class="d-lg-none mr-0"><i class="icofont-plus"></i></span>
                                    </div>
                                    <input type="file" />
                                </div>
                            </div>
                            <div class="profile-name">
                                <h4>Alex joe</h4>
                                <p>@alexjoe.jxe</p>
                            </div>
                            <ul class="profile-contact">
                                <li class="crypto-copy">
                                    <div id="cryptoCode" class="crypto-page">
                                        <input id="cryptoLink" value="0x731F9FBF4163D47B0F581DD9EC45C9" readonly />
                                        <div id="cryptoCopy" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Copy Address">
                                            <span class="copy-icon">
                                                <i class="icofont-ui-copy" aria-hidden="true"
                                                    data-copytarget="#cryptoLink"></i>
                                            </span>

                                        </div>
                                    </div>

                                </li>
                                <li>
                                    <a href="#">
                                        <div class="icon"><i class="icofont-ui-rate-add"></i></div>
                                        <div class="text">
                                            <p>Follow</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="icon"><i class="icofont-speech-comments"></i></div>
                                        <div class="text">
                                            <p>Send Message</p>
                                        </div>
                                    </a>
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
                       
                                {/* <button class="nav-link active" id="nav-allNft-tab" data-bs-toggle="tab"
                                    data-bs-target="#allNft" type="button" role="tab" aria-controls="allNft"
                                    aria-selected="true">All NFT's</button>
                                <button class="nav-link" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#about"
                                    type="button" role="tab" aria-controls="about" aria-selected="false">About</button>
                                <button class="nav-link" id="nav-activity-tab" data-bs-toggle="tab"
                                    data-bs-target="#activity" type="button" role="tab" aria-controls="activity"
                                    aria-selected="false">Activity</button>
                                <button class="nav-link" id="nav-follower-tab" data-bs-toggle="tab"
                                    data-bs-target="#follower" type="button" role="tab" aria-controls="follower"
                                    aria-selected="false">Follower <span class="item-number">231</span></button>
                                <button class="nav-link" id="nav-following-tab" data-bs-toggle="tab"
                                    data-bs-target="#following" type="button" role="tab" aria-controls="following"
                                    aria-selected="false">Following <span class="item-number">145</span></button>
                                <button class="nav-link" id="nav-wallet-tab" data-bs-toggle="tab"
                                    data-bs-target="#wallet" type="button" role="tab" aria-controls="wallet"
                                    aria-selected="false">My Wallet</button> */}
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
                               
                                {/* <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Setting
                                    </a>

                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/author">Profile</a></li>
                                        <li><a class="dropdown-item" href="#">Privacy</a></li>
                                        <li><a class="dropdown-item" href="#">Block user</a></li>
                                    </ul>
                                </div> */}
                                {/* <Dropdown>
                                    <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                    Setting
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/author">Profile</Dropdown.Item>
                                        <Dropdown.Item href="#">Privacy</Dropdown.Item>
                                        <Dropdown.Item href="/wallet">Block user</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}

                            {/* </div>
                        </nav> */}
                        {/* <div class="tab-content" id="nav-tabContent">
                           
                            <div class="tab-pane activity-page fade show active" id="allNft" role="tabpanel"> */}
                            <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-9">
                                        <Tabs>
                                            <article>
                                                <div class="activity-tab">
                                                    
                                                    <TabList className="nav nav-pills mb-30 px-2 ">
 
                                                        <Tab className="nav-link"><i class="icofont-flask"></i> Create NFT</Tab>
                                                        <Tab className="nav-link"><i class="icofont-flash"></i> On Sale</Tab>
                                                        <Tab className="nav-link"><i class="icofont-license"></i> owned</Tab>
                                                        <Tab className="nav-link" onClick={getitems}><i class="icofont-puzzle"></i> Created</Tab>
                                                        <Tab className="nav-link"><i class="icofont-library"></i> Collection</Tab>
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
                                                   
                                              
                                                        <TabPanel>c
                                                         
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
                                                                                        <Tab className="nav-link">
                                                                                            <span><i class="fa fa-tag"></i>Fixed price</span>
                                                                                        </Tab>
                                                                                        <Tab className="nav-link">
                                                                                            <span><i class="fa fa-hourglass-1"></i>Timed auction</span>
                                                                                        </Tab>
                                                                                        <Tab className="nav-link">
                                                                                        <span><i class="fa fa-users"></i>Open for bids</span>
                                                                                        </Tab>
                                                                                    </TabList>
                                                                                    <TabPanel>
                                                                                            <div>
                                                                                                <div>
                                                                                                    <h5>Price</h5>
                                                                                                    <input type="text" onChange={(e)=>setprice(e.target.value)} name="item_price" id="item_price" class="input100" placeholder="enter price for one item (ETH)" />
                                                                                                    {ERR?(<span className="errors">{ERR.price}</span>):(<></>)}
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Title</h5>
                                                                                                  
                                                                                                    <input type="text" onChange={(e)=>setname(e.target.value)} name="name" id="name" class="input100" placeholder="e.g. 'Crypto Funk" />
                                                                                                    {ERR?(<span className="errors">{ERR.name}</span>):(<></>)}
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Description</h5>
                                                                                                    <textarea class="form-control input100"
                                                                                    placeholder="Item Description"
                                                                                    id="itemDesc" onChange={ (e) => setdescription(e.target.value) }></textarea>
                                                                                       {ERR?(<span className="errors">{ERR.description}</span>):(<></>)}
                                                                                                </div>
                                                                                                <div class="item-category-field mb-30">
                                                                                                    <h5 className="mb-3">Select Item Catergory</h5>
                                                                                                    <ul
                                                                                                        class="item-cat-list d-flex flex-wrap">
                                                                                                    {Cat}
                                                                                                    </ul>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h5>Royalties</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                                                                                                </div>
                                                                                              
                                                                                            </div>
                                                                                        </TabPanel>
                                                                                        <TabPanel>
                                                                                            <div>
                                                                                                <div>
                                                                                                    <h5>Minimum bid</h5>
                                                                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="enter minimum bid" />
                                                                                                </div>
                                                                                                <div className="row">
                                                                                                    <div class="col-md-6">
                                                                                                        <h5>Starting date</h5>
                                                                                                        <input  id="item_price" class="input100" placeholder="dd-mm-yyyy" />
                                                                                                    </div>
                                                                                                    <div class="col-md-6">
                                                                                                        <h5>Expiration date</h5>
                                                                                                        <input id="item_price" class="input100" placeholder="dd-mm-yyyy" />
                                                                                                    </div>
                                                                                                </div>
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
                                                                                                <img src={require('../images/seller/01.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/01.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li
                                                                                            class="single-author d-flex align-items-center">
                                                                                            <a href="author.html"
                                                                                                class="veryfied">
                                                                                                  <img src={require('../images/seller/02.gif') .default} alt="" />  
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/02.gif"
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
                                                                                <img src={require('../images/nft-item/02.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/02.jpg"
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
                                                                                                    <img src={require('../images/seller/05.gif') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/05.gif"
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
                                                                                <img src={require('../images/nft-item/05.gif') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/05.gif"
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
                                                                                            <img src={require('../images/seller/01.gif') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/01.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
                                                                                        <li class="single-author">
                                                                                            <a href="author.html">
                                                                                            <img src={require('../images/seller/06.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/06.png"
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
                                                                                <img src={require('../images/nft-item/03.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/03.jpg"
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
                                                                                            <img src={require('../images/seller/03.gif') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/03.gif"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
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
                                                                                                    <img src={require('../images/seller/07.png') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/07.png"
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
                                                                                <img src={require('../images/nft-item/01.gif') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/01.gif"
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
                                                                                                    <img src={require('../images/seller/04.gif') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/04.gif"
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
                                                                                            <img src={require('../images/seller/01.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/01.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
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
                                                                                                    <img src={require('../images/seller/06.png') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/06.png"
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
                                                        </TabPanel>
                                                        {/* <div class="tab-pane fade" id="pills-favorites" role="tabpanel"
                                                            aria-labelledby="pills-favorites-tab"> */}
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
                                                                                                    <img src={require('../images/seller/06.gif') .default} alt="" />
                                                                                                    {/* <img
                                                                                                    src="assets/images/seller/06.gif"
                                                                                                    alt="author-img">
                                                                                                         */}
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
                                                                                <img src={require('../images/nft-item/02.gif') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/02.gif"
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
                                                                                            <img src={require('../images/seller/01.png') .default} alt="" />
                                                                                                {/* <img
                                                                                                    src="assets/images/seller/01.png"
                                                                                                    alt="author-img"> */}
                                                                                            </a>
                                                                                        </li>
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
                                                                                <img src={require('../images/nft-item/02.jpg') .default} alt="" />
                                                                                    {/* <img src="assets/images/nft-item/02.jpg"
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
                                                            </div>
                                                            <div class="load-btn">
                                                                <a href="#" class="default-btn move-bottom"><span>Load
                                                                        More</span> </a>
                                                            </div>
                                                        {/* </div> */}
                                                        </TabPanel>
                                                        {/* <div class="tab-pane fade" id="pills-friends" role="tabpanel"
                                                            aria-labelledby="pills-friends-tab"> */}
                                                        <TabPanel>
                                                            <div class="row justify-content-center gx-3 gy-2">
                                                             {createdItems}
                                                            </div>
                                                            <div class="load-btn">
                                                                <a href="#" class="default-btn move-bottom"><span>Load
                                                                        More</span> </a>
                                                            </div>
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

                                        
                                        <div class="col-xl-3">
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
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/01.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/01.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/02.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/02.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/03.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/03.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/04.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/04.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/05.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/05.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/06.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/06.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/07.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/07.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/08.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/08.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="#">
                                                                    <img loading="lazy" src={require('../images/nft-item/09.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/09.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </aside>
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
                                        <div class="col-xl-9">
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

                                        
                                        <div class="col-xl-3">
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
                                                                    <img loading="lazy" src={require('../images/nft-item/01.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/01.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/02.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/02.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/02.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/03.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/03.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/03.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/04.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/04.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/04.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/05.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/05.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/05.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/06.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/06.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/06.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/07.jp">
                                                                    <img loading="lazy" src={require('../images/nft-item/07.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/07.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/08.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/08.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/08.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/09.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/09.jpg') .default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/09.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </aside>
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
                                        <div class="col-xl-9">
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

                                        
                                        <div class="col-xl-3">
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
                                                                    <img loading="" src={require('../images/nft-item/01.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/01.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/02.jpg">
                                                                    <img loading="" src={require('../images/nft-item/02.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/02.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/03.jpg">
                                                                    <img loading="" src={require('../images/nft-item/03.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/03.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/04.jpg">
                                                                    <img loading="" src={require('../images/nft-item/04.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/04.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/05.jpg">
                                                                    <img loading="" src={require('../images/nft-item/05.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/05.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/06.jpg">
                                                                    <img loading="" src={require('../images/nft-item/06.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/06.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/07.jpg">
                                                                    <img loading="" src={require('../images/nft-item/07.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/07.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/08.jpg">
                                                                    <img loading="" src={require('../images/nft-item/08.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/08.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/09.jpg">
                                                                    <img loading="" src={require('../images/nft-item/09.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/09.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </aside>
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
                                        <div class="col-xl-9">
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

                                        
                                        <div class="col-xl-3">
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
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/01.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/02.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/02.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/02.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/03.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/03.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/03.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/04.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/04.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/04.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/05.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/05.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/05.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/06.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/06.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/06.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/07.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/07.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/07.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/08.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/08.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/08.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/09.jpg">
                                                                    <img loading="lazy" src={require('../images/nft-item/09.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/09.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </aside>
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
                                    <div class="col-xl-9">
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

                                   
                                    <div class="col-xl-3">
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
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/01.jpg" alt="nft-img"> */}
                                                        </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/02.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/02.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/02.jpg" alt="nft-img"> */}
                                                         </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/03.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/03.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/03.jpg" alt="nft-img"> */}
                                                         </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/04.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/04.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/04.jpg" alt="nft-img"> */}
                                                            </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/05.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/02.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/05.jpg" alt="nft-img"> */}
                                                        </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/06.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/06.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/06.jpg" alt="nft-img"> */}
                                                        </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/07.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/07.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/07.jpg" alt="nft-img"> */}
                                                         </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/08.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/08.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/08.jpg" alt="nft-img"> */}
                                                        </a>
                                                    </li>
                                                    <li><a data-rel="lightcase"
                                                            href="assets/images/nft-item/09.jpg">
                                                                <img loading="lazy" src={require('../images/nft-item/09.jpg').default} alt="" />
                                                                {/* <img loading="lazy"
                                                                src="assets/images/nft-item/09.jpg" alt="nft-img"> */}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            {/* </div> */}
                            </TabPanel>
                            {/* my wallet */}
                            {/* <div class="tab-pane fade" id="wallet" role="tabpanel" aria-labelledby="nav-wallet-tab"> */}
                            <TabPanel>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-9">
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
                                       
                                        <div class="col-xl-3">
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
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/01.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/02.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/02.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/02.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/03.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/03.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/03.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/04.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/04.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/04.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/05.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/05.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/05.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/06.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/06.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/06.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/07.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/07.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/07.jpg"
                                                                    alt="nft-img"> */}
                                                            </a></li>
                                                        <li><a data-rel="lightcase"
                                                                href="assets/images/nft-item/08.jpg">
                                                                     <img loading="lazy" src={require('../images/nft-item/08.jpg').default} alt="" />
                                                                    {/* <img loading="lazy"
                                                                    src="assets/images/nft-item/08.jpg"
                                                                    alt="nft-img"> */}
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
                                        </div>
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

        </>
    )
}
export default Author;