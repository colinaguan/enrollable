import React, { useState} from 'react'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const [error, setError] = useState('error msg here')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email, password) 
            history.push("/search")
        } catch (error) {
            setError(error.message)
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
                <div>
                <p className="errorMsg">
                    {error}
                </p>
                <button type="submit" id="login" disabled={loading} onClick={handleSubmit}>
                    Login
                </button>
                </div>
            </form>
        </div>  
    );
}
export default Login;