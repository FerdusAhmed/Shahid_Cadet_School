import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../auth/authInit';

const googleProvider =new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const socialGoogleLogin = () => {
    return signInWithPopup(auth,googleProvider)
  }

  const userRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = userInfo => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const userEmailVerify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const userPassRest = email => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logOut = () => {
    return signOut(auth);
  };

  const createUserAuthInfo = {
    isLoading,
    user,
    setUser,
    socialGoogleLogin,
    userRegister,
    loginUser,
    logOut,
    updateUserProfile,
    userEmailVerify,
    userPassRest,
  };

  return (
    <AuthContext.Provider value={createUserAuthInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
