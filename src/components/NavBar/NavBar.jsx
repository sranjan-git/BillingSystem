// src/components/NavBar/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const NavBar = ({ currentPage }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="current-page">
          {currentPage}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="auth-buttons">
          {user ? (
            <span>Logged In</span>
          ) : (
            <button className="auth-button" onClick={signInWithGoogle}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
