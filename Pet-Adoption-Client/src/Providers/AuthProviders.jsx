import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
// import axios from 'axios';


export const AuthContext = createContext(null);
const auth = getAuth(app)
 
const AuthProviders = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
        
    }

    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider);
    }
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
             setUser(currentUser);
             console.log('current user', currentUser?.email);
             //jwt related work start 
            //  if(currentUser?.email){
            //     const user = {email: currentUser.email}

            //     axios.post('https://service-review-system-server-gray.vercel.app/jwt',user,{
            //         withCredentials: true })
            //          .then(res => {
            //             console.log('login token', res.data);
            //             setLoading(false);
            //          })
            //  }
            //  else{
            //     axios.post('https://service-review-system-server-gray.vercel.app/logout',{},{
            //         withCredentials: true
            //     })
            //     .then(res =>{
            //         console.log('logout', res.data);
            //         setLoading(false);
            //     })
            //  }

             //end
             setLoading(false);
         })
         return ()=>{
             return unsubscribe();
         }
     },[])

     const updateUserProfile =(updatedData)=>{
        setLoading(true)
        return updateProfile(auth.currentUser , updatedData)
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo ={
         user,loading,signInWithGoogle,createUser,signIn,updateUserProfile,logOut,setUser 
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProviders;