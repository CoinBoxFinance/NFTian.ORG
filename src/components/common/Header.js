import React from 'react';
import {Dropdown} from 'react-bootstrap';
import { useMoralis } from "react-moralis";
import { Link } from 'react-router-dom';
function Header()
{

    const { authenticate, isAuthenticated, user,logout,isAuthenticating } = useMoralis();
    // console.log(user.get)
    return (
        <>
 

            <header className="header">
        <div className="container-fluid">
            <div className="header__content">
                <div className="header__logo">
                    <a href="/">
                        <img src={require('../../images/logo/cbfinft-logo.png').default} alt="" />
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
                        

                        <li className="header__nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                    Blog
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/blog">Blog 1</Dropdown.Item>
                                    <Dropdown.Item href="/blog1">Blog 2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        
                        <li className="header__nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" id="dropdown-basic" className="header__nav-link">
                                Pages
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/nftdetails">NFT Details</Dropdown.Item>
                                    <Dropdown.Item href="/all-author">ALL Authors</Dropdown.Item>
                                    <Dropdown.Item href="/author">Author Profile</Dropdown.Item>
                                    <Dropdown.Item href="/wallet">Wallet Connect</Dropdown.Item>
                                    {/* <Dropdown.Item href="404.html">404</Dropdown.Item> */}
                                    <Dropdown.Item href="/forget-password">Forgot Password</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>

                        

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
                        </li>
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
                        <a className="header__action-btn" type="button" href="/author">{user.get("username")} </a>
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
                   
                    <div className="dropdown-item" onClick={() => logout()} disabled={isAuthenticating}>
                            Sign
                                        Out <span className="ms-1"><i className="icofont-logout"></i></span></div>
                
                    <div className="wallet-btn">
                        <a href="/wallet"><span><i className="icofont-wallet"></i></span> <span
                                className="d-none d-md-inline">234.98ETH</span> </a>
                    </div>
                    </>
                    ):(<Link className="dropdown-item" to="/signin">
                   Login <span className="ms-1"><i className="icofont-login"></i></span></Link>)}

                </div>

                <button className="menu-trigger header__btn" id="menu05">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
        <pre>
      {JSON.stringify(user)}
    </pre>
    </header>
        </>
    )
}
export default Header;