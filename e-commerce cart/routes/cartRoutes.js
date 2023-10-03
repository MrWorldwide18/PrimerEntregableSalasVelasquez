const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);
router.get('/:cid', cartController.getCartById);
router.post('/:cid/product/:pid', cartController.addToCart);

module.exports = router;