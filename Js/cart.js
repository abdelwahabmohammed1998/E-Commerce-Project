import { displayHome } from "./routes.js";
let cartCount = document.getElementById("cart_count");
let miniCartItems = document.getElementById("mini-cart-item");
let cartIcon = document.getElementById("cart-icon");
let cartItem = document.getElementById("cart-item");
let cartBody = document.getElementById("cart-tbody");
let cart = [];
let cartTotal = Array.from(document.querySelectorAll(".cart-total"));
let checkoutBtn = document.getElementById("proceed-checkout");
let orderSuccess = document.getElementById("order-success");
let cost = document.getElementById("cost");

export function addToCart(product, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productInCart = cart.find((item) => item.id === product.id);
  console.log(productInCart);
  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    cart.push({ ...product, quantity: quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartTotal[0].innerHTML = `$${calculateTotal()}`;
  cartTotal[1].innerHTML = `$${calculateTotal() + 25}`;
  displayCartItem();
  displayCartCount();
}
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
export function displayCartCount() {
  cart = getCart();
  let count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.innerHTML = count;
}
export function ToggleCart() {
  miniCartItems.classList.toggle("d-block");
}

cartIcon.addEventListener("click", function () {
  ToggleCart();
  getCart();
  displayMiniCart();
});

function displayMiniCart() {
  let cart = getCart();
  let cartItems = cart.map((item) => {
    return `
    <div class="cart_item">
      <div class="row  m-0 p-0">
      <div class="col-5">
        <div class="cart_img ps-0 pe-2">
        <img src="${item.thumbnail}" class="w-100 h-100" alt="${item.title}" />
        </div>
      </div>
      <div class="col-7">
        <span>${item.title}</span>
        <br />
        <span>x ${item.quantity}</span>
        <p class="text-center">$${item.price * item.quantity}</p>
      </div>
      </div>
    </div>
    `;
  });
  cartItem.innerHTML = cartItems.join("");
}

export function removeCartItem(id) {
  let cart = getCart();
  let itemIndex = cart.findIndex((item) => String(item.id) === String(id));
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartCount();
  displayMiniCart();
  displayCartItem();
  getCart();
  cartTotal[0].innerHTML = `$${calculateTotal()}`;
  cartTotal[1].innerHTML = `$${calculateTotal() + 25}`;
}

export function displayCartItem() {
  cart = getCart();
  calculateTotal();
  cartBody.innerHTML = "";
  cart.forEach((product) => {
    cartBody.innerHTML += `
    <tr>
    <td class="product_remove">
      <button class="btn remove-btn" name="${
        product.id
      }"><i class="fa-solid fa-trash"></i></button>
    </td>
    <td class="product_thumb">
      <img src="${product.thumbnail}" alt=""
      />
    </td>
    <td class="product_name">
      <button class="btn">${product.title}</button>
    </td>
    <td class="product-price">$${product.price}</td>
    <td class="product_quantity">
      <input class="product-quantity" min="1" max="100" value="${
        product.quantity
      }" type="number" />
    </td>
    <td class="product_total">$${product.quantity * product.price}</td>
  </tr>
    `;
    let removeBtn = document.querySelectorAll(".remove-btn");
    let productQuantity = document.querySelectorAll(".product-quantity");
    removeBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        removeCartItem(btn.name);
      });
    });
    productQuantity.forEach((input) => {
      let oldQuantity = input.value;
      input.addEventListener("change", function () {
        addToCart(product, parseInt(input.value - oldQuantity));
      });
    });
    cartTotal[0].innerHTML = `$${calculateTotal()}`;
    cartTotal[1].innerHTML = `$${calculateTotal() + 25}`;
  
  });
}

function calculateTotal() {
  let cart = getCart();
  let total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  return total;
}

checkoutBtn.addEventListener("click", function () {
  cost.innerHTML = `$${calculateTotal() + 25}`;
  orderSuccess.classList.add("d-block");
  localStorage.removeItem("cart");
  displayCartCount();
  setTimeout(() => {
    orderSuccess.classList.remove("d-block");
    displayHome();
  }, 5000);
});
(function () {
  displayCartCount();
})();
