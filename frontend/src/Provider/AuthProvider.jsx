import  { createContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useState } from 'react';
import app from '../Firebase/firebase.config';
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    // observe auth state change
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            // console.log('auth state change', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () =>{
            unsubscribe();
        }
    }, [])
    const updateInfo = (name, photo) =>{
        console.log(name, photo)
        updateProfile(auth.currentUser, {
            displayName: `${name}`
        }).then(() => {
            
        }).catch((error) => {
            console.error(error);
        });
    }
    const logOut = () =>{
        return signOut(auth)
    } 
    const authInfo = {
        user, 
        loading,
        createUser,
        signIn,
        updateInfo,
        logOut
    }
   
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;