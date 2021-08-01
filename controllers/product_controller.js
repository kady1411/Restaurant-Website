const Product = require('../models/product')

// module.exports.create = function(req, res){
//     Product.create({
//         name: req.body.name,
//         price: req.body.price,
//         category: req.body.category,
//         description: req.body.description,
//         isAvailable: req.body.isAvailable
//     }, function(err, product){
//         if(err){ 
//             req.flash('error', 'error in creating a product');
//             return;
//         }
//         req.flash('success', 'Product published!');
//         return res.redirect('back');
//     });
// }

module.exports.create = async function(req, res){
   


        try{

            Product.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                let product = Product.create({ 
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,
                    description: req.body.description,
                    isAvailable: req.body.isAvailable,
                    // setting path for image
                    // this is saving the path of the uploaded file into the avatar field in the product
                    avatar : Product.avatarPath + '/' + req.file.filename 
                });
                 // product.avatar = Product.avatarPath + '/' + req.file.filename;
                req.flash('success', 'Product published!');
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            console.log(err);
            return res.redirect('back');
        }

}

