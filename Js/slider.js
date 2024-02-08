export const slides = [
  {
    title: "smartphones",
    content:
      "Smartphones are multifunctional mobile devices with communication, internet access, and a wide range of applications. They feature touchscreens, high-quality cameras, and powerful processors, serving as essential tools for modern life.",
    image: "../Images/slide1.jpg",
  },
  {
    title: "laptops",
    content:
      "Laptops are portable computers designed for versatility and convenience. They typically feature a clamshell design with a keyboard and display, offering users a compact yet powerful computing solution for various tasks, including work, entertainment, and communication.",
    image: "../Images/slide2.jpg",
  },
  {
    title: "lighting",
    content:
      "Lighting encompasses a diverse category of products designed to illuminate spaces, enhance visibility, and create ambiance. This includes a variety of light sources such as incandescent, LED, and fluorescent bulbs, as well as fixtures like lamps and chandeliers, catering to functional and aesthetic lighting needs in homes, offices, and outdoor environments.",
    image: "../Images/slide3.jpg",
  },
  {
    title: "automotive",
    content:
      "Electronics is a broad category encompassing devices and systems that utilize the principles of electrical circuits and components. This includes a wide range of products such as smartphones, laptops, televisions, audio equipment, and various gadgets. Electronics play a crucial role in daily life, providing tools for communication, entertainment, information processing, and automation. The field also covers components like semiconductors, resistors, and capacitors, contributing to the development of innovative technologies and electronic systems.",
    image: "../Images/slide4.jpg",
  },
];
let slider = document.querySelector(".slider");
let categoryName = document.getElementById("product-category-name");
let categoryDescription = document.getElementById(
  "product-category-description"
);
let sliderImage = document.getElementById("slider-image");
let slidesBullets = document.querySelectorAll(".slick-bullet");
slidesBullets = Array.from(slidesBullets);
let sliderBtn = document.getElementById("hero-slider-btn");
slidesBullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    showSlide(index);
  });
});

export default function showSlide(index = 0) {
  const { title, content, image } = slides[index];
  sliderBtn.href = `./products.html#${title}`;
  categoryName.innerHTML = title;
  categoryDescription.innerHTML = content;
  sliderImage.src = image;
  slidesBullets.forEach((bullet, i) => {
    bullet.classList.toggle("slick-active", i === index);
  });
  
}