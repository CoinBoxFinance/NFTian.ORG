import React, { useState } from 'react';
import {Button, Dropdown, Modal, Nav} from 'react-bootstrap';
import { useMoralis } from "react-moralis";
import { Link } from 'react-router-dom';
import { formValidation } from '../../_services';
import { LoadingSpinerComponent } from './loader';
function Header()
{ 
    const[loader,setLoader]=useState(false)
    const [balance, setBalanvce] = React.useState('');
    const [ERR, setERR] = React.useState('');
    const [username, setusername] = React.useState('');
    const [fname, setfname] = React.useState('');
    const [lname, setlname] = React.useState('');
    const [email, setemail] = React.useState('');
    const [social1, setsocial1] = React.useState('');
    const [social2, setsocial2] = React.useState('');
    const [show, setshowmodale] = React.useState(false);
    const {  authenticate,isAuthenticated, user,userError,error,logout,isAuthenticating,Moralis , enableWeb3, isWeb3Enabled  } = useMoralis();
    const errors = {
        email: "",
        username:"",
        firsname:"",
        lastname:"",
        link1:"",
        link2:"",
       formIsValid:false,
     };
   
    React.useEffect(() => {
        if(!isWeb3Enabled && isAuthenticated){
            enableWeb3({provider: "walletconnect"})
            console.log("web3 activated");
            // if(isAuthenticated){
            //     console.log("--------------------------",user.get("firstname"))
            //     if(user.get("firstname") == undefined){
            //         console.log("open modal");
            //     }
            // }

        }

        if(isAuthenticated){
          
            console.log("--------------------------",user.get("firstname"))
              console.log(user,"===current")
              if(user && user.get("firstname") == undefined){
                setshowmodale(true)
                console.log(user,"open modal1====");
             }
        }

        var axios = require('axios');

        var config = {
          method: 'get',
          url: 'https://deep-index.moralis.io/api/v2/0x057Ec652A4F150f7FF94f089A38008f49a0DF88e/balance?chain=eth',
          headers: { 
            'accept': 'application/json', 
            'X-API-Key': '3Ur7Kdm9AtnEnIt6haF5rEFGy2gzRFRUwVI4HxtYCJJq38su3dxYEsHpxk1v5Lip'
          }
        };
        axios(config).then(function (response) {
        setBalanvce(response.data.balance);
        })
        .catch(function (error) {
          console.log(error);
        });
        

    }, []);

    async function loginwithmetamask() {
        // enableWeb3()
       await authenticate({ provider: "walletconnect" ,  chainId: 4 }).then((response) => {
            if (userError){
                console.log("User Error flagged")
                // setLoader(false)
                console.log(response)
            } else {
                // window.location.reload();
              
                let currentuser = Moralis.User.current();
                console.log(currentuser)
               
                    if(currentuser && currentuser.get("firstname") == undefined){
                    setshowmodale(true)
                    console.log(user,"open modal====");
                 }
                
              
              
                
                // setLoader(false)
                // setshowmodale(false)
            }
        })
        .catch((err) => {
            setLoader(false)
            console.log("Failed update")
             console.log(error)
            console.error("Error signing in.", err.toString());
        // setErrorMsg(response.toString());
        })
    }
  

    const createprofile = async () => {
        // console.log(user,"=====current");

  
        // setLoader(true)


        setLoader(true)
        let params = {
            "firstname":fname,
            "lastname":lname,
            "email":email,
            "username":username,
            "social_link1":social1,
            "social_link2":social2,
            
        }
        
        let validate = formValidation.createprofile(params,errors);
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
            if (userError){
                console.log("User Error flagged")
                setLoader(false)
                console.log(response)
                setshowmodale(false)
            } else {
                console.log("Sucessfully updated")
                console.log(response)
                setLoader(false)
                setshowmodale(false)
            }
        })
        .catch((err) => {
            setLoader(false)
            console.log("Failed update")
             console.log(error)
            console.error("Error signing in.", err.toString());
        // setErrorMsg(response.toString());
        setshowmodale(false)
        })
    }
       
      };
      const handleClose = () => setshowmodale(false);
      const handleShow = () => setshowmodale(true);

      function spinner() {
        document.getElementsByClassName("loader").style.display = "block";
        }

    // console.log(user.get)
    
    return (
        <>
 
           <LoadingSpinerComponent promiseInProgress={loader} />
            <header className="header">
        <div className="container-fluid">
            <div className="header__content">
                <div className="header__logo">
                    <a href="/">
                        <img src={require('../../images/logo/NFTIAN.png').default} alt="" />
                    </a>
                </div>

                <form action="#" className="header__search">
                    <input type="text" placeholder="Search items, collections, and creators"/>
                    <button type="button"><i className="icofont-search-2"></i></button>
                    <button type="button" className="close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                        </svg></button>
                </form>
                <div className="header__menu ms-auto">
                    <ul className="header__nav mb-0">
                    <li className="header__nav-item">
                            <a href="/" className="header__nav-link">Home</a>
                        </li>
                        <li className="header__nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                Explore
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/explore">Explore NFT's</Dropdown.Item>
                                    <Dropdown.Item href="/auction">Auction Page</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <a className="header__nav-link" href="/" role="button" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" data-bs-offset="0,10">Home</a>

                            <ul className="dropdown-menu header__nav-menu">
                                <li><a className="drop-down-item" href="">Home style 1</a></li>
                                <li><a className="drop-down-item" href="">Home style 2</a></li>
                                <li><a className="drop-down-item" href="index-3.html">Home style 3</a></li>
                                <li><a className="drop-down-item" href="index-4.html">Home style 4</a></li>
                            </ul> */}
                        </li>
                       
                        <li className="header__nav-item">
                            <a href="/activity" className="header__nav-link">Activity</a>
                        </li>
                        

                        <li className="header__nav-item">   <a href="/blog" className="header__nav-link">Blog</a>
                        

                            {/* <Dropdown>
                                <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                    Blog
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/blog">Blog 1</Dropdown.Item>
                                    <Dropdown.Item href="/blog1">Blog 2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </li>
                        
                        {/* <li className="header__nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                Pages
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/nftdetails">NFT Details</Dropdown.Item>
                                    <Dropdown.Item href="/all-author">ALL Authors</Dropdown.Item>
                                    <Dropdown.Item href="/author">Author Profile</Dropdown.Item>
                                    <Dropdown.Item href="/wallet">Wallet Connect</Dropdown.Item>
                                   
                                    <Dropdown.Item href="/forget-password">Forgot Password</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li> */}

                        
{/* 
                        <li className="header__nav-item">
                            <a className="header__nav-link" href="#" role="button" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" data-bs-offset="0,10"><svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
                                </svg></a>

                            <ul className="dropdown-menu header__nav-menu">
                                <li><a className="drop-down-item" href="contact.html">Contact </a></li>
                                <li><a className="drop-down-item" href="coming-soon.html">Coming soon</a></li>
                            </ul>
                        </li> */}
                    </ul>
                </div>

                

                <div className="header__actions">
                    <div className="header__action header__action--search">
                        <button className="header__action-btn" type="button"><i className="icofont-search-1"></i></button>
                    </div>
                    {isAuthenticated?(
                        <>
                    <div className="header__action header__action--profile">
                        <div className="dropdown">
                        {user?(
                        <a className="header__action-btn" type="button" href={"/user/"+user.get("ethAddress")+"?tab=create"}>{user.get("username")} </a>
                        ):(<></>)}
                      
                            {/* <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false" data-bs-offset="-100,10">
                                <span><i className="icofont-user"></i></span> <span className="d-none d-md-inline">Alex
                                    Joe</span>
                            </a> */}

                            {/* <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="author.html"><span className="me-1"><i
                                                className="icofont-options"></i></span>
                                        Profile</a></li>
                                <li><a className="dropdown-item" href="activity.html"><span className="me-1"><i
                                                className="icofont-lightning-ray"></i></span>
                                        Activity</a></li>
                                <li><a className="dropdown-item" href="signup.html"><span className="me-1"><i
                                                className="icofont-space-shuttle"></i></span>
                                        Sign
                                        Up</a></li>
                                <li><a className="dropdown-item" href="signin.html"><span className="me-1"><i
                                                className="icofont-login"></i></span> Sign
                                        In</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li><a className="dropdown-item" href="#"> Sign
                                        Out <span className="ms-1"><i className="icofont-logout"></i></span></a></li>
                            </ul> */}
                        </div>
                    </div>
                   
                    <div className="dropdown-item header__action-btn" onClick={() => logout()} disabled={isAuthenticating}>
                            Sign Out <span className="ms-1"><i className="icofont-logout"></i></span></div>
                
                    <div className="wallet-btn">
                        <a href="/wallet"><span><i className="icofont-wallet"></i></span> <span
                                className="d-none d-md-inline">{balance} ETH</span> </a>
                    </div>
                    </>




                    ):(<>   <div className="dropdown-item" onClick={() => loginwithmetamask() } >
                     Connect with wallet <span className="ms-1"></span></div>
                     {/* <Link className="dropdown-item" to="/signin">
                   Login <span className="ms-1"><i className="icofont-login"></i></span></Link>
                    */}
                   </>)}

                </div>

                <button className="menu-trigger header__btn" id="menu05">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
        <pre>
      {/* {JSON.stringify(user)} */}
    </pre>

    <Modal show={show} onHide={handleClose}
        
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered className="loader-modal">
          <Modal.Header closeButton>
          <Modal.Title> <h3 style={{marginLeft:"15px"}}>Create Profile</h3></Modal.Title>
              </Modal.Header>
        <Modal.Body className="text-center py-0">
           
            
            <form class="account-form">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="userIdInput" placeholder="name@example.com"  onChange={(e)=>setemail(e.target.value)}/>
                                <label for="userIdInput">Email</label>
                                {ERR?(<span className="errors">{ERR.email}</span>):(<></>)}
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput"
                                    placeholder="John" onChange={(e)=>setusername(e.target.value)}/>
                                <label for="floatingInput">Username</label>
                                {ERR?(<span className="errors">{ERR.username}</span>):(<></>)}

                            </div>
                              <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput"
                                    placeholder="John" onChange={(e)=>setfname(e.target.value)}/>
                                <label for="floatingInput">First Name</label>
                                {ERR?(<span className="errors">{ERR.firstname}</span>):(<></>)}

                            </div>
                            {/* <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                <label for="floatingPassword" >Password</label>
                                {ERR?(<span className="errors">{ERR.password}</span>):(<></>)}
                            </div> */}
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="confirmPass"
                                    placeholder="Smith" onChange={(e)=>setlname(e.target.value)}/>
                                <label for="confirmPass">Last Name</label>
                                {ERR?(<span className="errors">{ERR.lastname}</span>):(<></>)}
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="social1"
                                    placeholder="https://www.facebook.com/topdev21" onChange={(e)=>setsocial1(e.target.value)}/>
                                <label for="confirmPass">Social Link 1</label>
                                {ERR?(<span className="errors">{ERR.link1}</span>):(<></>)}
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="social2"
                                    placeholder="https://twitter.com/test" onChange={(e)=>setsocial2(e.target.value)}/>
                                <label for="confirmPass">Social Link 2</label>
                                {ERR?(<span className="errors">{ERR.link2}</span>):(<></>)}
                            </div>
                            <div class="form-group">

                                <span  class="d-block create-profile" onClick={ createprofile}>Create Profile</span>
                               
                            </div>
                        </form>
                        {/* <button onClick={() => signup(username, password, email)}>Sign up</button> */}


        </Modal.Body>
      </Modal>

    </header>
        </>
    )
}
export default Header;