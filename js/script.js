// "strict mode";

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

const productsAr = [
    {
      prod_img: 'prod1.jpg',
      name: 'Product3',
      brand: "colourpop",
      description: 'Here is a shot of this product that might entice a user to click and add it to their cart',
      price: 50.00,
      price_sign: "$",
      product_colors: ['Fair 05', 'Ziggie'],
      category: "lipstick"
    },
    {
        prod_img: 'prod1.jpg',
        name: 'Blotted Lip',
        brand: "colourpop",
        description: 'Here is a shot of this product that might entice a user to click and add it to their cart',
        price: 50.00,
        price_sign: "$",
        product_colors: ['Fair 05', 'Ziggie'],
        category: "lipstick"
    },
    {
        prod_img: 'prod1.jpg',
        name: 'Lippie Pencil',
        brand: "colourpop",
        description: 'Here is a shot of this product that might entice a user to click and add it to their cart',
        price: 50.00,
        price_sign: "$",
        product_colors: ['Fair 05', 'Ziggie'],
        category: "lipstick"
    }
  ]

// =========== Select the element all products
const products_grid = document.querySelector('#prods');
let the_ProductsAr = productsAr
let previous_ProductsAr = []

// Modify the new element, create the templete for all product.
const setProducts = function (product_array) {
    
    try {
            products_grid.innerHTML = `` 
            product_array.forEach((prod) => {

            // Create article element to hold each product
            const article_item = document.createElement('article')
            // Adding class name product to the article created
            article_item.classList.add('product') 

            article_item.innerHTML = `
            <img src="./img/prod1.jpg" alt="product1">
            <div class="prod-desc">
                <h2>${prod.name}</h2>
                <p>${prod.description}.</p>
            </div>
            <div class="prod-details">
                <i id="cat-name">Category : ${prod.category}</i>
                <h3>Price: ${prod.price}${prod.price_sign}</h3>
                <button type="button" class="add-to-cart-btn"><i class="fa fas fa-shopping-cart"></i>Add to Cart</button>
            </div>
            `  
            
            // Adding the article element to the result section element
            products_grid.appendChild(article_item);
        })     
        
    } catch (error) {
        console.log("Error loading products");
    }
}

setProducts(productsAr);