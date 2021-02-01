import React, {useContext, useState, useEffect} from 'react'
import { auth, db } from "../firebase";
import firebase from 'firebase/app';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
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

    function resetPassword(email) {
        return (
            auth.sendPasswordResetEmail(email)
                .catch((error) => {
                    const errorMessage  = error.message 
                    console.log(errorMessage )
                })
        )
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function addToFavorList(courseID) {
        return (
            db.collection('users').doc(auth.currentUser.uid).update({
                favorList: firebase.firestore.FieldValue.arrayUnion(courseID)
            })
        )
    }

    function removeFromFavorList(courseID) {
        return (
            db.collection('users').doc(auth.currentUser.uid).update({
                favorList: firebase.firestore.FieldValue.arrayRemove(courseID)
            })
        )
    }

    function getFavorList() {
        var docRef = db.collection("users").doc(auth.currentUser.uid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().favorList);
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        return docRef.get().data().favorList
    }

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
    function hasUser() {
        return (auth.currentUser ? true : false)
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
