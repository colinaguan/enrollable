import React, { useState} from 'react'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            props.setErrorDisplay(false);
            props.setErrorContent('');
            setLoading(true)
            await login(email, password) 
            history.push("/search")
        } catch (error) {
            props.setErrorDisplay(true);
            props.setErrorContent(error.message);
        }
        setLoading(false);

        // get favorites list (copied from AuthContext)
        var docRef = db.collection("users").doc(auth.currentUser.uid);
        var list = [];
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("favorites retrieved");
                list = doc.data().favorList;
                props.setFavList(list);
            } else {
                console.error("favorites document dne");
                props.setFavList([]);
            }
        }).catch(() => {
            console.error("favorites not found");
            props.setFavList([]);
        });
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
