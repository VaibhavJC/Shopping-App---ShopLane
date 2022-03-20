// Topbar code start
var logoText =  `<a href='./index.html'><span> Shop</span>Lane</a>`;
$("#logo").append(logoText);

var clothingText = `<a href='./index.html#clothing-section' >Clothing</a>`;
var accessoriesText = `<a href='./index.html#accessories-section'>Accessories</a>`;
$("#left-menu").append(clothingText, accessoriesText)

var SearchWrapper = `<img class='search-icon' src='https://img.icons8.com/material-two-tone/24/000000/search.png'/><input class="search-input" type = text placeholder = 'Search For Clothing And Accessories' name = 'search'>`;
$("#search-box").append(SearchWrapper);

var cartCount = `<a href='./addCart.html'><img src='https://img.icons8.com/external-icongeek26-outline-icongeek26/64/000000/external-cart-ecommerce-icongeek26-outline-icongeek26.png'/></a><p id='count'>0</p>`;
$("#cart-wrapper").append(cartCount)

var avatar = `<img id='avatar' src = 'https://media.gq-magazine.co.uk/photos/5d13ad12976fa30cf6f3b2a2/16:9/w_2560%2Cc_limit/HP.jpg'>`;
$("#right-menu").append(avatar)
// Topbar code end

$(function() {
    var url_string = location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    if(id){
        $.ajax({
            url: `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`,
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if(response){
                    var responseData = response;
                    var bigImage = document.getElementById("big-image");
                    bigImage.src = response.preview;
                    var productDetailWrapper = document.getElementById("product-detail-wrapper");
                
                    var getImageHTML = '';
                    for (var i = 0; i < response.photos.length; i++) {
                        var className = i == 0 ? 'active' : '';
                        getImageHTML += `<img class="thumbail ${className}" id="img-${response.id+i}" src="${response.photos[i]}" alt="Image Preview - ${i}">`;
                    }
                    var createProductHTML = `<h1 id="name">${response.name}</h1>
                                            <h4 id="brand">${response.brand}</h4>
                                            <h3>Price: Rs <span id="price">${response.price}</span></h3>
                                            <h3 id="descriptionHeading">Description</h3>
                                            <p>${response.description}</p>
                                            <h3>Product Preview</h3>
                                            <div class="previewImage">${getImageHTML}</div>
                                            <div ><button id="addToCart">Add to Cart</button></div>`;
                
                    productDetailWrapper.insertAdjacentHTML('beforeEnd', createProductHTML);
                
                    var getAllImageTag = document.querySelectorAll('.previewImage img');
                
                    for(var i=0; i<getAllImageTag.length; i++){
                        getAllImageTag[i].addEventListener('click', function(e){
                            var getActiveElem = document.querySelector('.previewImage .active');
                            getActiveElem.classList.remove('active');
                            bigImage.src = this.src;
                            this.classList.add('active');
                        });
                    }
                    $("#addToCart").click(function(){
                        var alreadyAddedInCard = false;
                        var getAllAddToCartItem = localStorage.getItem('addCart')?JSON.parse(localStorage.getItem('addCart')):[];
                        for(var i=0;i<getAllAddToCartItem.length;i++){
                            if(getAllAddToCartItem[i].id === responseData.id){
                                alreadyAddedInCard = true;
                                getAllAddToCartItem[i].total++;
                            }
                        }
                        if(!alreadyAddedInCard){
                            getAllAddToCartItem.push({id:responseData.id, name:responseData.name, price:responseData.price, total:1, img:responseData.preview});
                        }
                        localStorage.setItem('addCart', JSON.stringify(getAllAddToCartItem));
                        addToCardCount();
                    });
                }
                
            },
            error: function(err){
                console.log("Error", err);
            }
        });
    }
  
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