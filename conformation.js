// Topbar code start
var logoText =  `<a href='./index.html'><span> Shop</span>Lane</a>`;
$("#logo").append(logoText);

var clothingText = `<a href='./index.html#Clothing' >Clothing</a>`;
var accessoriesText = `<a href='./index.html#Accessories'>Accessories</a>`;
$("#left-menu").append(clothingText, accessoriesText)

var SearchWrapper = `<img class='search-icon' src='https://img.icons8.com/material-two-tone/24/000000/search.png'/><input class="search-input" type = text placeholder = 'Search For Clothing And Accessories' name = 'search'>`;
$("#search-box").append(SearchWrapper);

var cartCount = `<a href='./addCart.html'><img src='https://img.icons8.com/external-icongeek26-outline-icongeek26/64/000000/external-cart-ecommerce-icongeek26-outline-icongeek26.png'/></a><p id='count'>0</p>`;
$("#cart-wrapper").append(cartCount)

var avatar = `<img id='avatar' src = 'https://media.gq-magazine.co.uk/photos/5d13ad12976fa30cf6f3b2a2/16:9/w_2560%2Cc_limit/HP.jpg'>`;
$("#right-menu").append(avatar)
// Topbar code end

$(function() {
    localStorage.setItem('addCart', JSON.stringify([]));
     // Add to cart count
     function addToCardCount(){
        let total = 0;
        let addToCartItemCount = localStorage.getItem('addCart')?JSON.parse(localStorage.getItem('addCart')):[];
        for (let i = 0; i < addToCartItemCount.length;i++){
            total += addToCartItemCount[i].total;
        }
        $("#count").text(total);
    }
    addToCardCount();
})