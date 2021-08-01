const express = require('express');
const router = express.Router();

const faqController = require('../controllers/faq_controller');

console.log('router loaded');


router.get('/faq' , faqController.faqhome);

module.exports = router;