const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth, isAdmin } = require('../../frontend/utils.js');
const Product = require('../models/ProductModel.js');

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products); 
}));
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
}));
productRouter.post(
  '/', 
  isAuth, 
  isAdmin, 
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample product',  
      description: 'sample description',  
      category: 'sample category',  
      brand: 'sample brand',  
      image: '/images/product-1.jpg',  
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res.status(201).send({ message: 'Product created', product: createdProduct });
    } else {
      res.status(500).send({ message: 'Error in creating product' });
    }
  })
);
module.exports = productRouter;