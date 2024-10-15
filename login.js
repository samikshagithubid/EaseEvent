const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
const usernameDisplay = document.getElementById('username');
const logoutButton = document.getElementById('logoutButton');

// Check local storage for username
const storedUsername = localStorage.getItem('username');
if (storedUsername) {
    displayUsername(storedUsername);
}

// Event listeners for input focus and blur
inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value !== "") return;
        inp.classList.remove("active");
    });
});

// Toggle between sign in and sign up forms
toggle_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

// Function to move the image slider
function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

// Event listeners for bullet clicks
bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});

// Handle form submissions
document.querySelector('.sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = this.email.value; // Replace with username if needed
    localStorage.setItem('username', email);
    displayUsername(email);
    this.reset(); // Clear the form
});

document.querySelector('.sign-up-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = this.name.value;
    localStorage.setItem('username', name);
    displayUsername(name);
    this.reset(); // Clear the form
});

// Display username
function displayUsername(username) {
    usernameDisplay.textContent = `Welcome, ${username}`;
    logoutButton.style.display = 'block';
}

// Handle logout
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('username');
    usernameDisplay.textContent = '';
    logoutButton.style.display = 'none';
});
