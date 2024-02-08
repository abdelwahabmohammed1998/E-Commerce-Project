import showSlide, { slides } from "./slider.js";
import { getUsers, getUserPost } from "./testimonel.js";
import { getCategories } from "./categories.js";
import { getProducts } from "./products.js";
import { addToCart } from "./cart.js";
import { displaySections } from "./routes.js";
import { displayProductDetails } from "./productDetails.js";
import { validateFirstName } from "./contact.js";

let slideIndex = 0;
function displayNextSlide() {
  slideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1;
  showSlide(slideIndex);
}
showSlide(slideIndex);
setInterval(displayNextSlide, 6000);

let backTop = document.getElementById("btn-back-to-top");
window.onscroll = function () {
  scrollFunction();
};
let nav = document.querySelector("nav");

function scrollFunction() {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    backTop.style.display = "block";
    nav.style.position = "fixed";
  } else {
    backTop.style.display = "none";
    nav.style.position = "relative";
  }
}

backTop.addEventListener("click", backToTop);

export function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
