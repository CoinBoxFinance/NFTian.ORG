import { useEffect, useState, setState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Blog = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const pageContentCnt = 5;
    const pageNumberCnt = 5;
    const [blogs, setBlogs] = useState([]);
    const [currentBlogs, setCurrentBlogs] = useState([]);
    const [pageNumbers, setPageNumbers] = useState([{"target": 0, "string": "1"}]);
    useEffect(async () => {
    //    apiKey: "b4711ed7a62910d26d65f6c04713efc48b267b7faa6b880f2e36117dbab97b93"
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?feed=NFT');
        const myJson = await response.json(); //extract JSON from the http response
        setBlogs(myJson["Data"]);
        var floor = Math.floor(myJson["Data"].length/pageContentCnt);
        if( floor * pageContentCnt < myJson["Data"].length)
            floor ++;
        if( floor == 0)
            floor = 1;
        setTotalPage(floor);
        setPage(0, myJson["Data"], floor);
    }, []);
    const setPage = function(pageIndex, dataBlogs, totalPage) {
        var firstPage, endPage;
        var deltaPageNumCnt = Math.floor( pageNumberCnt/2);
        firstPage = pageIndex - deltaPageNumCnt;
        if( firstPage < 0)
            firstPage = 0;
        endPage = firstPage + pageNumberCnt - 1;
        if( endPage >= totalPage)
            endPage = totalPage - 1;
        firstPage = endPage - pageNumberCnt + 1;
        if( firstPage < 0) firstPage = 0;
        var pageNumbers_tmp = [];
        for(var i = firstPage; i <= endPage; i ++) {
            pageNumbers_tmp.push({"target": i, "string": "" + (i + 1)});
        }
        setPageNumbers(pageNumbers_tmp);
        var startIndex, endIndex;
        startIndex = pageIndex * pageContentCnt;
        endIndex = startIndex + pageContentCnt;
        if( endIndex > dataBlogs.length)
            endIndex = dataBlogs.length;
        setCurrentPage(pageIndex);
        setCurrentBlogs(dataBlogs.slice(startIndex, endIndex));
    }
    const setNextPage = function() {
        if( currentPage + 1 >= totalPage)
            return;
        setPage(currentPage + 1, blogs, totalPage);
    }
    const setPrevPage = function() {
        if( currentPage <= 0)
            return;
        setPage(currentPage - 1, blogs, totalPage);
    }
    const setFirstPage = function() {
        setPage(0, blogs, totalPage);
    }
    const setLastPage = function() {
        if( totalPage != 0)
            setPage( totalPage - 1, blogs, totalPage);
        else
            setPage( 0, blogs, totalPage);
    }
    return(
    <>

    <section class="page-header-section style-1">
        <div class="container">
            <div class="page-header-content">
                <div class="page-header-inner">
                    <div class="page-title">
                        <h2>Blog Page </h2>
                    </div>
                    <ol class="breadcrumb">
                        <li><a >Home</a></li>
                        <li class="active">Blog Page </li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <section class="blog-section padding-top padding-bottom">
        <div class="container">
            <div class="main-blog">
                <div class="row">
                    <div class="col-lg-9 col-12">
                        <div class="blog-wrapper">
                        { blogs.length != 0 && 
                        (currentBlogs.map((blog)=> {
                    console.log( new Date(blog.published_on*1000).toDateString(),blog.published_on)
                            const d =new Date(blog.published_on*1000);
                            ;
                           let date = new Date(blog.published_on*1000).toDateString()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
   
                            
                           return (
                        
                            <div class="post-item">
                                <div class="post-item-inner">
                                    <div class="post-thumb">
                                        <a href={blog.url} target = "_blank">
                                            <img src={blog.imageurl} alt="blog" />
                                            { /*<img src="assets/images/blog/01.gif" alt="blog">*/ }
                                        </a>
                                    </div>
                                    <div class="post-content">
                                        <span class="meta">By <a href="#">{blog.source}</a> {date}</span>
                                        <h3><a href={blog.url} target = "_blank">{blog.title}</a></h3>
                                        <p>{blog.body}</p>
                                    </div>
                                    <div class="blog-footer">
                                        <a href={blog.url} target = "_blank">Read More <i
                                                class="icofont-double-right"></i></a>
                                        <div class="right">
                                            <a href="#" class="blog-heart"><i class="icofont-heart-alt"></i> {blog.upvotes} <span
                                                    class="d-none d-sm-inline-block">Like</span> </a>
                                            {/* <a href="#" class="blog-comment"><i class="icofont-comment"></i> 24
                                                <span class="d-none d-sm-inline-block">Comments</span> </a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                                            }
                        ))
                        }
                        </div>
                        <div class="paginations">
                            <ul class="lab-ul d-flex flex-wrap justify-content-center mb-1">
                                <li onClick={() => setFirstPage()}>
                                    <a href="#">First</a>
                                </li>
                                <li onClick={() => setPrevPage()}>
                                    <a href="#"><i class="icofont-rounded-double-left"></i></a>
                                </li>
                                {pageNumbers.map((pageNumber) => (<li onClick={() => setPage(pageNumber.target, blogs, totalPage)}>
                                    <a className = {pageNumber.target==currentPage?"active":""} href="#">{pageNumber.string}</a>
                                </li>))}
                                <li onClick={() => setNextPage()}>
                                    <a href="#"><i class="icofont-rounded-double-right"></i></a>
                                </li>
                                <li onClick={() => setLastPage()}>
                                    <a href="#">Last</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <div class="col-lg-3 col-12">
                        <aside>
                            <div class="profile-widget search-widget">
                                <div class="widget-inner">
                                    <div class="widget-title">
                                        <h5>Search Post</h5>
                                    </div>
                                    <div class="widget-content">
                                        <p>Search from the newest post collections</p>
                                        <div class="form-floating nft-search-input">
                                            <input type="text" class="form-control" id="nftSearch"
                                                placeholder="Search post"/>
                                            <label for="nftSearch">Search post</label>
                                            <button type="button"> <i class="icofont-search-1"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget widget-category">
                                <div class="widget-header">
                                    <h5 class="title">Post Category</h5>
                                </div>
                                <ul class="widget-wrapper">
                                    <li>
                                        <a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>Themeforest</span><span>06</span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>Photodune</span><span>11</span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex active flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>Codecanyon</span><span>07</span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>GRaphicdriver</span><span>09</span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>Wordpress</span><span>50</span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>Joomla</span><span>20</span></a>
                                    </li>
                                    <li>
                                        <a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>3docean</span><span>93</span></a>
                                    </li>
                                </ul>
                            </div>

                            <div class="widget widget-post">
                                <div class="widget-header">
                                    <h5 class="title">Most Popular Post</h5>
                                </div>
                                <ul class="widget-wrapper">
                                    <li class="d-flex flex-wrap justify-content-between">
                                        <div class="post-thumb">
                                            <a href="Blog1">
                                                <img src={require('../images/blog/01.jpg').default} alt="post-img" />
                                                
                                            </a>
                                        </div>
                                        <div class="post-content">
                                            <a href="Blog1">
                                                <h6>Poor People’s Campaign Our Resources</h6>
                                            </a>
                                            <p>July 23,2021</p>
                                        </div>
                                    </li>
                                    <li class="d-flex flex-wrap justify-content-between">
                                        <div class="post-thumb">
                                            <a href="Blog1">
                                                <img src={require('../images/blog/02.jpg').default} alt="post-img" />
                                                
                                            </a>
                                        </div>
                                        <div class="post-content">
                                            <a href="Blog1">
                                                <h6>Boosting Social For NGO And Charities </h6>
                                            </a>
                                            <p>July 23,2021</p>
                                        </div>
                                    </li>
                                    <li class="d-flex flex-wrap justify-content-between">
                                        <div class="post-thumb">
                                            <a href="Blog1">
                                                <img src={require('../images/blog/03.jpg').default} alt="post-img" />
                                                
                                            </a>
                                        </div>
                                        <div class="post-content">
                                            <a href="Blog1">
                                                <h6>Poor People’s Campaign Our Resources</h6>
                                            </a>
                                            <p>July 23,2021</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="widget widget-archive">
                                <div class="widget-header">
                                    <h5 class="title">Our Archives</h5>
                                </div>
                                <ul class="widget-wrapper">
                                    <li><a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>January</span><span>2021</span></a>
                                    </li>
                                    <li><a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>February</span><span>2020</span></a>
                                    </li>
                                    <li><a href="#" class="d-flex active flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>March</span><span>2019</span></a>
                                    </li>
                                    <li><a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>April</span><span>2018</span></a>
                                    </li>
                                    <li><a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>June</span><span>2017</span></a>
                                    </li>
                                    <li><a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>June</span><span>2016</span></a>
                                    </li>
                                    <li><a href="#" class="d-flex flex-wrap justify-content-between"><span><i
                                                    class="icofont-double-right"></i>February</span><span>2015</span></a>
                                    </li>
                                </ul>
                            </div>

                            <div class="widget widget-tags">
                                <div class="widget-header">
                                    <h5 class="title">Our Popular Tags</h5>
                                </div>
                                <ul class="widget-wrapper">
                                    <li><a href="#">envato</a></li>
                                    <li><a href="#" class="active">themeforest</a></li>
                                    <li><a href="#">codecanyon</a></li>
                                    <li><a href="#">videohive</a></li>
                                    <li><a href="#">audiojungle</a></li>
                                    <li><a href="#">3docean</a></li>
                                    <li><a href="#">envato</a></li>
                                    <li><a href="#">themeforest</a></li>
                                    <li><a href="#">codecanyon</a></li>
                                </ul>
                            </div>
                        </aside>
                    </div> */}
                </div>
            </div>
        </div>
    </section>
 
        </>
    )
}

export default Blog;