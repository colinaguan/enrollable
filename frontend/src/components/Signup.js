import React, { useState} from 'react'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordConfirm){
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(email, password) 
            history.push("/search")
        } catch {
            setError('Fail to create an account')
        }
        setLoading(false)
    }

    return (
        <div>
            <form action="">
                <input type="text" 
                    id="first" 
                    placeholder="First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required />
                <input type="text" 
                    id="last" 
                    placeholder="Last Name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required />
                <input type="email" 
                    id="signupEmail" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input type="password" 
                    id="signupPassword" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <input type="password" 
                    id="confirm" 
                    placeholder="Confirm Password" 
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required />
                <button type="submit" id="signup" disabled={loading} onClick={handleSubmit}>
                    Sign Up
                </button>
            </form>
        </div>  
    );
}
export default Signup;