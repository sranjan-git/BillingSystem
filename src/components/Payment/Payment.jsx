// Payment.jsx

import React, { useState, useEffect } from 'react';
import './Payment.scss';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import axios from 'axios';
import { auth, onAuthStateChanged, signInWithPopup, googleProvider } from '../../firebase';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [firebaseId, setFirebaseId] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseId(user.uid);
        setUserName(user.displayName);
      } else {
        setFirebaseId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const plans = [
    {
      name: 'Basic',
      price: '$10',
      storage: 10,
      benefits: ['Basic support', '10GB storage', 'Access to basic features'],
    },
    {
      name: 'Advanced',
      price: '$30',
      storage: 50,
      benefits: ['Priority support', '50GB storage', 'Access to all features'],
    },
    {
      name: 'Premium',
      price: '$50',
      storage: 100,
      benefits: ['24/7 support', '100GB storage', 'Access to all features and premium content'],
    },
  ];

  const handlePlanClick = (plan) => {
    if (!firebaseId) {
      setShowLoginPopup(true);
    } else {
      setSelectedPlan(plan);
    }
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowLoginPopup(false);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://billingsystembackend.onrender.com/user/add', {
        userId: firebaseId,
        name: userName,
        planType: selectedPlan.name,
        additionalAssets: selectedPlan.storage,
        purchaseDate: new Date(),
        usedAssets: 0
      });

      console.log('Assets updated successfully', response.data);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Error updating assets', error);
    }
  };

  return (
    <div className="payment">
      <h1>Choose Your Plan</h1>
      <div className="plan-cards">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index} id={`plan-card-${index}`} onClick={() => handlePlanClick(plan)}>
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}</p>
            <p className="storage">{plan.storage}GB</p>
            <ul className="benefits">
              {plan.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showLoginPopup && (
        <div className="login-popup" style={{ color: "red" }}>
          <p>Please sign in to continue.</p>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
      )}

      {selectedPlan && (
        <ConfirmationModal
          plan={selectedPlan}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Payment;
