const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');


router.get('/', adminController.dashboard);
router.get('/addproducts',adminController.addproducts);
router.get('/myproducts',adminController.myproducts);
router.get('/userInfo',adminController.userInfo);
router.get('/destroy/:id',adminController.destroy);
router.get('/updateproduct/:id',adminController.updateproduct);
router.post('/update/:id',adminController.update);

module.exports = router;