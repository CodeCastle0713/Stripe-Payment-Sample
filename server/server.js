// server.js

const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Stripe with your secret key
const stripe = Stripe("sk_test");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a Stripe payment link (checkout session)
app.post('/create-payment-link', async (req, res) => {
    const { amount } = req.body;
  
    try {
      // Create a payment intent (this is one way of creating a payment link)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Sample Product',
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cancel?session_id={CHECKOUT_SESSION_ID}`,  
      });
  
      res.send({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating payment session:', error);
      res.status(500).send('Internal Server Error');
    }
  });  

app.get('/retrieve-payment-status/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === 'paid') {
        res.send({ data: 'Payment Successful' });
      } else {
        res.send({ data: 'Payment Failed' });
      }
    } catch (error) {
      console.error('Error retrieving payment status:', error);
      res.status(500).send('Internal Server Error');
    }
  });
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
