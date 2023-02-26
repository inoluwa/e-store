//
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }


  let btnCart = document.getElementsByClassName('cartBtn');
//console.log(btnCart)

   function addCart(cartId){
//     let cart = [];
//   const productid =cartId;
  
//   if(!sessionStorage.getItem("cart")){
//     sessionStorage.setItem("cart", [productid]);
//     cart.push(productid);
//   } else {
//     let obj= sessionStorage.getItem("cart").split(',')
//     cart = obj
//     cart.push(productid);
//     sessionStorage.setItem("cart", cart);
    
//   }
// let counter= document.getElementById('cartCount');
// counter.innerHTML=cart.length;
let data= {product_id:cartId}
fetch('http://192.168.0.165:5100/addcart', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


   }