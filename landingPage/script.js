var currentSlide = 0;
var slides = ["4.png", "2.png", "3.png", "5.png", "1.png"];
var slideInterval;

function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

// Function to show a specific slide
function showSlide(index) {
  var img = document.querySelector(".slideshow img");
  img.src = slides[index];
}

// Function to go to the previous slide
function prevSlide() {
  currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
  showSlide(currentSlide);
}

// Function to go to the next slide
function nextSlide() {
  currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
  showSlide(currentSlide);
}

// Function to start the auto-slide
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 2000);
}

// Function to stop the auto-slide
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Start the auto-slide when the page loads
window.onload = function () {
  showSlide(currentSlide);
  startAutoSlide();
};

// Optional: Stop auto-slide on hover and resume on mouse leave
var slideshow = document.querySelector(".slideshow");
slideshow.addEventListener("mouseover", stopAutoSlide);
slideshow.addEventListener("mouseleave", startAutoSlide);

// Close menu when clicking outside of it
document.addEventListener("click", function (event) {
  var menu = document.getElementById("menu");
  var menuIcon = document.querySelector(".menu-icon");

  // Check if the click is outside the menu and the menu icon
  if (
    menu.style.display === "block" &&
    !menu.contains(event.target) &&
    !menuIcon.contains(event.target)
  ) {
    menu.style.display = "none";
  }
});
