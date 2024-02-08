import { ToggleCart, displayCartItem } from "./cart.js";
import { backToTop } from "./index.js";
let sections = document.querySelectorAll("section");

export function displaySections(selectedSection) {
  sections.forEach((section) => {
    if (section.id === selectedSection) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
  backToTop();
}
export function displayHome() {
  sections.forEach((section) => {
    if (
      section.id != "product-details-section" &&
      section.id != "cart-section" &&
      section.id != "about-section"&&
      section.id != "contact-section"
    ) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
  backToTop();
}

let homeLink = document.querySelector("#home-btn");
homeLink.addEventListener("click", () => {
  displayHome();
});

let viewEditCart = document.querySelector("#view-edit-cart");
viewEditCart.addEventListener("click", () => {
  displaySections("cart-section");
  ToggleCart();
  displayCartItem();
});

let aboutUs = document.querySelector("#about-us");
aboutUs.addEventListener("click", () => {
  displaySections("about-section");
});

let contactUs = document.querySelector("#contact-us");
contactUs.addEventListener("click", () => {
  displaySections("contact-section");
});