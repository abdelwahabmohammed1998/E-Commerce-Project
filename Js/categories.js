import { getProductsByCategory, displayProducts, products } from "./products.js";
import { addToCart } from "./cart.js";
let categories = [];
const categorySection = document.querySelector(".ag-courses_box");
const categoryTabs = document.querySelector(".tab_links");
let categoryTab = "";

export async function getCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  return data;
}
const loading = document.querySelector(".loading");
categories.length === 0 ? (loading.style.display = "none") : "";

(async function () {
  categories = await getCategories();
  categories = await categories;

  categories.slice(0, 8).forEach((category) => {
    categorySection.innerHTML += `
      <div class="col-3 ag-courses_item mb-3">
      <a href="#" class="ag-courses-item_link rounded">
        <div class="ag-courses-item_bg"></div>
        <div class="ag-courses-item_title text-capitalize">
          ${category}
        </div>
      </a>
  </div>
      `;
  });
  categories.forEach((category) => {
    categoryTabs.innerHTML += `
    <li><a href="" class="category-tab text-capitalize">${category}</a></li>
    `;
  });
  categoryTab = Array.from(document.querySelectorAll(".category-tab"));
  categoryTab.forEach((category) => {
    category.addEventListener("click", (e) => {
      e.preventDefault();
      getProductsByCategory(e.target.textContent)
        .then((products) => {
          displayProducts(products.products);
        })
        .catch((error) => {
          console.error("Error fetching or displaying products:", error);
        });
    });
  });
})();
