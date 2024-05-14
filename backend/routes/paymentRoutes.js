const express = require('express');
const router = express.Router();

module.exports = router;

const stripe = require('stripe')('sk_test_51PFdGTP2aNXri3F2cubScMvAeyTRMASSn4IAoITxSmq6jonsaA5jbXe001XHNHsMXs7zaK7ys8Q81H6gx6mupSR500x4iMOrsJ');

router.post('/intent', async (req, res) => {
  try {
    console.log("hi i was calleddd")
    // console.log("amount   :"+req.body.amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});