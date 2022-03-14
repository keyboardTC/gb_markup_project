// "use strict";

let cartPrutoductList = new Array();
const KEY = "my_cart";
//  Stict menu on scrolling
window.onscroll = function() {myFunction()};
var navbar = document.querySelector('.page-header');
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset > 100) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// ============ Product Class =============
class Product{
  constructor(img, name, brand, description, price, rating, category, quantity=1){
      this.id = Math.random();
      this.img = img;
      this.pName = name;
      this.pBrand = brand;
      this.pDesc = description;
      this.pRating = rating;
      this.price = price;
      this.pCategory = category;
      this.pQuantity = quantity
      this.totalPrice = (parseFloat(this.price)*quantity).toFixed(2);
  }
}

// const productsAr = [
//     {
//       prod_img: 'prod1.jpg',
//       name: 'Product3',
//       brand: "colourpop",
//       description: 'Here is a shot of this product that might entice a user to click and add it to their cart',
//       price: 50.00,
//       price_sign: "$",
//       product_colors: ['Fair 05', 'Ziggie'],
//       category: "lipstick"
//     },
//     {
//         prod_img: 'prod1.jpg',
//         name: 'Blotted Lip',
//         brand: "colourpop",
//         description: 'Here is a shot of this product that might entice a user to click and add it to their cart',
//         price: 50.00,
//         price_sign: "$",
//         product_colors: ['Fair 05', 'Ziggie'],
//         category: "lipstick"
//     },
//     {
//         prod_img: 'prod1.jpg',
//         name: 'Lippie Pencil',
//         brand: "colourpop",
//         description: 'Here is a shot of this product that might entice a user to click and add it to their cart',
//         price: 50.00,
//         price_sign: "$",
//         product_colors: ['Fair 05', 'Ziggie'],
//         category: "lipstick"
//     }
//   ]
// setProducts(productsAr);

// =========== Select the element all products
// let the_ProductsAr = productsAr
const products_grid = document.querySelector('#prods');
let previous_ProductsAr = []

let favPrutoductList = new Array();

// =============== Api call =====================
const apiURL = "https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Canadian";

$.ajax({
  type: "GET",
  url: apiURL,
  dataType: "json",
  success: setProducts,
  error: function(request, error){
      alert("Unable to fetch data " + error);
  }
});
 
// Modify the new product element, create the templete for all product.
function setProducts(product_array) {   
    try {
      console.log(product_array);
            products_grid.innerHTML = `` 
            product_array.forEach((prod) => {

            // Create article element to hold each product
            const article_item = document.createElement('article')
            // Adding class name product to the article created
            article_item.classList.add('product') 

            article_item.innerHTML = `
            <img src="${prod.image_link}" alt="product1">
            <div class="prod-desc">
                <h2 class="prod-name">${prod.name}</h2>
                <i>${(!prod.brand?"": `Brand: ${prod.brand}`)}</i>
                <p class="prodDesc">${prod.description.substring(0, 55).replace("'", "").replace("\n", "").trim()}.</p>
            </div>
            <div class="prod-details">
                <i class="cat-name">${(!prod.category) ? `Category: Basic`: `Category : ${prod.category}`}  </i>
                <i class="prod-rating">${(!prod.rating) ? `Not Rated`: `Rating : ${prod.rating}`}  </i>
                <h3 class="prod-Price">Price: $${prod.price}</h3>
                <button value="" onClick="addToCart('${prod.image_link}', '${prod.name}', '${prod.description.substring(0, 55).replace("'", "").replace("\n", "").trim()}', '${(!prod.category) ? `Category: Basic`: `Category : ${prod.category}`}', '${(!prod.rating) ? `Not Rated`: `Rating : ${prod.rating}`}', '${prod.price}')" type="button" class="add-to-cart-btn"><i class="fa fas fa-shopping-cart"></i>Add to Cart</button>
            </div>
            `  
            
            // Adding the article element to the result section element
            products_grid.appendChild(article_item);
        })     
        
    } catch (error) {
        console.log("Error loading products");
    }
}

function addToCart(prodImg, prodName, prodDesc, prodCat, prodRating, prodPrice) {
  let product = new Product(prodImg, prodName,prodCat, prodDesc, prodPrice, prodRating, prodCat);

  if (KEY in localStorage) {
    const destinationList = JSON.parse(localStorage.getItem(KEY));
    var indexOfObject = destinationList.findIndex(elem => elem.pName === product.pName);

  // if (isExist)
    if (indexOfObject !== -1){

      var objectToUpdate = destinationList[indexOfObject];
      objectToUpdate.pQuantity += 1;
      objectToUpdate.totalPrice *= objectToUpdate.pQuantity;
      destinationList[indexOfObject] =  objectToUpdate;
    }else{
      //Add new Product to Existing my_cart in local storage
      destinationList.push(product);
    }
    localStorage.setItem(KEY, JSON.stringify(destinationList));
    
  }else{
    cartPrutoductList.push(product);
    localStorage.setItem(KEY, JSON.stringify(cartPrutoductList));
  }

  console.log(`PROD-img: ${prodImg}`);
  console.log(`PROD-name: ${prodName}`);
  console.log(`PROD-Descrip: ${prodDesc}`);
  console.log(`PROD-category: ${prodCat}`);
  console.log(`PROD-rating: ${prodRating}`);
  console.log(`PROD-price: ${prodPrice}`);

  // console.log(`PROD-value: ${x}`);
};

// $(".d-to-cart-btn").on("click", function(params) {
  
// });




