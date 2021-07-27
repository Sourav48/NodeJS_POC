const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const auth = require('../Middlewares/auth');

router.get('/', productController.getProducts );
router.post('/', auth, productController.addProducts);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router