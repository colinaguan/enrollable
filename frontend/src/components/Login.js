import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";

function Login({setErrorDisplay, setErrorContent, setFavList}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, favorList } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorDisplay(false);
        setLoading(true);
        login(email, password).then(() => {
            history.push("/search");
            // get favorites list
            setFavList(favorList);
            // console.log(favorList);
        })
        .catch(error => {
            setErrorDisplay(true);
            setErrorContent(error.message);
        });
        setLoading(false);
    }

    return (
        <div>
            <form action="">
                <input type="email" 
                    id="loginEmail" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input type="password" 
                    id="loginPassword" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <div>
                    <button type="submit" id="login" disabled={loading} onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </form>
        </div> 
      
    );
}
export default Login;
