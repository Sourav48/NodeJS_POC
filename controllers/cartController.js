const Product = require('../models/products')
const Cart = require('../models/cart')
const joi = require('joi');

const getCartItems = async (req, res) => {

  try {
    const userCart = await Cart.findOne({ user: req.params.id });

    if (!userCart) {
       res.send('Your Cart is Empty!')
    }

    const products = await Cart.find()
      res.json({"Cart Items": products})

    } catch (error) {
      res.send(error);
    }
};

const addToCart = async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({ user: req.params.id });

    if (userCart) {
      const itemsInCart = await Cart.findOne({user: req.params.id,'products.prodDetails': req.body.prodName});

      if (itemsInCart) {
        const prodList = itemsInCart.products;
        prodList.map((cartItems) => {
          if (cartItems.prodDetails.toString() === req.body.prodName) {
            cartItems.quantity = cartItems.quantity + 1;
          }
        });

        itemsInCart.products = prodList;

        await itemsInCart.save();
          res.send({"Added to Cart":itemsInCart});
      } else {
        const product = await Product.findOne({prodName:req.body.prodName});

        if (!product) {
            res.send('No Such Product Found')
        }
        else{
          userCart.products = userCart.products.concat({prodDetails: req.body.prodName,quantity: 1,});
        }

        await userCart.save();
        res.send({"Added to Cart":userCart});
      }

    } else if(!userCart){

      const product = await Product.findOne({prodName:req.body.prodName});

      if (!product) {
        res.send('No Such Product Found')
      }

      const cart = new Cart({
        user: req.params.id,
        products: [
          {
            prodDetails: req.body.prodName,
            quantity: 1,
          },
        ],
      });

      await cart.save();

      res.status(201).send({"Added to Cart":cart});
    }
  } catch (error) {
    res.send(error);
  }
};

const updateCartItems = async (req, res, next) => {

  const updateSchema = joi.object({
    prodName: joi.string().min(3).max(30).required(),
    quantity: joi.number().min(1).required(),
  });

  const { error } = updateSchema.validate(req.body);

  if (error) {
    res.send(error);
  }

  try {
    const updatedItem = await Cart.findOneAndUpdate(
      { user: req.params.id, 'products.prodDetails': req.body.prodName },
      { $set: { 'products.$.quantity': req.body.quantity } },
      { new: true }
    );

    if (!updatedItem) {
      res.send('No Product found to Update.');
    }
    res.send({"Updated Item in Cart":updatedItem});
    } catch (error) {
      res.send(error);
    }
};

const deleteFromCart = async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({
      user: req.params.id,
      'products.prodDetails': req.body.prodName,
    });

    if (!userCart) {
        res.send('No Product found to Delete.')
    }

    const cartItems = userCart.products.filter((item) => 
      item.prodDetails.toString() !== req.body.prodName
    );

    userCart.products = cartItems;

    await userCart.save();
      res.send({"Deleted Item from Cart":userCart});
    } catch (error) {
    res.send(error);
  }
};

module.exports = { getCartItems, addToCart, updateCartItems, deleteFromCart };