const express = require('express');
const cors = require('cors');
const braintree = require('braintree');
require('dotenv').config();

const app = express();
app.use(cors());

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

app.get('/client-token', async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.send({ clientToken: response.clientToken });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating client token');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Donation server is running on port ${port}`);
});
