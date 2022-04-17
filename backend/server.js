const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require('./data.js');
const config = require('./config.js');
const userRouter = require('./routers/userRoute.js');
const orderRouter = require('./routers/orderRouter.js');

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import data from './data.js';
// import userRouter from './routers/userRoute.js';
// import orderRouter from './routers/orderRouter.js';
// import config from './config.js';


mongoose
  .connect(config.MONGODB_URL).then(() => {
    console.log('Connected to Mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/', (req, res) => {
  res.send('Hello Andrius');
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((a) => a._id == req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found!' });
  }
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
  console.log('Listening to port 5000...');
});
