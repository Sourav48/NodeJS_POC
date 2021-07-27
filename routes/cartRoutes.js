const express = require('express');
const router = express.Router()
const cartController = require('../controllers/cartController');
const auth = require('../Middlewares/auth');

router.get('/:id', auth, cartController.getCartItems);
router.post('/:id', auth, cartController.addToCart);
router.patch('/:id', auth, cartController.updateCartItems);
router.delete('/:id', auth, cartController.deleteFromCart);
                             

module.exports = router;