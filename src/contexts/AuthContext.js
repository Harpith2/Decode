// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      createdAt: new Date(),
    });
  };

  const login = async (email, password) => {
    try {
      // Clear any existing auth state
      await auth.signOut();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please try again.');
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const googleSignIn = async () => {
    try {
      console.log('Starting Google sign in');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in completed', result);
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        lastLogin: new Date(),
      }, { merge: true });
  
      return result; // Return the result so we can verify in the component
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, googleSignIn, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}