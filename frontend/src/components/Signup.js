import React, { useState} from 'react'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Alert } from 'reactstrap';
function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const { signup, firestoreInit } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [show, setShow] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordConfirm){
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(email, password) 
            await firestoreInit(email, firstName, lastName)
            history.push("/search")
        } catch (error) {
            setError(error.message)
            AlertDismissibleExample(error.message)
        }
        setLoading(false)
    }
   
    function AlertDismissibleExample({error}) {
        const [show, setShow] = useState(true);
      
        if (show) {
            console.log("a");
          return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>error!</Alert.Heading>
              <p>

                error
              </p>
            </Alert>
          );
        }
        // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
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
                <div>
                <p className="errorMsg">
                    {error}
                </p>
                <button type="submit" id="signup" disabled={loading} onClick={handleSubmit}>
                    Sign Up
                </button>
                </div>
            </form>
            
            
      
        </div>  
    );
    
}
export default Signup;