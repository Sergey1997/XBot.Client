import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyADGDzPXuQa4JCDpndZS9YY59e5iPnnKkc",
    authDomain: "xbot-b6af2.firebaseapp.com",
    projectId: "xbot-b6af2",
    storageBucket: "xbot-b6af2.firebasestorage.app",
    messagingSenderId: "720751576478",
    appId: "1:720751576478:web:bb471dffdc710d86a8c28f",
    measurementId: "G-PB2ZWB76Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result; // Optionally return the result for further use
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, auth, handleLogout, handleGoogleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
