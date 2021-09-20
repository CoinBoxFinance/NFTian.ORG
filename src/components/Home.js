
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Footer from './Footer';
import Header from './Header';


const Home = () => {
    return(
        <>
        <Header />
        <section class="banner-section">
        <div class="container">
            <div class="banner-wrapper">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <div class="banner-content">
                            <h1><span class="theme-color" data-blast="color">Discover</span> Collect < br></br>
                                And Sell <span class="theme-color" data-blast="color">NFT</span> Assets</h1>
                            <p>Digital Marketplace For Crypto Collectibles And Non-Fungible Tokens.
                                Buy, Sell, And Discover Exclusive Digital Assets.</p>
                            <div class="banner-btns d-flex flex-wrap">
                                <a data-blast="bgColor" href="/explore"
                                    class="default-btn move-top"><span>Explore</span> </a>
                                <a href="/signup" class="default-btn move-right"><span>Create</span> </a>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="banner-image">
                            <img src={require('../images/banner/banner-img.png').default} alt=""/>
                            {/* <img src='assets/images/banner/banner-img.png' alt="NFT Image" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section class="auction-section padding-top padding-bottom">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <div class="live-icon" data-blast="bgColor">
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
                <div class="header-content">
                    <div class="auction-nav d-flex flex-wrap align-items-center">
                        <div class="auction-prev"><i class="icofont-arrow-left"></i></div>
                        <div class="auction-next"><i class="icofont-arrow-right"></i></div>
                    </div>
                </div>
            </div>
            <AliceCarousel class="mb-4" autoPlay={true} controlsStrategy="alternate"  autoPlayInterval={2000} autoPlayStrategy="default"
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
                            <div class="nft-item">
                                <div class="nft-inner">
                                   
                                    <div class="nft-item-top d-flex justify-content-between align-items-center">
                                        <div class="author-part">
                                            <ul class="author-list d-flex">
                                                <li class="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/01.png').default} alt="" />
                                                        {/* <img src={'assets/images/seller/01.png'}
                                                            alt="author-img" /> */}
                                                            </a>
                                                </li>
                                                <li class="single-author d-flex align-items-center">
                                                    <a href="/author" class="veryfied">
                                                        <img src={require('../images/seller/01.gif').default} alt="" />
                                                        {/* <img src={'assets/images/seller/01.gif'}
                                                            alt="author-img" /> */}
                                                            </a>
                                                    <h6><a href="/author">Jhon Doe</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="more-part">
                                            <div class=" dropstart">
                                                <a class=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i class="icofont-flikr"></i>
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"><span>
                                                                <i class="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"><span><i
                                                                    class="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="nft-item-bottom">
                                        <div class="nft-thumb">
                                            <img src={require('../images/nft-item/03.gif').default} alt="" />
                                            {/* <img src={'assets/images/nft-item/03.gif'} alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" class="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span class="days">34</span><span class="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span class="hours">09</span><span class="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span class="minutes">32</span><span class="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span class="seconds">32</span><span class="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="nft-content">
                                            <h4><a href="/nftdetails">Walking On
                                                    Air</a> </h4>
                                            <div class="price-like d-flex justify-content-between align-items-center">
                                                <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" class="nft-like" data-blast="color"><i
                                                        class="icofont-heart"></i>
                                                    230</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item">
                                <div class="nft-inner">
                                    
                                    <div class="nft-item-top d-flex justify-content-between align-items-center">
                                        <div class="author-part">
                                            <ul class="author-list d-flex">
                                                <li class="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/01.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/01.png"
                                                            alt="author-img" /> */}
                                                        </a>
                                                </li>
                                                <li class="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/02.gif').default} alt="" />
                                                        {/* <img src="assets/images/seller/02.gif"
                                                            alt="author-img" /> */}
                                                            </a>
                                                </li>
                                                <li class="single-author d-flex align-items-center">
                                                    <a href="/author" class="veryfied">
                                                        <img src={require('../images/seller/02.png').default} alt="" />
                                                        {/* <img
                                                            src="assets/images/seller/02.png" alt="author-img" /> */}
                                                            </a>
                                                    <h6><a href="/author">Gucci L.</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="more-part">
                                            <div class=" dropstart">
                                                <a class=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i class="icofont-flikr"></i>
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"><span>
                                                                <i class="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"><span><i
                                                                    class="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="nft-item-bottom">
                                        <div class="nft-thumb">
                                            <img src={require('../images/nft-item/03.jpg').default} alt="" />
                                            {/* <img src="assets/images/nft-item/03.jpg" alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" class="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span class="days">34</span><span class="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span class="hours">09</span><span class="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span class="minutes">32</span><span class="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span class="seconds">32</span><span class="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="nft-content">
                                            <h4><a href="/nftdetails">EUPHORIA de</a> </h4>
                                            <div class="price-like d-flex justify-content-between align-items-center">
                                                <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" class="nft-like" data-blast="color"><i
                                                        class="icofont-heart"></i>
                                                    230</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item">
                                <div class="nft-inner">
                                    
                                    <div class="nft-item-top d-flex justify-content-between align-items-center">
                                        <div class="author-part">
                                            <ul class="author-list d-flex">
                                                <li class="single-author d-flex align-items-center">
                                                    <a href="/author" class="veryfied">
                                                        <img src={require('../images/seller/04.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/04.png" alt="author-img" /> */}
                                                    </a>
                                                    <h6><a href="/author">Rassel mrh</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="more-part">
                                            <div class=" dropstart">
                                                <a class=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i class="icofont-flikr"></i>
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"><span>
                                                                <i class="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"><span><i
                                                                    class="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="nft-item-bottom">
                                        <div class="nft-thumb">
                                            <img src={require('../images/nft-item/04.jpg').default} alt="" />
                                            {/* <img src="assets/images/nft-item/04.jpg" alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" class="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span class="days">34</span><span class="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span class="hours">09</span><span class="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span class="minutes">32</span><span class="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span class="seconds">32</span><span class="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="nft-content">
                                            <h4><a href="/nftdetails">Futuristic cols</a> </h4>
                                            <div class="price-like d-flex justify-content-between align-items-center">
                                                <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" class="nft-like" data-blast="color"><i
                                                        class="icofont-heart"></i>
                                                    130</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nft-item">
                                <div class="nft-inner">
                                    
                                    <div class="nft-item-top d-flex justify-content-between align-items-center">
                                        <div class="author-part">
                                            <ul class="author-list d-flex">
                                                <li class="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/04.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/04.png"
                                                            alt="author-img" /> */}
                                                    </a>
                                                </li>
                                                <li class="single-author">
                                                    <a href="/author">
                                                        <img src={require('../images/seller/05.png').default} alt="" />
                                                        {/* <img src="assets/images/seller/05.png"
                                                            alt="author-img" /> */}
                                                    </a>
                                                </li>
                                                <li class="single-author d-flex align-items-center">
                                                    <a href="/author" class="veryfied">
                                                        <img src={require('../images/seller/04.gif').default} alt="" />
                                                        {/* <img
                                                            src="assets/images/seller/04.gif" alt="author-img" /> */}
                                                    </a>
                                                    <h6><a href="/author">Blexa z</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="more-part">
                                            <div class=" dropstart">
                                                <a class=" dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    data-bs-offset="25,0">
                                                    <i class="icofont-flikr"></i>
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"><span>
                                                                <i class="icofont-warning"></i>
                                                            </span> Report </a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"><span><i
                                                                    class="icofont-reply"></i></span> Share</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="nft-item-bottom">
                                        <div class="nft-thumb">
                                            <img src={require('../images/nft-item/02.gif').default} alt="" />
                                            {/* <img src="assets/images/nft-item/02.gif" alt="nft-img" /> */}

                                            
                                            <ul data-blast="bgColor" class="nft-countdown count-down"
                                                data-date="July 05, 2022 21:14:01">
                                                <li>
                                                    <span class="days">34</span><span class="count-txt">D</span>
                                                </li>
                                                <li>
                                                    <span class="hours">09</span><span class="count-txt">H</span>
                                                </li>
                                                <li>
                                                    <span class="minutes">32</span><span class="count-txt">M</span>
                                                </li>
                                                <li>
                                                    <span class="seconds">32</span><span class="count-txt">S</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="nft-content">
                                            <h4><a href="/nftdetails">Space Crafts</a> </h4>
                                            <div class="price-like d-flex justify-content-between align-items-center">
                                                <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                                </p>
                                                <a href="#" class="nft-like" data-blast="color"><i
                                                        class="icofont-heart"></i>
                                                    230</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                </AliceCarousel>
            <div class="section-wrapper">
                <div class="auction-holder">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            
                        </div>
                        <div class="swiper-slide">
                           
                        </div>
                        <div class="swiper-slide">
                            
                        </div>
                        <div class="swiper-slide">
                           
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <section class="seller-section pb-100">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <div class="seller-icon" data-blast="bgColor">
                    </div>
                    <h3>top seller/Buyer</h3>
                </div>
                <div class="header-content d-flex flex-wrap align-items-center">
                    <ul class="seller-filter-btns d-flex flex-wrap mb-0">
                        <li class="seller-filter-btn">
                            <select class="buyer-seller-select" data-blast="bgColor">
                                <option value="*">show all</option>
                                <option value=".seller">Seller</option>
                                <option value=".buyer">Buyer</option>

                            </select>
                        </li>
                        <li class="seller-days-btn">
                            <select class="days-select" data-blast="color">
                                <option value="*">show all</option>
                                <option value=".today">Today</option>
                                <option value=".day-2">2 Days</option>
                                <option value=".day-3">3 Days</option>
                                <option value=".day-4">4 Days</option>

                            </select>
                        </li>
                    </ul>
                    <a href="all-authors.html" class="view-all-btn" data-blast="color">View All <span><i
                                class="icofont-rounded-double-right"></i></span>
                    </a>
                </div>
            </div>
            <div class="section-wrapper">
                <div class="seller-wrapper">
                    <div class="seller-item seller today">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">21</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author" class="">
                                            <img src={require('../images/seller/01.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/01.gif"
                                                alt="seller-img"> */}

                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer day-2">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">34</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/01.png').default} alt="" />
                                            {/* <img src="assets/images/seller/01.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">goxio dom</a> </h5>
                                        <p>$12,002.48</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller day-4">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">31</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/02.png').default} alty="" />
                                            {/* <img src="assets/images/seller/02.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">pter qido</a> </h5>
                                        <p>$3,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer day-3">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">05</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/03.png').default} alt="" />
                                            {/* <img src="assets/images/seller/03.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller day3">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">09</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/04.png').default} alt="" />
                                            {/* <img src="assets/images/seller/04.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">rox zipper</a> </h5>
                                        <p>$20,02.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part activefollow">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer day-2">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">01</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/05.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/05.gif"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="#">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller today">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">30</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/06.png').default} alt="" />
                                            {/* <img src="assets/images/seller/06.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Rassel Mrh </a> </h5>
                                        <p>$93,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part activefollow">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer day-4">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">01</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/03.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/03.gif"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">holder don</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller day-2">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">91</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/07.png').default} alt="" />
                                            {/* <img src="assets/images/seller/07.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="#">annae de</a> </h5>
                                        <p>$3,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part activefollow">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer today">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">01</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/05.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/05.gif"
                                                alt="seller-img"> */}
                                         </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller day-4">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">02</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/09.png').default} alt="" />
                                            {/* <img src="assets/images/seller/09.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Xomzat paul</a> </h5>
                                        <p>$34,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer day-3">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">51</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/11.png').default} alt="" />
                                            {/* <img src="assets/images/seller/11.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Andrea Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller day-2">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">21</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/06.png').default} alt="" />
                                            {/* <img src="assets/images/seller/06.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">helen exo</a> </h5>
                                        <p>$2,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part activefollow">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item buyer day-4">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">61</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/06.png').default} alt="" />
                                            {/* <img src="assets/images/seller/06.png"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Pickas Guido</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seller-item seller today">
                        <div class="seller-inner">
                            <div class="seller-part">
                                <p class="assets-number">33</p>
                                <div class="assets-owner">
                                    <div class="owner-thumb veryfied">
                                        <a href="/author">
                                            <img src={require('../images/seller/10.gif').default} alt="" />
                                            {/* <img src="assets/images/seller/10.gif"
                                                alt="seller-img"> */}
                                        </a>
                                    </div>
                                    <div class="owner-content">
                                        <h5><a href="/author">Tom cat</a> </h5>
                                        <p>$23,002.98</p>
                                    </div>
                                </div>
                            </div>
                            <div class="follow-part">
                                <button class="btn-follow follow-state">
                                    <span class="follow"><i class="fa fa-user-plus"></i> Follow</span>
                                    <span class="unfollow">Unfollow</span>
                                    <span class="following">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section class="assets-section pb-100">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <div class="live-icon" data-blast="bgColor">
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
                <div class="header-content">
                    <ul class="asset-filter-list d-flex flex-wrap align-items-center mb-0">
                        <li class="asset-filter-btn is-checked" data-filter="*">Show all</li>
                        <li class="asset-filter-btn" data-filter=".virtual">Virtual</li>
                        <li class="asset-filter-btn" data-filter=".top">Top</li>
                        <li class="asset-filter-btn" data-filter=".collect">Collectibles</li>
                        <li class="asset-filter-btn" data-filter=".trending">trending</li>
                        <li class="asset-filter-btn" data-filter=".cards">cards</li>
                    </ul>
                </div>
            </div>
            <div class="section-wrapper">
                <div class="assets-holder d-flex flex-wrap justify-content-center align-items-center">
                    <div class="nft-item top trending">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/author" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/04.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/04.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Gucci Lucas</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                <img loading="lazy" src={require('../images/nft-item/02.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/02.gif" alt="nft-img"> */}

                                    {/* <!-- nft countdwon --> */}
                                     <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">EUPHORIA de</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
                                            230</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item top trending">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.gif').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.gif"
                                                    alt="author-img"> */}
                                                </a>
                                        </li>
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/author" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/02.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/02.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Ecalo jers</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/03.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/03.jpg" alt="nft-img"> */}

                                    
                                    <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">Mewao com de</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
                                            278</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item cards virtual">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/02.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/02.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/05.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/05.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/author" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/04.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/04.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Hola moc</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/04.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/04.gif" alt="nft-img"> */}

                                    
                                     <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul> 
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">pet mice rio</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="/nftdetails" class="nft-like" data-blast="color"><i
                                                class="icofont-heart"></i>
                                            340</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item top trending">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/06.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/06.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author d-flex align-items-center">
                                            <a href="#" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/05.gif').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/05.gif" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Logicto pen</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/07.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/07.jpg" alt="nft-img"> */}

                                   
                                    <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">Logical Impact </a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
                                            330</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item collect cards">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/06.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/06.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/07.gif').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/07.gif"
                                                    alt="author-img"> */}
                                             </a>
                                        </li>
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/author" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/09.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/09.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">unique lo</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/06.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/06.jpg" alt="nft-img"> */}

                                   
                                    <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">Fly on high</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
                                            355</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item virtual trending">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/author" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/05.gif').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/05.gif" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Monica bel</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/05.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/05.gif" alt="nft-img"> */}

                                    
                                     <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">kiara rodri de</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
                                            60</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item cards collect">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/08.gif').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/08.gif"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/author" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/11.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/11.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/author">Gucci L.</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/05.jpg').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/05.jpg" alt="nft-img"> */}

                                    <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/item-detail">EUPHORIA de</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
                                            230</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nft-item top trending">
                        <div class="nft-inner">
                            
                            <div class="nft-item-top d-flex justify-content-between align-items-center">
                                <div class="author-part">
                                    <ul class="author-list d-flex">
                                        <li class="single-author">
                                            <a href="/author">
                                                <img loading="lazy" src={require('../images/seller/01.png').default} alt="" />
                                                {/* <img loading="lazy" src="assets/images/seller/01.png"
                                                    alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author">
                                            <a href="/nftdetails">
                                                <img loading="lazy" src={require('../images/seller/07.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/07.png" alt="author-img"> */}
                                            </a>
                                        </li>
                                        <li class="single-author d-flex align-items-center">
                                            <a href="/nftdetails" class="veryfied">
                                                <img loading="lazy" src={require('../images/seller/09.png').default} alt="" />
                                                {/* <img loading="lazy"
                                                    src="assets/images/seller/09.png" alt="author-img"> */}
                                            </a>
                                            <h6><a href="/nftdetails">ptrax elm.</a></h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="more-part">
                                    <div class=" dropstart">
                                        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i class="icofont-flikr"></i>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#"><span>
                                                        <i class="icofont-warning"></i>
                                                    </span> Report </a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><span><i
                                                            class="icofont-reply"></i></span> Share</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="nft-item-bottom">
                                <div class="nft-thumb">
                                    <img loading="lazy" src={require('../images/nft-item/06.gif').default} alt="" />
                                    {/* <img loading="lazy" src="assets/images/nft-item/06.gif" alt="nft-img"> */}

                                    
                                    <ul data-blast="bgColor" class="nft-countdown count-down"
                                        data-date="July 05, 2022 21:14:01">
                                        <li>
                                            <span class="days">34</span><span class="count-txt">D</span>
                                        </li>
                                        <li>
                                            <span class="hours">09</span><span class="count-txt">H</span>
                                        </li>
                                        <li>
                                            <span class="minutes">32</span><span class="count-txt">M</span>
                                        </li>
                                        <li>
                                            <span class="seconds">32</span><span class="count-txt">S</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nft-content">
                                    <h4><a href="/nftdetails">Homies wall</a> </h4>
                                    <div class="price-like d-flex justify-content-between align-items-center">
                                        <p class="nft-price">Price: <span class="yellow-color">0.34 ETH</span>
                                        </p>
                                        <a href="#" class="nft-like" data-blast="color"><i class="icofont-heart"></i>
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

    <section class="hot-section padding-bottom">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <span><i class="icofont-fire" data-blast="color"></i></span>
                    <h3>Hot collectors</h3>
                </div>
                <div class="header-content">
                    <div class="hot-nav d-flex flex-wrap align-items-center">
                        <div class="hot-prev"><i class="icofont-arrow-left"></i></div>
                        <div class="hot-next"><i class="icofont-arrow-right"></i></div>
                    </div>
                </div>
            </div>  

            <AliceCarousel class="mb-4" autoPlay={true} controlsStrategy="alternate"  autoPlayInterval={2000} autoPlayStrategy="default"
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

                            <div class="nft-item style-2">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/01.jpg').default} alt />
                                        {/* <img src="assets/images/nft-item/style-2/01.jpg" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-thumb">
                                            <a href="/author" class="veryfied">
                                                <img src={require('../images/seller/04.png').default} alt="" />
                                                {/* <img src="assets/images/seller/04.png" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div class="author-details">
                                            <h5><a href="/author">Gihan Fernindo</a> </h5>
                                            <p class="nft-price yellow-color">$23,002.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nft-item style-2">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/02.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-2/02.jpg" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-thumb">
                                            <a href="/author" class="veryfied">
                                                <img src={require('../images/seller/01.gif').default} alt="" />
                                                {/* <img src="assets/images/seller/01.gif" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div class="author-details">
                                            <h5><a href="/author">Lxr catx </a> </h5>
                                            <p class="nft-price yellow-color">$23,002.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="nft-item style-2">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/03.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-2/03.jpg" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-thumb">
                                            <a href="/author" class="veryfied">
                                                <img src={require('../images/seller/06.png').default} alt="" />
                                                {/* <img src="assets/images/seller/06.png" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div class="author-details">
                                            <h5><a href="/author">teQa tg3</a> </h5>
                                            <p class="nft-price yellow-color">$65,202.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nft-item style-2">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-2/04.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-2/04.jpg" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-thumb">
                                            <a href="/author" class="veryfied">
                                                <img src={require('../images/seller/07.gif').default} alt="" />
                                                {/* <img src="assets/images/seller/07.gif" alt="author-img"> */}
                                            </a>
                                        </div>
                                        <div class="author-details">
                                            <h5><a href="/author">gHro Xr39</a> </h5>
                                            <p class="nft-price yellow-color">$23,002.98</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </AliceCarousel>
           

            <div class="section-wrapper">
                <div class="hot-holder">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            
                        </div>
                        <div class="swiper-slide">
                            
                        </div>
                        <div class="swiper-slide">
                            
                        </div>
                        <div class="swiper-slide">
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>


    <section class="process-section padding-bottom">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <span><i class="icofont-bulb-alt" data-blast="color"></i></span>
                    <h3>Creat And Sell your nfts</h3>
                </div>
            </div>
            <div class="section-wrapper">
                <div class="nft-sell-wrapper">
                    <div class="row justify-content-center gx-4 gy-2">
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="nft-item style-3">
                                <div class="nft-inner text-center">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/01.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/01.png" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-details">
                                            <h4>Set Up Your Wallet</h4>
                                            <p>Click Create & set up your colecton
                                                Add social links and a description profile
                                                banner images and set</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="nft-item style-3">
                                <div class="nft-inner text-center">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/02.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/02.png" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <h4>Creat Your Collection</h4>
                                        <p>Click Create & set up your colecton
                                            Add social links and a description profile
                                            banner images and set</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="nft-item style-3">
                                <div class="nft-inner text-center">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/03.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/03.png" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-details">
                                            <h4>Add Your NFTs</h4>
                                            <p>Click Create & set up your colecton
                                                Add social links and a description profile
                                                banner images and set</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="nft-item style-3">
                                <div class="nft-inner text-center">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/style-3/04.png').default} alt="" />
                                        {/* <img src="assets/images/nft-item/style-3/04.png" alt="nft-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-details">
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

    <section class="blog-section padding-bottom">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <span><i class="icofont-newspaper" data-blast="color"></i></span>
                    <h3>our blog post</h3>
                </div>
                <div class="header-content d-flex flex-wrap align-items-center">
                    <a href="/blog" class="view-all-btn" data-blast="color">View All <span><i
                                class="icofont-rounded-double-right"></i></span>
                    </a>
                </div>
            </div>
            <div class="section-wrapper">

                <div class="blog-wrapper">
                    <div class="row justify-content-center gx-4 gy-3">
                        <div class="col-lg-4 col-sm-6">
                            <div class="nft-item blog-item">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/blog/02.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/blog/02.jpg" alt="blog-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-details">
                                            <h4><a href="blog-single.html">The Rise of the Non Fungible Tokens
                                                    (NFTs)</a> </h4>
                                            <div class="meta-info">
                                                <p><span><i class="icofont-ui-calendar"
                                                            data-blast="color"></i></span>July 20 2021
                                                </p>
                                                <p><span><i class="icofont-user" data-blast="color"></i></span>Jhon doe
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="nft-item blog-item">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/blog/03.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/blog/03.jpg" alt="blog-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-details">
                                            <h4><a href="blog-single.html"> Top 5 Most Popular NFT Games in 2021</a>
                                            </h4>
                                            <div class="meta-info">
                                                <p><span><i class="icofont-ui-calendar"
                                                            data-blast="color"></i></span>July 20 2021
                                                </p>
                                                <p><span><i class="icofont-user" data-blast="color"></i></span>Rassel H.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="nft-item blog-item">
                                <div class="nft-inner">
                                    <div class="nft-thumb">
                                        <img src={require('../images/nft-item/blog/01.jpg').default} alt="" />
                                        {/* <img src="assets/images/nft-item/blog/01.jpg" alt="blog-img"> */}
                                    </div>
                                    <div class="nft-content">
                                        <div class="author-details">
                                            <h4><a href="blog-single.html">Best NFT Selling Marketplace website</a>
                                            </h4>
                                            <div class="meta-info">
                                                <p><span><i class="icofont-ui-calendar"
                                                            data-blast="color"></i></span>July 20 2021
                                                </p>
                                                <p><span><i class="icofont-user" data-blast="color"></i></span>Alex zym
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

    <section class="sponsor-section pb-120">
        <div class="container">
            <div class="section-header">
                <div class="header-title">
                    <span><i class="icofont-cubes" data-blast="color"></i></span>
                    <h3>our partners Logo </h3>
                </div>
            </div>
            <div class="section-wrapper">
                <div class="sponsor-wrapper">
                    <div class="row align-items-center justify-content-center g-5">
                        <div class="col-lg-2 col-sm-3 col-4">
                            <a href="#" class="sponsor-img text-center">
                                <img src={require('../images/sponsor/01.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/01.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div class="col-lg-2 col-sm-3 col-4">
                            <a href="#" class="sponsor-img text-center">
                                <img src={require('../images/sponsor/02.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/02.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div class="col-lg-2 col-sm-3 col-4">
                            <a href="#" class="sponsor-img text-center">
                                <img src={require('../images/sponsor/03.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/03.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div class="col-lg-2 col-sm-3 col-4">
                            <a href="#" class="sponsor-img text-center">
                                <img src={require('../images/sponsor/04.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/04.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div class="col-lg-2 col-sm-3 col-4">
                            <a href="#" class="sponsor-img text-center">
                                <img src={require('../images/sponsor/05.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/05.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                        <div class="col-lg-2 col-sm-3 col-4">
                            <a href="#" class="sponsor-img text-center">
                                <img src={require('../images/sponsor/06.png').default} alt="" />
                                {/* <img src="assets/images/sponsor/06.png" alt="sponsor-img"> */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
    </>
    )
}

export default Home;