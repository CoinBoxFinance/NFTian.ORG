

import { useMoralis } from "react-moralis";

const Wallet = () => {
    const { authenticate, isAuthenticated, user,Moralis, enableWeb3 } = useMoralis();
const loginwithmetamask = () => {
    enableWeb3()
    Moralis.authenticate().then(function (user) {
        console.log(user.get('ethAddress'))
    })
}
    
// enableWeb3()
    return (
        <>
      
        <section class="page-header-section style-1">
            <div class="container">
                <div class="page-header-content">
                    <div class="page-header-inner">
                        <div class="page-title">
                            <h2>Wallet Connect Page </h2>
                        </div>
                        <ol class="breadcrumb">
                            <li><a href="index.html">Home</a></li>
                            <li class="active">Wallet</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <section class="wallet-section padding-top padding-bottom">
        <div class="container">
            <div class="wallet-inner">
                <div class="wallet-title">
                    <h3 class="mb-3">Connect your wallet</h3>
                    <p>Connect with one of available wallet providers or <a href="signup.html">create a
                            new wallet</a></p>
                </div>
                <div class="row g-3">
                    <div class="col-lg-4 col-md-6">
                        <div class="wallet-item" onClick={()=>authenticate()}>
                            <div class="wallet-item-inner">
                                <div class="wallet-thumb">
                                    {/* <a href="#"> */}
                                        <img src={require('../images/wallet/06.png').default} alt="" />
                                        {/* <img src="assets/images/wallet/06.png" alt="wallet-img"> */}
                                    {/* </a> */}
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Meta Mask</a></h5>
                                    {isAuthenticated?(<p>Connected with metamask</p>):( <p>Connect with metamask.</p>)}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="col-lg-4 col-md-6">
                        <div class="wallet-item">
                            <div class="wallet-item-inner">
                                <div class="wallet-thumb">
                                    <a href="signin.html">
                                        <img src={require('../images/wallet/07.png').default} alt="" />
                                    
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Binance</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="wallet-item">
                            <div class="wallet-item-inner">
                                <div class="wallet-thumb">
                                    <a href="signin.html">
                                        <img src={require('../images/wallet/08.png').default} alt="" />
                                     
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Formatic</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="wallet-item">
                            <div class="wallet-item-inner">
                                <div class="wallet-thumb">
                                    <a href="signin.html">
                                        <img src={require('../images/wallet/01.png').default} alt="" />
                                      
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Autherum</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
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
                               
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Bitski</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
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
                                   
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Coinbase</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
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
                                    
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Dapper</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
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
                                    
                                    </a>
                                </div>
                                <div class="wallet-content">
                                    <h5><a href="signin.html">Portis</a></h5>
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <p class="mt-5 mb-0 wallet-notice"><span class="me-1 theme-color"><i
                            class="icofont-bulb-alt"></i></span> We
                    do not own your private keys and cannot access your funds
                    without your confirmation.</p>
            </div>
        </div>
    </section>

        </>
    )
}

export default Wallet;