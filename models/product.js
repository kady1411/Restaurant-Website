const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/products/avatars');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAvailable: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
},
    {
    timestamps: true
});

// file is not saved to db only path is stored to db and file in folder itself//
let storage = multer.diskStorage({
    destination: function (req, file, cb) {   // path whr file saved
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {   // this is name to which file is saved
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


// static function to use multer
// .single is use for uploading single file only but we can upload multiple also//
productSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
productSchema.statics.avatarPath = AVATAR_PATH;

const Product = mongoose.model('Product', productSchema);
module.exports = Product;