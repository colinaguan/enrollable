import React,{ useState } from 'react';
import Login from "./Login"
import Signup from "./Signup"
function LoginPage() {
    const [tab, setTab] = useState(true);
    
    
    const changeToSign = () => {
        setTab(true)
    }
    const changeToLogin = () => {
        setTab(false)
    }
    return (
        <div>
            <div id="tab">
                <button onClick={changeToSign}>sign up</button>
                <button onClick={changeToLogin}>login</button>

            </div>
            { tab?<Signup /> : <Login />}
             
            
        </div>  
    );
}

export default LoginPage;