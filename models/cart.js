const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
  prodDetails: {
    type: String,
    ref: 'Product',
  },
  quantity: {
    type: Number,
  },
});

const cartSchema = mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
  },
  products: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;