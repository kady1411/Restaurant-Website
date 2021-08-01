const User = require('../models/user');
const Product = require('../models/product');


module.exports.menu = function(req, res){

    Product.find({}, function(err, products){
        return res.render('menu', {
            title: 'Menu' ,
            all_products:  products
        });
    });
}

module.exports.cart = function(req, res){
        return res.render('cart', {
            title: 'Cart' ,
        });
}

module.exports.myproducts = function(req, res){

    Product.find({}, function(err, products){
        return res.render('admin/myproducts', {
            title:'My Products' ,
            all_products:  products
        });
    });

}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/ordernow');
    }
    
    return res.render('signup', {
        title: "User SignUp"
    })
}


// render the sign in page
module.exports.logIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/ordernow');
    }

    return res.render('login', {
        title: "User LogIn"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Password does not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', 'error in finding user in signing up');
            return
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){ 
                    req.flash('error', 'error in creating user while signing up');
                    return
                }

                req.flash('success', 'Signed in Successfully');
                return res.redirect('/users/login');
            })
        }else{
            req.flash('error', 'This email already exist');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');

    return res.redirect('/users/ordernow');
}

// destroy session
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');

    return res.redirect('/');
}