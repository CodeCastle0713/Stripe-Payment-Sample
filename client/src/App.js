// PaymentButton.js

import React, {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test');

const App = () => {
  const [status, setStatus] = useState("Empty");
  useEffect(() => {
    const func = async(sessionId) => {
      try {
        const response = await axios.get(`http://localhost:5000/retrieve-payment-status/${sessionId}`);
        setStatus(response.data.data)
      } catch (error) {
        setStatus("Error");
      }
    }
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    console.log("SessionID:", sessionId);
    if (sessionId) func(sessionId)
  },[])

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-payment-link', {
        amount: 400,
      });

      const { sessionId } = response.data;
      localStorage.setItem("sessionId", sessionId);
      
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.log(error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay $4</button>
      <div>Status:{status}</div>
    </div>
  );
};

export default App;
