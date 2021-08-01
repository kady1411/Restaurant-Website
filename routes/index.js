const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');



router.get('/', homeController.home);
router.get('/index', homeController.home);
router.get('/about', require('./about'));
router.get('/faq', require('./faq'));

router.get('/food', require('./food'));

router.use('/users', require('./users'));
router.use('/admin', require('./admin'));
router.use('/product', require('./product'));


module.exports = router;