const express = require('express');
const path = require('path');
const braintree = require('braintree');
const app = express();
const port = process.env.PORT || 3000;

// Braintree credentials
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: '6mhvv2wg87mmsdcd',
  publicKey: 'hfhgyc349hzqgb85',
  privateKey: 'ac450f83c78be02e5538ef870d41c3c0',
});

// Serve static files (including index.html)
app.use(express.static(path.join(__dirname, '/')));

// Endpoint to get client token
app.get('/client_token', async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.send(response.clientToken);
  } catch (err) {
    res.status(500).send('Error generating client token');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
