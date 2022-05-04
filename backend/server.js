const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const data = require('./data.js');
const config = require('./config.js');
const userRouter = require('./routers/userRoute.js');
const orderRouter = require('./routers/orderRouter.js');
const productRouter = require('./routers/productRouter.js');
const uploadRouter = require('./routers/uploadRouter.js');

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
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/uploads', uploadRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.get('//', (req, res) => {
  res.send(path.join(__dirname, '/../uploads'));
});


app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
  console.log('Listening to port 5000...');
});
