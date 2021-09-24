
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import React from "react";
import { useMoralis } from "react-moralis";


const Home = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();

  
    return(
        <>
       

        <section className="banner-section">
        <div className="container">
            <div className="banner-wrapper">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <h1><span className="theme-color" data-blast="color">Discover</span> Collect < br></br>
                                And Sell <span className="theme-color" data-blast="color">NFT</span> Assets</h1>
                            <p>Digital Marketplace For Crypto Collectibles And Non-Fungible Tokens.
                                Buy, Sell, And Discover Exclusive Digital Assets.</p>
                            <div className="banner-btns d-flex flex-wrap">
                                <a data-blast="bgColor" href="/explore"
                                    className="default-btn move-top"><span>Explore</span> </a>
                                <a href="/signup" className="default-btn move-right"><span>Create</span> </a>
     
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-image">
                            <img src={require('../images/banner/banner-img.png').default} alt=""/>
                            {/* <img src='assets/images/banner/banner-img.png' alt="NFT Image" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="auction-section padding-top padding-bottom">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <div className="live-icon" data-blast="bgColor">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
                            <title>live</title>
                            <g id="Layer_2" data-name="Layer 2" data-blast="color">
                                <g id="Layer_2-2" data-name="Layer 2">
                                    <path d="M12,17.87l4.36,4.51,4.37-4.51A6,6,0,0,0,12,17.87Z" />
                                    <path d="M6,12.35l2.91,3a10,10,0,0,1,14.54,0l2.91-3A14.09,14.09,0,0,0,6,12.35Z" />
                                    <path
                                        d="M0,6.85l2.91,3a18.09,18.09,0,0,1,26.18,0l2.91-3A22.12,22.12,0,0,0,0,6.85Z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <h3>Live Auctions</h3>
                </div>
                <div className="header-content">
                    <div className="auction-nav d-flex flex-wrap align-items-center">
                        <div className="auction-prev"><i className="icofont-arrow-left"></i></div>
                        <div className="auction-next"><i className="icofont-arrow-right"></i></div>
                    </div>
                </div>
            </div>
            <AliceCarousel className="mb-4" autoPlay={true} controlsStrategy="alternate"  autoPlayInterval={2000} autoPlayStrategy="default"
                            infinite={true}
                            responsive={{
                                0: {
                                items: 3
                                },
                                1024: {
                                items: 4
                                }
                            }}
                            >
                            <div className="nft-item">
                                <div className="nft-inner">
                                   
                                    <div className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                            <ul className="author-list d-flex">
                                                <li className="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/01.png').default} alt="" />
                                                        {/* <img src={'assets/images/seller/01.png'}
                                                            alt="author-img" /> */}
                                                            </a>
                                                </li>
                                                <li className="single-author d-flex align-items-center">
                                                    <a href="/author" className="veryfied">
                                                        <img src={require('../images/seller/01.gif').default} alt="" />
                                                        {/* <img src={'assets/images/seller/01.gif'}
                                                            alt="author-img" /> */}
                                                            </a>
                                                    <h6><a href="/author">Jhon Doe</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="more-part">
                                            <div className=" dropstart">
                                                <a className=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i className="icofont-flikr"></i>
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#"><span>
                                                                <i className="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#"><span><i
                                                                    className="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                            <img src={require('../images/nft-item/03.gif').default} alt="" />
                                            {/* <img src={'assets/images/nft-item/03.gif'} alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" className="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span className="days">34</span><span className="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span className="hours">09</span><span className="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span className="minutes">32</span><span className="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span className="seconds">32</span><span className="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="nft-content">
                                            <h4><a href="/nftdetails">Walking On
                                                    Air</a> </h4>
                                            <div className="price-like d-flex justify-content-between align-items-center">
                                                <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" className="nft-like" data-blast="color"><i
                                                        className="icofont-heart"></i>
                                                    230</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item">
                                <div className="nft-inner">
                                    
                                    <div className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                            <ul className="author-list d-flex">
                                                <li className="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/01.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/01.png"
                                                            alt="author-img" /> */}
                                                        </a>
                                                </li>
                                                <li className="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/02.gif').default} alt="" />
                                                        {/* <img src="assets/images/seller/02.gif"
                                                            alt="author-img" /> */}
                                                            </a>
                                                </li>
                                                <li className="single-author d-flex align-items-center">
                                                    <a href="/author" className="veryfied">
                                                        <img src={require('../images/seller/02.png').default} alt="" />
                                                        {/* <img
                                                            src="assets/images/seller/02.png" alt="author-img" /> */}
                                                            </a>
                                                    <h6><a href="/author">Gucci L.</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="more-part">
                                            <div className=" dropstart">
                                                <a className=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i className="icofont-flikr"></i>
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#"><span>
                                                                <i className="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#"><span><i
                                                                    className="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                            <img src={require('../images/nft-item/03.jpg').default} alt="" />
                                            {/* <img src="assets/images/nft-item/03.jpg" alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" className="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span className="days">34</span><span className="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span className="hours">09</span><span className="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span className="minutes">32</span><span className="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span className="seconds">32</span><span className="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="nft-content">
                                            <h4><a href="/nftdetails">EUPHORIA de</a> </h4>
                                            <div className="price-like d-flex justify-content-between align-items-center">
                                                <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" className="nft-like" data-blast="color"><i
                                                        className="icofont-heart"></i>
                                                    230</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item">
                                <div className="nft-inner">
                                    
                                    <div className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                            <ul className="author-list d-flex">
                                                <li className="single-author d-flex align-items-center">
                                                    <a href="/author" className="veryfied">
                                                        <img src={require('../images/seller/04.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/04.png" alt="author-img" /> */}
                                                    </a>
                                                    <h6><a href="/author">Rassel mrh</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="more-part">
                                            <div className=" dropstart">
                                                <a className=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i className="icofont-flikr"></i>
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#"><span>
                                                                <i className="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#"><span><i
                                                                    className="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                            <img src={require('../images/nft-item/04.jpg').default} alt="" />
                                            {/* <img src="assets/images/nft-item/04.jpg" alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" className="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span className="days">34</span><span className="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span className="hours">09</span><span className="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span className="minutes">32</span><span className="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span className="seconds">32</span><span className="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="nft-content">
                                            <h4><a href="/nftdetails">Futuristic cols</a> </h4>
                                            <div className="price-like d-flex justify-content-between align-items-center">
                                                <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" className="nft-like" data-blast="color"><i
                                                        className="icofont-heart"></i>
                                                    130</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nft-item">
                                <div className="nft-inner">
                                    
                                    <div className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                            <ul className="author-list d-flex">
                                                <li className="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/04.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/04.png"
                                                            alt="author-img" /> */}
                                                    </a>
                                                </li>
                                                <li className="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/05.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/05.png"
                                                            alt="author-img" /> */}
                                                    </a>
                                                </li>
                                                <li className="single-author d-flex align-items-center">
                                                    <a href="/author" className="veryfied">
                                                        <img src={require('../images/seller/04.gif').default} alt="" />
                                                        {/* <img
                                                            src="assets/images/seller/04.gif" alt="author-img" /> */}
                                                    </a>
                                                    <h6><a href="/author">Blexa z</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="more-part">
                                            <div className=" dropstart">
                                                <a className=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i className="icofont-flikr"></i>
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#"><span>
                                                                <i className="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#"><span><i
                                                                    className="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                            <img src={require('../images/nft-item/02.gif').default} alt="" />
                                            {/* <img src="assets/images/nft-item/02.gif" alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" className="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span className="days">34</span><span className="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span className="hours">09</span><span className="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span className="minutes">32</span><span className="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span className="seconds">32</span><span className="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="nft-content">
                                            <h4><a href="/nftdetails">Space Crafts</a> </h4>
                                            <div className="price-like d-flex justify-content-between align-items-center">
                                                <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" className="nft-like" data-blast="color"><i
                                                        className="icofont-heart"></i>
                                                    230</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                </AliceCarousel>
            <div className="section-wrapper">
                <div className="auction-holder">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            
                        </div>
                        <div className="swiper-slide">
                           
                        </div>
                        <div className="swiper-slide">
                            
                        </div>
                        <div className="swiper-slide">
                           
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <section className="seller-section pb-100">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <div className="seller-icon" data-blast="bgColor">
                    </div>
                    <h3>top seller/Buyer</h3>
                </div>
                <div className="header-content d-flex flex-wrap align-items-center">
                    <ul className="seller-filter-btns d-flex flex-wrap mb-0">
                        <li className="seller-filter-btn">
                            <select className="buyer-seller-select" data-blast="bgColor">
                                <option value="*">show all</option>
                                <option value=".seller">Seller</option>
                                <option value=".buyer">Buyer</option>

                            </select>
                        </li>
                        <li className="seller-days-btn">
                            <select className="days-select" data-blast="color">
                                <option value="*">show all</option>
                                <option value=".today">Today</option>
                                <option value=".day-2">2 Days</option>
                                <option value=".day-3">3 Days</option>
                                <option value=".day-4">4 Days</option>

                            </select>
                        </li>
                    </ul>
                    <a href="all-authors.html" className="view-all-btn" data-blast="color">View All <span><i
                                className="icofont-rounded-double-right"></i></span>
                    </a>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="seller-wrapper">
                    <div className="seller-item seller today">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">21</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author" className="">
                                            <img src={require('../images/seller/01.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/01.gif"
                                                alt="seller-img"> */}

                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer day-2">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">34</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/01.png').default} alt="" />
                                            {/* <img src="assets/images/seller/01.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">goxio dom</a> </h5>
                                        <p>$12,002.48</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller day-4">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">31</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/02.png').default} alty="" />
                                            {/* <img src="assets/images/seller/02.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">pter qido</a> </h5>
                                        <p>$3,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer day-3">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">05</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/03.png').default} alt="" />
                                            {/* <img src="assets/images/seller/03.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller day3">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">09</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/04.png').default} alt="" />
                                            {/* <img src="assets/images/seller/04.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">rox zipper</a> </h5>
                                        <p>$20,02.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part activefollow">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer day-2">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">01</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/05.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/05.gif"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="#">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller today">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">30</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/06.png').default} alt="" />
                                            {/* <img src="assets/images/seller/06.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Rassel Mrh </a> </h5>
                                        <p>$93,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part activefollow">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer day-4">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">01</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/03.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/03.gif"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">holder don</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller day-2">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">91</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/07.png').default} alt="" />
                                            {/* <img src="assets/images/seller/07.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="#">annae de</a> </h5>
                                        <p>$3,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part activefollow">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer today">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">01</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/05.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/05.gif"
                                                alt="seller-img"> */}
                                         </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller day-4">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">02</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/09.png').default} alt="" />
                                            {/* <img src="assets/images/seller/09.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Xomzat paul</a> </h5>
                                        <p>$34,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer day-3">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">51</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/11.png').default} alt="" />
                                            {/* <img src="assets/images/seller/11.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller day-2">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">21</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/06.png').default} alt="" />
                                            {/* <img src="assets/images/seller/06.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">helen exo</a> </h5>
                                        <p>$2,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part activefollow">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item buyer day-4">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">61</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/06.png').default} alt="" />
                                            {/* <img src="assets/images/seller/06.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Pickas Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="seller-item seller today">
                        <div className="seller-inner">
                            <div className="seller-part">
                                <p className="assets-number">33</p>
                                <div className="assets-owner">
                                    <div className="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/10.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/10.gif"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div className="owner-content">
                                        <h5><a href="/author">Tom cat</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-part">
                                <button className="btn-follow follow-state">
                                    <span className="follow"><i className="fa fa-user-plus"></i> Follow</span>
                                    <span className="unfollow">Unfollow</span>
                                    <span className="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section className="assets-section pb-100">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <div className="live-icon" data-blast="bgColor">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
                            <title>live</title>
                            <g id="Layer_3" data-name="Layer 3">
                                <g id="Layer_3-3" data-name="Layer 3">
                                    <path d="M12,17.87l4.36,4.51,4.37-4.51A6,6,0,0,0,12,17.87Z" />
                                    <path d="M6,12.35l2.91,3a10,10,0,0,1,14.54,0l2.91-3A14.09,14.09,0,0,0,6,12.35Z" />
                                    <path
                                        d="M0,6.85l2.91,3a18.09,18.09,0,0,1,26.18,0l2.91-3A22.12,22.12,0,0,0,0,6.85Z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <h3>Featured Assets</h3>
                </div>
                <div className="header-content">
                    <ul className="asset-filter-list d-flex flex-wrap align-items-center mb-0">
                        <li className="asset-filter-btn is-checked" data-filter="*">Show all</li>
                        <li className="asset-filter-btn" data-filter=".virtual">Virtual</li>
                        <li className="asset-filter-btn" data-filter=".top">Top</li>
                        <li className="asset-filter-btn" data-filter=".collect">Collectibles</li>
                        <li className="asset-filter-btn" data-filter=".trending">trending</li>
                        <li className="asset-filter-btn" data-filter=".cards">cards</li>
                    </ul>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="assets-holder d-flex flex-wrap justify-content-center align-items-center">
                    <div className="nft-item top trending">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/author" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/04.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/04.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Gucci Lucas</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                <img loading="lazy" src={require('../images/nft-item/02.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/02.gif" alt="nft-img"> */}

                                    {/* <!-- nft countdwon --> */}
                                     <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">EUPHORIA de</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            230</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item top trending">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.gif').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.gif"
                                                    alt="author-img"> */}
                                                </a>
                                        </li>
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/author" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/02.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/02.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Ecalo jers</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/03.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/03.jpg" alt="nft-img"> */}

                                    
                                    <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">Mewao com de</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            278</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item cards virtual">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/02.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/02.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/05.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/05.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/author" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/04.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/04.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Hola moc</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/04.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/04.gif" alt="nft-img"> */}

                                    
                                     <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul> 
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">pet mice rio</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="/nftdetails" className="nft-like" data-blast="color"><i
                                                className="icofont-heart"></i>
                                            340</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item top trending">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/06.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/06.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author d-flex align-items-center">
                                            <a href="#" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/05.gif').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/05.gif" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Logicto pen</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/07.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/07.jpg" alt="nft-img"> */}

                                   
                                    <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">Logical Impact </a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            330</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item collect cards">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/06.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/06.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/07.gif').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/07.gif"
                                                    alt="author-img"> */}
                                             </a>
                                        </li>
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/author" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/09.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/09.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">unique lo</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/06.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/06.jpg" alt="nft-img"> */}

                                   
                                    <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">Fly on high</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            355</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item virtual trending">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/author" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/05.gif').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/05.gif" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Monica bel</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/05.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/05.gif" alt="nft-img"> */}

                                    
                                     <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">kiara rodri de</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            60</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item cards collect">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/08.gif').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/08.gif"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/author" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/11.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/11.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Gucci L.</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/05.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/05.jpg" alt="nft-img"> */}

                                    <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/item-detail">EUPHORIA de</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            230</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-item top trending">
                        <div className="nft-inner">
                            
                            <div className="nft-item-top d-flex justify-content-between align-items-center">
                                <div className="author-part">
                                    <ul className="author-list d-flex">
                                        <li className="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author">
                                            <a href="/nftdetails">
                                                <img loading="lazy" src={require('../images/seller/07.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/07.png" alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li className="single-author d-flex align-items-center">
                                            <a href="/nftdetails" className="veryfied">
                                                <img loading="lazy" src={require('../images/seller/09.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/09.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/nftdetails">ptrax elm.</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="more-part">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-flikr"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#"><span>
                                                        <i className="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><span><i
                                                            className="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="nft-item-bottom">
                                <div className="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/06.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/06.gif" alt="nft-img"> */}

                                    
                                    <ul data-blast="bgColor" className="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span className="days">34</span><span className="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span className="hours">09</span><span className="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span className="minutes">32</span><span className="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span className="seconds">32</span><span className="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nft-content">
                                    <h4><a href="/nftdetails">Homies wall</a> </h4>
                                    <div className="price-like d-flex justify-content-between align-items-center">
                                        <p className="nft-price">Price: <span className="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" className="nft-like" data-blast="color"><i className="icofont-heart"></i>
                                            930</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="hot-section padding-bottom">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <span><i className="icofont-fire" data-blast="color"></i></span>
                    <h3>Hot collectors</h3>
                </div>
                <div className="header-content">
                    <div className="hot-nav d-flex flex-wrap align-items-center">
                        <div className="hot-prev"><i className="icofont-arrow-left"></i></div>
                        <div className="hot-next"><i className="icofont-arrow-right"></i></div>
                    </div>
                </div>
            </div>  

            <AliceCarousel className="mb-4" autoPlay={true} controlsStrategy="alternate"  autoPlayInterval={2000} autoPlayStrategy="default"
                            infinite={true}
                            responsive={{
                                0: {
                                items: 3
                                },
                                1024: {
                                items: 4
                                }
                            }}
                            >

                            <div className="nft-item style-2">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/01.jpg').default} alt />
                                        {/* <img src="assets/images/nft-item/style-2/01.jpg" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-thumb">
                                            <a href="/author" className="veryfied">
                                                <img src={require('../images/seller/04.png').default} alt="" />
                                                {/* <img src="assets/images/seller/04.png" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div className="author-details">
                                            <h5><a href="/author">Gihan Fernindo</a> </h5>
                                            <p className="nft-price yellow-color">$23,002.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nft-item style-2">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/02.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-2/02.jpg" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-thumb">
                                            <a href="/author" className="veryfied">
                                                <img src={require('../images/seller/01.gif').default} alt="" />
                                                {/* <img src="assets/images/seller/01.gif" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div className="author-details">
                                            <h5><a href="/author">Lxr catx </a> </h5>
                                            <p className="nft-price yellow-color">$23,002.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="nft-item style-2">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/03.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-2/03.jpg" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-thumb">
                                            <a href="/author" className="veryfied">
                                                <img src={require('../images/seller/06.png').default} alt="" />
                                                {/* <img src="assets/images/seller/06.png" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div className="author-details">
                                            <h5><a href="/author">teQa tg3</a> </h5>
                                            <p className="nft-price yellow-color">$65,202.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nft-item style-2">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/04.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-2/04.jpg" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-thumb">
                                            <a href="/author" className="veryfied">
                                                <img src={require('../images/seller/07.gif').default} alt="" />
                                                {/* <img src="assets/images/seller/07.gif" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div className="author-details">
                                            <h5><a href="/author">gHro Xr39</a> </h5>
                                            <p className="nft-price yellow-color">$23,002.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </AliceCarousel>
           

            <div className="section-wrapper">
                <div className="hot-holder">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            
                        </div>
                        <div className="swiper-slide">
                            
                        </div>
                        <div className="swiper-slide">
                            
                        </div>
                        <div className="swiper-slide">
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>


    <section className="process-section padding-bottom">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <span><i className="icofont-bulb-alt" data-blast="color"></i></span>
                    <h3>Creat And Sell your nfts</h3>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="nft-sell-wrapper">
                    <div className="row justify-content-center gx-4 gy-2">
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="nft-item style-3">
                                <div className="nft-inner text-center">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/01.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/01.png" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-details">
                                            <h4>Set Up Your Wallet</h4>
                                            <p>Click Create & set up your colecton
                                                Add social links and a description profile
                                                banner images and set</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="nft-item style-3">
                                <div className="nft-inner text-center">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/02.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/02.png" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <h4>Creat Your Collection</h4>
                                        <p>Click Create & set up your colecton
                                            Add social links and a description profile
                                            banner images and set</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="nft-item style-3">
                                <div className="nft-inner text-center">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/03.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/03.png" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-details">
                                            <h4>Add Your NFTs</h4>
                                            <p>Click Create & set up your colecton
                                                Add social links and a description profile
                                                banner images and set</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="nft-item style-3">
                                <div className="nft-inner text-center">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/04.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/04.png" alt="nft-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-details">
                                            <h4>List Them For Sale</h4>
                                            <p>Click Create & set up your colecton
                                                Add social links and a description profile
                                                banner images and set</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </section>

    <section className="blog-section padding-bottom">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <span><i className="icofont-newspaper" data-blast="color"></i></span>
                    <h3>our blog post</h3>
                </div>
                <div className="header-content d-flex flex-wrap align-items-center">
                    <a href="/blog" className="view-all-btn" data-blast="color">View All <span><i
                                className="icofont-rounded-double-right"></i></span>
                    </a>
                </div>
            </div>
            <div className="section-wrapper">

                <div className="blog-wrapper">
                    <div className="row justify-content-center gx-4 gy-3">
                        <div className="col-lg-4 col-sm-6">
                            <div className="nft-item blog-item">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/blog/02.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/blog/02.jpg" alt="blog-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-details">
                                            <h4><a href="blog-single.html">The Rise of the Non Fungible Tokens
                                                    (NFTs)</a> </h4>
                                            <div className="meta-info">
                                                <p><span><i className="icofont-ui-calendar"
                                                            data-blast="color"></i></span>July 20 2021
                                                </p>
                                                <p><span><i className="icofont-user" data-blast="color"></i></span>Jhon doe
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="nft-item blog-item">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/blog/03.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/blog/03.jpg" alt="blog-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-details">
                                            <h4><a href="blog-single.html"> Top 5 Most Popular NFT Games in 2021</a>
                                            </h4>
                                            <div className="meta-info">
                                                <p><span><i className="icofont-ui-calendar"
                                                            data-blast="color"></i></span>July 20 2021
                                                </p>
                                                <p><span><i className="icofont-user" data-blast="color"></i></span>Rassel H.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="nft-item blog-item">
                                <div className="nft-inner">
                                    <div className="nft-thumb">
                                        <img src={require('../images/nft-item/blog/01.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/blog/01.jpg" alt="blog-img"> */}
                                    </div>
                                    <div className="nft-content">
                                        <div className="author-details">
                                            <h4><a href="blog-single.html">Best NFT Selling Marketplace website</a>
                                            </h4>
                                            <div className="meta-info">
                                                <p><span><i className="icofont-ui-calendar"
                                                            data-blast="color"></i></span>July 20 2021
                                                </p>
                                                <p><span><i className="icofont-user" data-blast="color"></i></span>Alex zym
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="sponsor-section pb-120">
        <div className="container">
            <div className="section-header">
                <div className="header-title">
                    <span><i className="icofont-cubes" data-blast="color"></i></span>
                    <h3>our partners Logo </h3>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="sponsor-wrapper">
                    <div className="row align-items-center justify-content-center g-5">
                        <div className="col-lg-2 col-sm-3 col-4">
                            <a href="#" className="sponsor-img text-center">
                                <img src={require('../images/sponsor/01.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/01.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div className="col-lg-2 col-sm-3 col-4">
                            <a href="#" className="sponsor-img text-center">
                                <img src={require('../images/sponsor/02.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/02.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div className="col-lg-2 col-sm-3 col-4">
                            <a href="#" className="sponsor-img text-center">
                                <img src={require('../images/sponsor/03.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/03.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div className="col-lg-2 col-sm-3 col-4">
                            <a href="#" className="sponsor-img text-center">
                                <img src={require('../images/sponsor/04.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/04.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div className="col-lg-2 col-sm-3 col-4">
                            <a href="#" className="sponsor-img text-center">
                                <img src={require('../images/sponsor/05.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/05.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div className="col-lg-2 col-sm-3 col-4">
                            <a href="#" className="sponsor-img text-center">
                                <img src={require('../images/sponsor/06.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/06.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
    )
                        
}

export default Home;