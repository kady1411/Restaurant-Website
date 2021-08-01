const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/ordernow', passport.checkAuthentication, usersController.menu);

router.get('/cart', usersController.cart);

router.get('/signup', usersController.signUp);
router.get('/login', usersController.logIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
), usersController.createSession);

// route to destroy session
router.get('/signout', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/login'}), usersController.createSession);


module.exports = router;