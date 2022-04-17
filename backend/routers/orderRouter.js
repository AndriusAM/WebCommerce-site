// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import { Order } from '../models/OrderModel.js';
// import { isAuth } from '../utils.js';

const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../../frontend/utils.js');
const Order = require('../models/OrderModel.js');

const orderRouter = express.Router();
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
  console.log(req);
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
}));
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order not found!' });
  }
}));
orderRouter.post(
  '/', 
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
  })
);
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment.paymentResult = {
      payerID: req.body.payerID,
      paymentID: req.body.payementID,
      orderID: req.body.orderID,
    };
    const updateOrder = await order.save();
    res.send({ mesage: 'Order Paid', order: updateOrder });
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
}));
module.exports = orderRouter;