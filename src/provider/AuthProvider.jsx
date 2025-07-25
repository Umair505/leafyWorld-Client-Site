import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup , getAuth, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    };
    //Sign in with google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () =>{
        return signInWithPopup(auth,provider);
    }

    const login = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logout = () =>{
        return auth.signOut();
    }
    const resetPassword = (email) =>{
        return sendPasswordResetEmail(auth,email);
    }

   useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    })

    const authData = {
        createUser,
        login,
        logout,
        user,
        setUser,
        loading,
        setLoading,
        signInWithGoogle,
        resetPassword

    };
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;