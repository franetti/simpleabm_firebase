import React, {useState, useEffect} from 'react';
import firebase from '../firebase';

const useAutentication = () => {
    
    const [userAtenticated, setUserAutenticated] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => { 
            if(user){
                setUserAutenticated(user)
            }else {
                setUserAutenticated(null)
            }
        });
        return () => unsuscribe
    },[])

    return userAtenticated;
};

export default useAutentication;
