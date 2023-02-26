const { Products } = require('../model/products');
const Categories = require('../model/categories');

const viewProducts = (req, res) => {
  // eslint-disable-next-line no-use-before-define
  let cart = [];
  cart = req.session.cart? req.session.cart: [];
  viewPage(req, res, cart);
};
const addCart = (req, res) => {
let cart = [];

  const productid = req.body.product_id;
   console.log(productid);
   console.log(req.session);
  if(typeof req.session.cart == 'undefined'){
    req.session.cart = [productid]
    cart.push(productid);
    viewPage(req, res, cart );
    
  }
  else {
    cart = req.session.cart
    cart.push(productid);
    req.session.cart=cart
    //console.log(req.session.cart);
    // eslint-disable-next-line no-use-before-define
    viewPage(req, res, cart);
  }
  
  
};
const viewCartSummary= async(req, res)=>{

    let cart = req.session.cart||[];
  // getting all cart from session (productids) [id, id, id]
// Adding what is in the session
  let allCartsinMem= req.session.cart||[];
 
  // variable enpty array
  let display = [];

  // get all other product detail via id
for(let i=0; i< allCartsinMem.length; i++){
    let itemId=allCartsinMem[i];
    // check for initial item product added it returns the index if  the product id is in the array else it returns -1;
let checkInitialItem= display.findIndex(x=>x.id==itemId);
// to check for the 
if(checkInitialItem!=-1){
 // to add exist product.
  display[checkInitialItem].qty= display[checkInitialItem].qty+1;
  display[checkInitialItem].totalPrice= display[checkInitialItem].qty* display[checkInitialItem].price;
    
}
else{
// Get product details
let product=await Products.findById(itemId);
//
display.push({id:product.id, name:product.productName,price:product.productPrice, qty:1, totalPrice:product.productPrice });


}


}
let totalAmount = 0;
if(display.length !=0){


totalAmount=display.reduce(function(acc, k){
    console.log(k);
return acc+ k.totalPrice;
},0)
}
// to do the sub total of items in our cart array
// we first check if the length of the cart is zero

const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',

  });

  res.render('cartSummary', {display, cartItems:cart, totalAmount, formatter});


}

async function viewPage(req, res, cartItems) {
  try{
  const pageSize = 6;
  const pageNo = req.query.pageNo ? req.query.pageNo : 1;
  const search = req.query.searchTerm ? (req.query.searchTerm).trim() : '';
  const categoryType = req.query.categoryType ? (req.query.categoryType).trim() : '';

  const searcher = new RegExp(search);
  const queryObj= { productName: { $regex: searcher, $options: 'i' } }
  if(req.query.categoryType){
    queryObj.categoryType=Object(req.query.categoryType);
  }
console.log("Query", queryObj)
  const total = await (await Products.find(queryObj).populate('categoryType', 'Name -_id')).length;
  const product = await Products.find(queryObj).populate('categoryType', 'Name -_id').sort({ _id: 1 }).skip((pageNo - 1) * pageSize)
    .limit(pageSize);
  // const categoryProducts = await Products.find({categoryType: category.id, productName: {$regex: searcher, $options: 'i'}}).populate('categoryType', 'Name -_id');
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',

  });
  let category = await Categories.find({isDeleted:false});


  res.render('home', {
    user: req.user, product, formatter, search, total, pageSize, pageNo, cartItems, category, categoryType
  });
}

catch (err) {
console.log(err);
}
}
module.exports.productController = { viewProducts, addCart, viewCartSummary };
