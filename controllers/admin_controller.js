const Admin = require('../models/admin')
const User = require('../models/user')
const Product = require('../models/product')
const fs = require('fs');
const path = require('path');


module.exports.dashboard = function(req, res){
    return res.render('admin/dashboard', {
        title: 'Dashboard'
    })
}

module.exports.addproducts = function(req, res){
    return res.render('admin/addproducts', {
        title: 'Add Products'
    })
}


// to display products passing products
module.exports.myproducts = function(req, res){

    Product.find({}, function(err, products){
        return res.render('admin/myproducts', {
            title:'My Products' ,
            all_products:  products
        });
    });

}


module.exports.userInfo = function(req, res){
    User.find({}, function(err, users){
        return res.render('admin/userInfo', {
            title: 'User Info',
            all_users:  users
        });
    });

}

// module.exports.update = function(req, res){
//     Product.findByIdAndUpdate(req.params.id, req.body, function(err, product){
//         req.flash('success', 'Product Updated!');
//         return res.redirect('/admin/myproducts');
//     });
// }

module.exports.updateproduct = function(req, res){
    Product.findById(req.params.id, function(err, products){
        return res.render('admin/updateproduct', {
            title: 'Update Product',
            product:  products
        });
    });
}

module.exports.update = async function(req, res){
   

        try{

            let product = await Product.findById(req.params.id);
            Product.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                product.name = req.body.name,
                product.price = req.body.price,
                product.category = req.body.category,
                product.description =  req.body.description,
                product.isAvailable = req.body.isAvailable

                
                // checking if old file is present 
                    if (product.avatar){
                        // if present then delete it from folder
                        fs.unlinkSync(path.join(__dirname, '..', product.avatar));
                    }


                // updating product.avatar
                product.avatar = Product.avatarPath + '/' + req.file.filename;
                product.save();
                req.flash('success', 'Product Updated!');
                return res.redirect('/admin/myproducts');
            });

        }catch(err){
            console.log(err);
            req.flash('error', err);
            return res.redirect('back');
        }
}

module.exports.destroy = function(req, res){
    Product.findById(req.params.id, function(err, product){
        // this is to delete file from folder
        if (product.avatar){
            fs.unlinkSync(path.join(__dirname, '..', product.avatar));
        }
        product.remove();
        req.flash('success', 'Product deleted!');
        return res.redirect('back');
    });
}