const express = require('express');
const router = express.Router();

const productController = require('../controllers/product_controller');

router.post('/create', productController.create);

module.exports = router;