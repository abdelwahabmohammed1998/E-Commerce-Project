import { displayProducts, getProductsById, products } from "./products.js";
import { displaySections } from "./routes.js";
import { addToCart } from "./cart.js";

let productDetails = "";
let productImages = "";
let productImagePreview = "";
let closePreview = "";

export function displayProductDetails(product) {
  productDetails = document.querySelector(".product_details");
  productImages = document.querySelector(".product_gallery");
  const maxRating = 5;
  const filledStars = Math.round(product.rating);
  const emptyStars = maxRating - filledStars;
  displaySections("product-details-section");
  productDetails.innerHTML = `
    <h3 class="text-capitalize">${product.title}</h3>
    <div class="product_price">
      <span class="current_price">$${product.price}</span>
      <span class="old_price">$${(
        product.price +
        product.price * product.discountPercentage
      ).toFixed(2)}</span>
    </div>
    <div class="product_ratting">
    <ul>
    <span class="pe-2">Rate : ( <span class="text-primary">${
      product.rating
    }</span> )</span>
    ${Array.from(
      { length: filledStars },
      (_, index) => `
      <li class="d-inline pe-1">
        <i class="fa-solid fa-star text-primary"></i>
      </li>
    `
    ).join("")}
    ${Array.from(
      { length: emptyStars },
      (_, index) => `
      <li class="d-inline pe-1">
        <i class="fa-regular fa-star text-primary"></i>
      </li>
    `
    ).join("")}
  </ul>
  </div>
    <div class="product_description">
      <p>${product.description}</p>
    </div>
    <div class="product_details_action">
      <h3>Available Options: ${product.stock} Piece</h3>
      <div class="product_stock">
        <label>Quantity</label>
        <input min="1" value="1" max="${product.stock}" type="number" id="product-Quantity" />
      </div>
      <div class="product_action_link">
        <button class="product_cart add-to-cart">Add To Cart</button>
      </div>
    </div>
  `;

  productImages.innerHTML = `
    <div class="tab-content produc_thumb_conatainer mb-3">
      <div class="tab-pane fade show active" id="p_tab1" role="tabpanel">
        <div class="modal_img">
          <img src="${product.thumbnail}" alt="${
    product.title
  }" class="w-100 h-100" />
        </div>
      </div>
    </div>

    <div class="product_thumb_button">
      <ul class="nav product_d_button" role="tablist">
        ${product.images
          .slice(0, 4)
          .map(
            (image) => `
          <li>
            <button class="border-none h-100" name="${image} ">
              <img src="${image}" class="w-100 h-100 product-sub-image" />
            </button>
          </li>`
          )
          .join("")}
      </ul>
    </div>
  `;
  let productSubImages = document.querySelectorAll(".product_d_button button");
  productSubImages.forEach((image) => {
    image.addEventListener("click", () => {
      showImage(image.name);
    });
  });

  let addToCartBtn = document.querySelector(".add-to-cart");
  let quantity = "";
  addToCartBtn.addEventListener("click", () => {
    quantity = document.querySelector("#product-Quantity").value;
    addToCart(product, parseInt(quantity));
  });
}

function showImage(image) {
  productImagePreview = document.querySelector(".product-image-preview");
  productImagePreview.innerHTML = `
  <button class="close-preview">X</button>
  <img src="${image}"/>
  `;
  productImagePreview.style.display = "flex";
  closePreview = document.querySelector(".close-preview");
  closePreview.addEventListener("click", () => {
    productImagePreview.style.display = "none";
  });
}
