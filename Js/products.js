import { addToCart } from "./cart.js";
import { displayProductDetails } from "./productDetails.js";

export let products = [];
const productsSection = document.getElementById("products-section");
let productsHTML = "";
let addToCartBtns = "";
let viewProduct = "";

export async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
}
export async function getProductsByCategory(category) {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await response.json();
  return data;
}

export async function getProductsById(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return data;
}

export function displayProducts(products) {
  productsHTML = "";
  productsSection.innerHTML = productsHTML;
  products.forEach((product) => {
    productsHTML += `
    <div class="col-4 mb-3">
      <div class="product shadow rounded pb-2 style_1">
        <div class="product_thumb position-relative">
          <img
            src="${product.thumbnail}"
            class="w-100 h-100 rounded"
            alt="${product.title}"
          />
          <div
            class="discount_badge bg-white shadow rounded text-primary position-absolute"
          >
            -${product.discountPercentage.toFixed(0)}%
          </div>
          <div class="cart_badge position-absolute">
            <button
              class="cart_icon accent_bg white_color border-0 view-product-details"
              name="${product.id}"
            >
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
          <button
          class="cart_btn accent_bg border-0 fs_16 white_color medium position-absolute rounded add-to-cart"
          id="${product.id}"
          >
          Add To Cart
        </button>
        </div>
        <div class="product_info text-center">
          <h3 class="product_title">
            <button class="border-0 bg-transparent view-product-details" name="${
              product.id
            }" 
              >${product.title}</button
            >
          </h3>
          <p class="product_price">$${product.price}.00</p>
        </div>
      </div>
    </div>
    `;
  });
  productsSection.innerHTML = productsHTML;
  addToCartBtns = Array.from(document.querySelectorAll(".add-to-cart"));
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      getProductsById(btn.id)
        .then((product) => {
          addToCart(product, 1);
        })
        .catch((error) => {
          console.error("Error fetching or displaying products:", error);
        });
    });
  });
  viewProduct = Array.from(document.querySelectorAll(".view-product-details"));
  viewProduct.forEach((btn) => {
    btn.addEventListener("click", () => {
      getProductsById(btn.name).then((product) => {
        displayProductDetails(product);
      });
    });
  });
}
const loading = document.querySelector(".loading");
products.length === 0 ? (loading.style.display = "none") : "";

(async function () {
  products = await getProducts();
  products = await products;
  displayProducts(products.products);
})();
