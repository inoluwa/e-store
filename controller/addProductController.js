const path = require('path');
const { Products } = require('../model/products');
const CategoryModel = require('../model/categories');

const addProducts = async (req, res) => {
  try {
    const {
      productName, productPrice, categoryType, noInStock,
    } = req.body;
    let productImage;
    let productImageName;
    let pathName;
    console.log(productName, productPrice, categoryType, noInStock);
    // Validate addproduct fields
    if ((!productName || !productPrice || !categoryType || !noInStock)
    ) {
      const error_msg = 'All fields is required';
      // req.flash('error_msg', 'All fields is required');
      const categories = await CategoryModel.find();
      console.log('err if');
      res.render('addProducts', {
        error_msg,
        productName,
        productPrice,
        categoryType,
        noInStock,
        categories,
      });
    } else {
      console.log('error else');

      if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No Files where uploaded.');
      } else {
        productImage = req.files.image;
        productImageName = Date.now() + productImage.name;
        pathName = `${path.resolve('./')}/public/uploads/${productImageName}`;
        // eslint-disable-next-line consistent-return
        productImage.mv(pathName, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
        });
      }
      // add products
      const productSaved = await Products.findOne({ productName });
      if (productSaved) {
        req.flash('error_msg', 'Product already added');
        const error_msg = 'Product already added';
        const categories = await CategoryModel.find();

        res.render('addProducts', {
          productName,
          productPrice,
          categoryType,
          noInStock,
          categories,
          error_msg,
        });
      } else {
        const newProducts = new Products({
          productName,
          productPrice,
          categoryType,
          noInStock,
          productImage: productImageName,
        });
        const productadded = await newProducts.save();
        if (productadded) {
          req.flash('success_msg', 'Product successfully added');
          res.redirect('back');
        } else {
          req.flash('error_msg', 'Product not added');
          const categories = await CategoryModel.find();
          res.render('addProducts', {
            productName,
            productPrice,
            categoryType,
            noInStock,
            categories,
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = addProducts;
