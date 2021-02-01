import React,{ useState } from 'react';
import Login from "./Login"
import Signup from "./Signup"
import "../style/Login.css"

function LoginPage() {
    const [loginActive, setLoginActive] = useState(true);
    const [signupActive, setSignupActive] = useState(false);
    
    function toggleActive(){
        setLoginActive(!loginActive);
        setSignupActive(!signupActive);
    }
    
    return (
        <div className="center">
            <section className="loginBlock">
                <div className="tabs">
                    <li onClick={toggleActive} className={loginActive ? "active" : ""}>Login</li>
                    <li onClick={toggleActive} className={signupActive ? "active" : ""}>Sign up</li>
                </div>
              
                <div className="formBlock">
                    {loginActive ? <Login /> : <Signup />}
                </div>
            </section>   
        </div>  
    );
}

export default LoginPage;