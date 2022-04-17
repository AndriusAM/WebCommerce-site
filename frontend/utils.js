
const jwt = require('jsonwebtoken');

const config =require('../backend/config.js');

 const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

 const rerender = async (component) => {
  document.getElementById('main-container').innerHTML = await component.render();
  await component.after_render();
};
 const generateToken = (user) => jwt.sign(
  {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  },
  config.JWT_SECRET
);
 const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
};
 const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active');
};
 const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document.getElementById('message-overlay-close-button').addEventListener('click', () => {
    document.getElementById('message-overlay').classList.remove('active');
  });
  if (callback) {
    callback();
  }
};
 const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({ message: 'Token is not supplied' });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        console.log('Authorised!');
        req.user = data;
        next();
      }
    });
  }
};
 const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItems;
};
 const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';    
  }
};

module.exports ={
  parseRequestUrl,
  rerender,
  generateToken,
  showLoading,
  showMessage,
  hideLoading,
  redirectUser,
  getCartItems,
  isAuth,
}