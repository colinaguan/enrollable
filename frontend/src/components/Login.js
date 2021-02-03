import React, { useState} from 'react'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
// import { Alert } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import AlertDisplay from "./AlertDisplay"
function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [show, setShow] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email, password) 
            history.push("/search")
        } catch (error) {
            setError(error.message);
            // setErrorDisplay(true);
            props.setErrorDisplay(true);
            props.setErrorContent(error.message);
            // setShow(true);
            // <AlertDisplay/>
         
        }
        setLoading(false)
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

                <p className="errorMsg">
                    {error}
                </p>
                <div>
                <button type="submit" id="login" disabled={loading} onClick={handleSubmit}>
                    Login
                </button>
                </div>
            </form>
            <div>
              {show ? <AlertDisplay /> : null }
            </div>
        </div> 
      
    );
}
export default Login;
