import { useMoralis } from "react-moralis";
import { Link } from 'react-router-dom';
import React,{useState} from "react";
import { formValidation } from '../_services';
const Login = () =>{
    const { login,authenticate,enableWeb3, isAuthenticated, user, authError, userError} = useMoralis();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ERR, setERR] = useState("");
    const errors = {
        email: "",
        password:"",
        formIsValid:false,
    };
    if(isAuthenticated){
        window.location.href = "/wallet";
        //console.log( user);
    }
    const weblogin=()=>{
        let params = {
            email:username,
            password:password
        }
        let validate = formValidation.loginvalidation(params,errors);
		if(validate.formIsValid){
            // login(username, password).then((response) => {
            //     return;
            //     window.location.href = "/wallet";
            //     console.log(response)
            // }).catch((error) => {
            // });
            login(username, password);
        }else{
            console.log(validate)
            setERR(validate)
        }
    }
    return( 
        <>
         <div class="login-section padding-top padding-bottom">
                    <div class=" container">
                        <div class="row g-5 align-items-center flex-md-row-reverse">
                            <div class="col-lg-5">
                                <div class="account-wrapper">
                                    <h3 class="title">Sign In</h3>
                                    {authError && (<span className="errors"> {authError.message} </span>)}
                                    <form class="account-form">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="floatingInput"
                                                placeholder="name@example.com" onChange={(e)=>setUsername(e.target.value)} />
                                            <label for="floatingInput">Email address</label>
                                            {ERR?(<span className="errors">{ERR.email}</span>):(<></>)}
                                        </div>password
                                        <div class="form-floating">
                                            <input type="password" class="form-control" id="floatingPassword"
                                                placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                            <label for="floatingPassword">Password</label>
                                            {ERR?(<span className="errors">{ERR.password}</span>):(<></>)}
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
                                        
                                    </form>
                                    <div class="form-group">
                                            <button class="d-block default-btn move-top" onClick={weblogin}><span>Signin Now</span></button>
                                        </div>
                                    <div class="account-bottom">
                                        <span class="d-block cate pt-10">Don’t Have any Account?<Link to="/signup"> Sign
                                                Up</Link></span>
                                        <span class="or"><span>or</span></span>
                                        <h5 class="subtitle">Login With Social Media</h5>
                                        {/* <ul class="social-media social-color lab-ul d-flex justify-content-center">
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
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="account-img">
                                    <img src={require('../images/account/01.png').default} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Login;