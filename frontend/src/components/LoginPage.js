import React,{ useState } from 'react';
import Login from "./Login"
import Signup from "./Signup"
import "../style/Login.css"
import { Alert } from 'reactstrap';
function LoginPage() {
    const [loginActive, setLoginActive] = useState(true);
    const [signupActive, setSignupActive] = useState(false);
    
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorContent, setErrorContent] = useState('');
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
                    {loginActive ? <Login setErrorDisplay={setErrorDisplay} errorDisplay={errorDisplay} errorContent={errorContent} setErrorContent={setErrorContent}/> : <Signup setErrorDisplay={setErrorDisplay} errorDisplay={errorDisplay} errorContent={errorContent} setErrorContent={setErrorContent}/>}
                </div>
            </section> 
            <div>
              {/* {show ? <AlertDisplay /> : null } */}
              {errorDisplay && <div>
                  
                  {errorContent}
              
              
              </div>}
              
            </div>  
        </div>  
    );
}

export default LoginPage;

{/* <Alert variant="danger"  dismissible>
        <Alert.Heading>error!</Alert.Heading>
        <p>
          display
        </p>
</Alert> */}