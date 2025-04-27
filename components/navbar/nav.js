var body=document.getElementById("header")
var num=0
// console.log(items.length)
if(localStorage.getItem("myitems"))
{
  var items=JSON.parse(localStorage.getItem('myitems'));
  for (var i = 0; i < items.length; i++) {
    num++;
  }
}
else
{
  num=0;
}

// Get wishlist count
var wishlistCount = 0;
if(localStorage.getItem("wishlist"))
{
  var wishlistItems = JSON.parse(localStorage.getItem('wishlist'));
  wishlistCount = wishlistItems.length;
}

let navbar=
`
<a href="index.html" class="logo">Exclusive</a>
<div>
  <ul id="navbar">
    <li><a class="active" href="index.html">Home</a></li>
    <li><a href="product.html">Product</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="login.html">Sign Up</a></li>
    <a href="#" id="close"><i class="bi bi-x fs-1"></i></a>
  </ul>
</div>
<div class="search-container">
  <input type="text" placeholder="What are you looking for?" class="search-input">
  <button class="search-button"><i class="bi bi-search"></i></button>
</div>
<div class="nav-icons">
  <a href="login.html" class="icon-link"><i class="bi bi-person"></i></a>
  <a href="wishlist.html" class="icon-link">
    <i class="bi bi-heart"></i>
    <span class="wishlist-count">${wishlistCount}</span>
  </a>
  <a href="cart.html" class="icon-link">
    <i class="bi bi-cart"></i>
    <span class="cart-count">${num}</span>  </a>
</div>
<div id="mobile">
  <i onclick="location.href='login.html'" class="bi bi-person fs-1"></i>
  <i onclick="location.href='wishlist.html'" class="bi bi-heart fs-1"><sup class="mobile-wishlist-count">${wishlistCount}</sup></i>
  <i onclick="location.href='cart.html'" class="bi bi-cart fs-1"><sup class="mobile-cart-count">${num}</sup></i>
  <i id="bar" class="bi bi-list fs-1"></i>
</div>
`
body.innerHTML=navbar;

const bar = document.getElementById('bar');
const c = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
  bar.addEventListener('click',()=>{
    nav.classList.add('active')
  })
}

if(c){
  c.addEventListener('click',() =>{
    nav.classList.remove('active');
  })
}

var path = window.location.pathname;
var page = path.split("/").pop();
   
var li=document.getElementsByTagName("li");

for(let i=0;i<5;i++) 
{
  li[i].childNodes[0].classList.remove("active")
}

switch(page)
{
  case"index.html":
     li[0].childNodes[0].classList.add("active")
      break;
  case"product.html":
     li[1].childNodes[0].classList.add("active")
      break;
  case"about.html":
     li[2].childNodes[0].classList.add("active")
     break;
  case"contact.html":
     li[3].childNodes[0].classList.add("active")
     break;
  case"login.html":
     li[4].childNodes[0].classList.add("active")
     break;
  case"cart.html":
     document.querySelector('.nav-icons .icon-link:nth-child(3)').classList.add("active")
     break;
  case"wishlist.html":
     document.querySelector('.nav-icons .icon-link:nth-child(2)').classList.add("active")
     break;
}

var person=document.getElementById("person")
const nam =localStorage.getItem("username")? localStorage.getItem("username"):"";

if(localStorage.getItem("username"))
{ 
  document.querySelector('.nav-icons .icon-link:first-child').innerHTML = `
    <span>${nam}</span>
    <a href="#" onclick="logout()"><i class="bi bi-box-arrow-right"></i></a>
  `;
}

function logout()
{ 
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("useremail");
  window.localStorage.removeItem("password");
  window.localStorage.removeItem("myitems");
  window.localStorage.removeItem("total");
  window.location.href = "index.html";
}

// Function to update wishlist count
function updateWishlistCount() {
  const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
  const wishlistCountElements = document.querySelectorAll('.wishlist-count');
  
  if (wishlistCountElements) {
    wishlistCountElements.forEach(element => {
      element.textContent = wishlist.length;
    });
  }
}

// Function to update cart count
function updateCartCount() {
  let cartItems = [];
  
  // Check both possible localStorage keys for cart items
  if (localStorage.getItem('myitems')) {
    cartItems = JSON.parse(localStorage.getItem('myitems'));
  } else if (localStorage.getItem('items')) {
    cartItems = JSON.parse(localStorage.getItem('items'));
  }
  
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  if (cartCountElements) {
    cartCountElements.forEach(element => {
      element.textContent = cartItems.length;
    });
  }
}

// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
  updateWishlistCount();
  updateCartCount();
});

// Listen for custom events to update counts
window.addEventListener('wishlistUpdated', updateWishlistCount);
document.addEventListener('cartUpdated', updateCartCount);
