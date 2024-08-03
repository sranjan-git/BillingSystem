import React, { useState } from 'react';
import './ConfirmationModal.scss';

const ConfirmationModal = ({ plan, onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (cardNumber.trim() === '') {
      alert('Please enter a valid card number.');
      return;
    }

    // Pass additionalAssets and cardNumber to onSubmit function
    onSubmit(plan.storage, cardNumber);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Confirm Your Purchase</h2>
        <p>You are about to purchase the {plan.name} plan with {plan.storage} of storage.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter your card number"
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationModal;

