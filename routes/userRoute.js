const express = require('express');
const moment = require('moment'); // require
const loginController = require('../controller/login');
const addproductController = require('../controller/addProductController');
const CategoryModel = require('../model/categories');
const { Products } = require('../model/products');
const { productController } = require('../controller/viewProductController');
const { registerPost } = require('../controller/registerUser');


const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', registerPost);
router.get('/login', (req, res) => res.render('login', { layout: 'login-layout' }));
router.post('/login', loginController);

router.get('/addProducts', async (req, res) => {
  const categories = await CategoryModel.find();

  res.render('addProducts', { categories, user: typeof req.user !== 'undefined' ? req.user : { email: '' } });
});
router.post('/addProducts', addproductController);
router.post('/', productController.addCart );
//router.post
router.get('/', productController.viewProducts);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (!err) {
      // return next();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/');
    }
  });
});
router.get('/cartsummary', productController.viewCartSummary);

router.get('/viewProducts', async (req, res) => {
  const pageSize = 4;
  const pageNo = req.query.pageNo ? req.query.pageNo : 1;
  const search = req.query.search ? req.query.search : '';
  const searcher = new RegExp(search);
  console.log(searcher);
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',

  });
  // Select * from Product where ProductName = (searcher).toLow
  const total = await (await Products.find({ productName: { $regex: searcher, $options: 'i' } }).populate('categoryType', 'Name -_id')).length;
  const products = await Products.find({ productName: { $regex: searcher, $options: 'i' } }).populate('categoryType', 'Name -_id').sort({ _id: 1 }).skip((pageNo - 1) * pageSize)
    .limit(pageSize);
  res.render('viewProducts', {
    product: req.product, products, moment, total, pageSize, pageNo, search, formatter, user: req.user ? req.user : { email: '' },
  });
});

module.exports = router;
