import Footer from "./Footer"
import Header from "./Header"

const Signup = () => {
    return(
        <>
        <Header />

        <section class="page-header-section style-1">
        <div class="container">
            <div class="page-header-content">
                <div class="page-header-inner">
                    <div class="page-title">
                        <h2>Sign Up Page </h2>
                    </div>
                    <ol class="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li class="active">Sign Up </li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <div class="login-section padding-top padding-bottom">
        <div class=" container">
            <div class="row g-5 align-items-center flex-md-row-reverse">
                <div class="col-lg-5">
                    <div class="account-wrapper">
                        <h3 class="title">Sign Up</h3>
                        <form class="account-form">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="userIdInput" placeholder="user-id" />
                                <label for="userIdInput">User ID</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="confirmPass"
                                    placeholder="Confirm Password" />
                                <label for="confirmPass">Confirm Password</label>
                            </div>
                            <div class="form-group">
                                <div class="d-flex justify-content-between flex-wrap pt-sm-2">
                                    <div class="checkgroup">
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label for="remember">Remember Me</label>
                                    </div>
                                    <a href="forgot-pass.html">Forgot Password?</a>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="d-block default-btn move-top"><span>Signup Now</span></button>
                            </div>
                        </form>
                        <div class="account-bottom">
                            <span class="d-block cate pt-10">Already Have an Account? <a href="signin.html"> Sign
                                    In</a></span>
                            <span class="or"><span>or</span></span>
                            <h5 class="subtitle">Signup With Social Media</h5>
                            <ul class="social-media social-color lab-ul d-flex justify-content-center">
                                <li>
                                    <a href="#" class="facebook"><i class="icofont-facebook"></i></a>
                                </li>
                                <li>
                                    <a href="#" class="twitter"><i class="icofont-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="#" class="linkedin"><i class="icofont-linkedin"></i></a>
                                </li>
                                <li>
                                    <a href="#" class="instagram"><i class="icofont-instagram"></i></a>
                                </li>
                                <li>
                                    <a href="#" class="pinterest"><i class="icofont-pinterest"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="account-img">
                        <img src={require('../images/account/01.png').default} alt="" />
                        {/* <img src="assets/images/account/01.png" alt="shape-image"> */}
                    </div>
                </div>
            </div>

        </div>
    </div>

        <Footer />
        </>
    )
}

export default Signup; 