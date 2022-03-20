// Topbar code start
var logoText =  `<a href='./index.html'><span> Shop</span>Lane</a>`;
$("#logo").append(logoText);

var clothingText = `<a href='#Clothing' >Clothing</a>`;
var accessoriesText = `<a href='#Accessories'>Accessories</a>`;
$("#left-menu").append(clothingText, accessoriesText)

var SearchWrapper = `<img class='search-icon' src='https://img.icons8.com/material-two-tone/24/000000/search.png'/><input class="search-input" type = text placeholder = 'Search For Clothing And Accessories' name = 'search'>`;
$("#search-box").append(SearchWrapper);

var cartCount = `<a href='./addCart.html'><img src='https://img.icons8.com/external-icongeek26-outline-icongeek26/64/000000/external-cart-ecommerce-icongeek26-outline-icongeek26.png'/></a>`;
$("#cart-wrapper").append(cartCount)

var avatar = `<img id='avatar' src = 'https://media.gq-magazine.co.uk/photos/5d13ad12976fa30cf6f3b2a2/16:9/w_2560%2Cc_limit/HP.jpg'>`;
$("#right-menu").append(avatar)
// Topbar code end

// Carousel effect start
var counter = 1;
setInterval(function(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 4){
    counter = 1;
  }
},3000)

// Carousel effect end

// var clothHeading = $("#clothing-heading").text("Clothing for Men and Women")
// var accessoriesHeading = $("#accessories-heading").text("Accessories for Men And Women")


$(function() {

  $.ajax({
      url: 'https://5d76bf96515d1a0014085cf9.mockapi.io/product',
      type: 'GET',
      contentType: 'application/json',
      success: function(response){
          console.log(response);
          if(response){
              let clothsDiv = '';
              let accessoriesDiv = '';
              for(var i=0; i<response.length; i++){
                  if(response[i].isAccessory){
                      accessoriesDiv += `<div class="card">
                          <a href="./product.html?id=${response[i].id}">
                          <img src="${response[i].preview}" alt="${response[i].name}">
                          </a>
                          <div id="productDetails">
                              <h4>${response[i].name}</h3>
                              <h5>${response[i].brand}</h5>
                              <p>${response[i].price}</p>
                          </div>
                      </div>`;
                  }else{
                      clothsDiv += `<div class="card">
                          <a href="./product.html?id=${response[i].id}">
                          <img src="${response[i].preview}" alt="${response[i].name}">
                          </a>
                          <div id="productDetails">
                              <h4>${response[i].name}</h3>
                              <h5>${response[i].brand}</h5>
                              <p>Rs ${response[i].price}</p>
                          </div>
                      </div>`;
                  }
              }

              $("#ClothingCards").append(clothsDiv);
              $("#AccessoriesCards").append(accessoriesDiv);
          }
          
      },
      error: function(err){
          console.log("Error", err);
      }
  });

  // Add to cart count
 function addToCardCount(){
        var total = 0;
        var addToCartItemCount = localStorage.getItem('addCart')?JSON.parse(localStorage.getItem('addCart')):[];
        for (var i = 0; i < addToCartItemCount.length;i++){
            total += addToCartItemCount[i].total;
        }
        $("#count").text(total);
    }
    addToCardCount();
})