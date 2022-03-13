const closeButton = document.querySelector(".close-button");
const menuButton = document.querySelector(".menu-button");

const mobileNav = document.querySelector(".mobile-nav");

const mobileNavLinksList = document.querySelectorAll(".mobile-anchor-link");



const openNavMenu = () => {
  mobileNav.style.display  = "flex"
  console.log("hello");
}

const closeNavMenu = () => {
  console.log("hello");
  mobileNav.style.display = "none";
}

mobileNavLinksList.forEach((link) => {
  link.addEventListener("click", closeNavMenu)
})


menuButton.addEventListener("click", openNavMenu);
closeButton.addEventListener("click", closeNavMenu);