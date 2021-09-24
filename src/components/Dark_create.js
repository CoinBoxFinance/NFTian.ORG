import {Tab, Nav} from 'react-bootstrap'
const Dark_create = () =>{
    return(
        <>
            <section className="create_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Create</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="form_section py-5"> 
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h5 className="mb-2"> Upload file</h5>
                            <div class="upload-item mb-30 d-create-file1">
                                <p>PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                <div class="custom-upload">
                                
                                        <input type="button" id="get_file" class="btn-main" value="Browse" />
                                    <input type="file"/>
                                </div>
                            </div>
                            <div className="tab_create">
                            <h5 className="mb-2"> Select method</h5>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Nav variant="pills" className="flex-row">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">
                                                <span><i class="fa fa-tag"></i>Fixed price</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            <span><i class="fa fa-hourglass-1"></i>Timed auction</span>
                                        </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                        <Nav.Link eventKey="third">
                                        <span><i class="fa fa-users"></i>Open for bids</span>
                                        </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content className="mt-4">
                                        <Tab.Pane eventKey="first">
                                            <div>
                                                <div>
                                                    <h5>Price</h5>
                                                    <input type="text" name="item_price" id="item_price" class="input100" placeholder="enter price for one item (ETH)" />
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
                                                <div class="item-category-field mb-30">
                                                    <h5 className="mb-3">Select Item Catergory</h5>
                                                    <ul
                                                        class="item-cat-list d-flex flex-wrap">
                                                        <li class="item-cat-btn active">
                                                            <span><i
                                                                    class="icofont-vector-path"></i></span>
                                                            Art
                                                        </li>
                                                        <li class="item-cat-btn">
                                                            <span><i
                                                                    class="icofont-penalty-card"></i></span>
                                                            Trading Cards
                                                        </li>
                                                        <li class="item-cat-btn">
                                                            <span><i
                                                                    class="icofont-ui-game"></i></span>
                                                            Gaming
                                                        </li>
                                                        <li class="item-cat-btn">
                                                            <span><i
                                                                    class="icofont-music-disk"></i></span>
                                                            Music
                                                        </li>

                                                        <li class="item-cat-btn">
                                                            <span><i
                                                                    class="icofont-twitter"></i></span>
                                                            Tweets
                                                        </li>
                                                        <li class="item-cat-btn">
                                                            <span><i
                                                                    class="icofont-bill"></i></span>
                                                            Rare Item
                                                        </li>
                                                        <li class="item-cat-btn">
                                                            <span>
                                                                <i class="icofont-box"></i>
                                                            </span> Collectibles
                                                        </li>
                                                        <li class="item-cat-btn">
                                                            <span><i
                                                                    class="icofont-gift"></i></span>
                                                            NFT
                                                            Gifts
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
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
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                                <div>
                                    <input type="button" class="btn-main1" value="Create Item" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 rightaide_item">
                            <h5>Preview item</h5>
                            <div class="nft__item mt-3">
                                    <div class="de_countdown is-countdown" data-year="2021" data-month="10" data-day="16" data-hour="8" >
                                        <span class="countdown-row countdown-show4"><span class="countdown-section"><span class="countdown-amount">22d</span>
                                        </span><span class="countdown-section"><span class="countdown-amount">18h</span></span><span class="countdown-section">
                                            <span class="countdown-amount">58m</span></span><span class="countdown-section"><span class="countdown-amount">2s</span>
                                            </span></span></div>
                                    <div class="author_list_pp">
                                        <a href="#">                                    
                                        <img src={require('../images/coll-item-3.jpg').default} alt="" />
                                            <i class="fa fa-check"></i>
                                        </a>
                                    </div>
                                    <div class="nft__item_wrap">
                                        <a href="#">
                                            <img src={require('../images/coll-item-3.jpg').default} alt="" />
                                        </a>
                                    </div>
                                    <div class="nft__item_info">
                                        <a href="#">
                                            <h4>Pinky Ocean</h4>
                                        </a>
                                        <div class="nft__item_price">
                                            0.08 ETH<span>1/20</span>
                                        </div>
                                        <div class="nft__item_action">
                                            <a href="#">Place a bid</a>
                                        </div>
                                        <div class="nft__item_like">
                                            <i class="fa fa-heart"></i><span>50</span>
                                        </div>                            
                                    </div> 
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
} 
export default Dark_create;