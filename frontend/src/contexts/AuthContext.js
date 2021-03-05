import React, {useContext, useState, useEffect} from 'react'
import { auth, db } from "../firebase";
import firebase from 'firebase/app';

// create the context
const AuthContext = React.createContext()

// allow other file to use this context
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [favorList, setFavorList] = useState([])

    // signup function takes in an email and password
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // login function takes in an email and password
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    // logout the current user
    function logout() {
        return (
            auth.signOut()
                .catch((error) => {
                    const errorMessage  = error.message 
                    console.log(errorMessage )
                })
        )
    }

    // reset the password with email
    function resetPassword(email) {
        return (
            auth.sendPasswordResetEmail(email)
                .catch((error) => {
                    const errorMessage  = error.message 
                    console.log(errorMessage )
                })
        )
    }

    // update current user email
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    // update current user password
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    // store courseID to user favorList on firestore
    function addToFavorList(courseID) {
        return (
            db.collection('users').doc(auth.currentUser.uid).update({
                favorList: firebase.firestore.FieldValue.arrayUnion(courseID)
            })
        )
    }

    // remove courseID from user favorList on firestore
    function removeFromFavorList(courseID) {
        return (
            db.collection('users').doc(auth.currentUser.uid).update({
                favorList: firebase.firestore.FieldValue.arrayRemove(courseID)
            })
        )
    }

    // return a list of user favourite class
    // no longer in use
    function getFavorList() {
        return favorList;
    }

    // set up firestore for new user
    function firestoreInit(email, firstName, lastName) {
        return (
            db.collection('users').doc(auth.currentUser.uid).set({
                firstName: firstName, 
                lastName: lastName, 
                email: email,
                favorList: [] 
            })
        )
    }
    
    // return true if there's a current user, else false
    // for testing only
    function hasUser() {
        return (auth.currentUser ? true : false)
    }

    // track if there's a user change
    // store the user's favorList information
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        if (hasUser()) {
            const fetch = async () => {
                var docRef = db.collection("users").doc(auth.currentUser.uid);
                await docRef.get().then(function(doc) {
                    if (doc.exists) {
                        setFavorList(doc.data().favorList);
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });            
            }
            fetch();
        }

        return unsubscribe
    }, [favorList])

    const value = {
        currentUser,
        favorList,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        firestoreInit,
        addToFavorList,
        removeFromFavorList,
        getFavorList,
        hasUser
    }

    return (
        <AuthContext.Provider value={ value }>
            {!loading && children}
        </AuthContext.Provider>
    )
}
