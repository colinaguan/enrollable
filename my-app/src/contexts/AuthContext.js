import React, {useContext, useState, useEffect} from 'react'
import { auth } from "../firebase";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return (
            auth.createUserWithEmailAndPassword(email, password)
                .catch((error) => {
                    const errorMessage  = error.message 
                    console.log(errorMessage )
                })
        )
    }

    function login(email, password){
        return (
            auth.signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    const errorMessage  = error.message 
                    console.log(errorMessage )
                })
        )
    }

    function logout() {
        return (
            auth.signOut()
                .catch((error) => {
                    const errorMessage  = error.message 
                    console.log(errorMessage )
                })
        )
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout 
    }

    return (
        <AuthContext.Provider value={ value }>
            {!loading && children}
        </AuthContext.Provider>
    )
}
