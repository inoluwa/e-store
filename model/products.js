const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  productPrice: {
    type: Number,
    require: true,
  },
  productImage: {
    type: String,
    require: true,
  },
  categoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
  noInStock: {
    type: Number,
    require: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

});
module.exports.Products = mongoose.model('Product', productSchema);
