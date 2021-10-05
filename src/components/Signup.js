import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import React,{useState} from "react";
import { formValidation } from '../_services';
const Signup = () => {
    const { signup, isAuthenticated, user, authError} = useMoralis();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [email, setEmail] = useState("");
    const [ERR, setErr] = useState("");
    const errors =   {
        username:"",
        email:"",
        password:"",
        cpassword:"",
        formIsValid:false,
    }
    if( isAuthenticated)
    window.location.href="/"
    const mysignup=()=>{
        let params = { username:username, email:email,password:password, cpassword:cpassword}
        let validate = formValidation.loginvalidation(params,errors);
        if(validate.formIsValid){
            signup(username, password, email);
            // signup(username, password, email).then((response) => {
            //     window.location.href="/"
            //     }).catch((error) => {
            // });
        }else{
            setErr(validate)
        }
    }
    return(
        <>
      

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
                        {authError && (<span className="errors">{authError.message}</span>)}
                        <form class="account-form">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="userIdInput" placeholder="user-id"  onChange={(e)=>setUsername(e.target.value)}/>
                                <label for="userIdInput">User ID</label>
                                {ERR?(<span className="errors">{ERR.username}</span>):(<></>)}
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput"
                                    placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                                <label for="floatingInput">Email address</label>
                                {ERR?(<span className="errors">{ERR.email}</span>):(<></>)}

                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword"
                                    placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                <label for="floatingPassword" >Password</label>
                                {ERR?(<span className="errors">{ERR.password}</span>):(<></>)}
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="confirmPass"
                                    placeholder="Confirm Password" onChange={(e)=>setCPassword(e.target.value)}/>
                                <label for="confirmPass">Confirm Password</label>
                                {ERR?(<span className="errors">{ERR.cpassword}</span>):(<></>)}
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

     <span  class="d-block default-btn move-top" onClick={() => mysignup(username, password, email)}>Signups Now</span>
                                {/* <button type="buttpn" class="d-block default-btn move-top" onClick={() => mysignup(username, password, email)}><span>Signups Now</span></button> */}
                            </div>
                        </form>
                        <button onClick={() => signup(username, password, email)}>Sign up</button>
                        <div class="account-bottom">
                            <span class="d-block cate pt-10">Already Have an Account?<Link to="/signin"> Sign
                                    In</Link></span>
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

        </>
    )
}

export default Signup; 