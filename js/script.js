// Smooth Scroll to Sports Section
function scrollToSection() {
    document.querySelector("#sports").scrollIntoView({ behavior: "smooth" });
}

// Sticky Navigation Bar on Scroll
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.backgroundColor = "#222"; // Darker background when scrolling
        nav.style.transition = "0.3s";
    } else {
        nav.style.backgroundColor = "transparent"; // Transparent when at top
    }
});

// Animated Login Popup
function showLogin() {
    let loginBox = document.createElement("div");
    loginBox.innerHTML = `
        <div class="login-popup">
            <h2>Login</h2>
            <input type="text" id="login-username" placeholder="Username">
            <input type="password" id="login-password" placeholder="Password">
            <button onclick="handleLogin()">Login</button>
            <button onclick="closeLogin()">Close</button>
            <p class="error-message login-error" style="display: none; color: red;"></p>
        </div>
    `;
    loginBox.classList.add("login-overlay");
    document.body.appendChild(loginBox);
}

function closeLogin() {
    document.querySelector(".login-overlay").remove();
}

// Handle Login
function handleLogin() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();
    let errorBox = document.querySelector(".login-error");

    if (username === "" || password === "") {
        showError(errorBox, "All fields are required!");
        return;
    }

    let fakeUser = { username: "user", password: "123456" };

    if (username === fakeUser.username && password === fakeUser.password) {
        alert("Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username); // Store user info
        window.location.href = "dashboard.html";
    } else {
        showError(errorBox, "Invalid username or password!");
    }
}

// Mobile Navigation Menu Toggle
function toggleMenu() {
    let menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("active");
}

// Hover Animation on Sports Grid
document.querySelectorAll(".sport").forEach(item => {
    item.addEventListener("mouseover", () => {
        item.style.transform = "scale(1.1)";
        item.style.transition = "0.3s";
    });
    item.addEventListener("mouseout", () => {
        item.style.transform = "scale(1)";
    });
});

// Dashboard Features
document.addEventListener("DOMContentLoaded", function () {
    // Set Current Year in Footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Check Login State
    if (window.location.pathname.includes("dashboard.html")) {
        let isLoggedIn = localStorage.getItem("isLoggedIn");
        let username = localStorage.getItem("username");

        if (!isLoggedIn) {
            alert("You must be logged in to access the dashboard!");
            window.location.href = "login.html";
        } else {
            document.getElementById("dashboard-welcome").textContent = `Welcome, ${username}!`;
        }

        // Handle Activity Management
        document.getElementById("add-activity").addEventListener("click", addActivity);
    }

    // Logout Function
    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            alert("Logging out...");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            window.location.href = "login.html";
        });
    }

    // Handle Dark Mode Toggle
    let darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", toggleDarkMode);
        applyDarkMode();
    }
});

// Add Activity to Dashboard
function addActivity() {
    let activityInput = document.getElementById("new-activity");
    let activityList = document.getElementById("activity-list");

    if (activityInput.value.trim() !== "") {
        let listItem = document.createElement("li");
        listItem.textContent = activityInput.value;
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function () {
            listItem.remove();
        };
        listItem.appendChild(removeBtn);
        activityList.appendChild(listItem);
        activityInput.value = "";
    } else {
        alert("Please enter an activity!");
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    let body = document.body;
    let isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

// Apply Dark Mode on Load
function applyDarkMode() {
    let isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
}

// Function to Show Error Messages
function showError(element, message) {
    element.textContent = message;
    element.style.display = "block";
}
function editProfile() {
    let newName = prompt("Enter your new name:", document.getElementById("profileName").textContent);
    let newEmail = prompt("Enter your new email:", document.getElementById("profileEmail").textContent);
    
    if (newName) {
        document.getElementById("profileName").textContent = newName;
        localStorage.setItem("profileName", newName);
    }
    if (newEmail) {
        document.getElementById("profileEmail").textContent = newEmail;
        localStorage.setItem("profileEmail", newEmail);
    }
}

// Load saved profile info on page load
document.addEventListener("DOMContentLoaded", function () {
    let savedName = localStorage.getItem("profileName");
    let savedEmail = localStorage.getItem("profileEmail");

    if (savedName) document.getElementById("profileName").textContent = savedName;
    if (savedEmail) document.getElementById("profileEmail").textContent = savedEmail;
});
// Function to Enable Profile Editing
function editProfile() {
    let nameElement = document.getElementById("profileName");
    let emailElement = document.getElementById("profileEmail");

    let newName = prompt("Enter your new name:", nameElement.textContent);
    let newEmail = prompt("Enter your new email:", emailElement.textContent);

    if (newName) {
        nameElement.textContent = newName;
        localStorage.setItem("profileName", newName); // Save to local storage
    }
    if (newEmail) {
        emailElement.textContent = newEmail;
        localStorage.setItem("profileEmail", newEmail); // Save to local storage
    }
}

// Function to Update Profile Picture
function updateProfilePic(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let profilePic = document.getElementById("profilePic");
            profilePic.src = e.target.result;
            localStorage.setItem("profilePic", e.target.result); // Save to local storage
        };
        reader.readAsDataURL(file);
    }
}

// Load Saved Profile Data from Local Storage
document.addEventListener("DOMContentLoaded", function () {
    let savedName = localStorage.getItem("profileName");
    let savedEmail = localStorage.getItem("profileEmail");
    let savedPic = localStorage.getItem("profilePic");

    if (savedName) document.getElementById("profileName").textContent = savedName;
    if (savedEmail) document.getElementById("profileEmail").textContent = savedEmail;
    if (savedPic) document.getElementById("profilePic").src = savedPic;
});
function openSport(sportName) {
    alert("More details on " + sportName + " coming soon!");
}
document.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    let scrollPos = window.scrollY;

    sections.forEach((section) => {
        let top = section.offsetTop - 50;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll(".nav-link").forEach((link) => {
                link.classList.remove("active");
            });
            document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add("active");
        }
    });
});
function toggleMenu() {
    let navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}
// Toggle Chat Box Visibility
function toggleChat() {
    let chatBox = document.getElementById("chatBox");
    chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "block" : "none";
}

// Handle Sending Messages
function sendMessage() {
    let inputField = document.getElementById("chatInput");
    let message = inputField.value.trim();
    let chatMessages = document.getElementById("chatMessages");

    if (message !== "") {
        // Append User Message
        let userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.textContent = "You: " + message;
        chatMessages.appendChild(userMessage);

        // Simulate Bot Response
        setTimeout(() => {
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.textContent = "Bot: Hello! How can I help you?";
            chatMessages.appendChild(botMessage);

            // Auto-scroll to the latest message
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        // Clear Input Field
        inputField.value = "";
    }
}

// Handle Enter Key Press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
let menuTimeout;

function toggleMenu() {
    let navLinks = document.getElementById("nav-links");

    // Toggle visibility
    if (navLinks.style.display === "block") {
        navLinks.style.display = "none";
        clearTimeout(menuTimeout); // Clear timeout if closing manually
    } else {
        navLinks.style.display = "block";

        // Set a timer to auto-hide the menu after 5 seconds
        menuTimeout = setTimeout(() => {
            navLinks.style.display = "none";
        }, 7000); // Change to 10000 for 10 seconds
    }
}

// Function to check if elements are in view
function revealOnScroll() {
    let elements = document.querySelectorAll('.scroll-animation');
    let windowHeight = window.innerHeight;

    elements.forEach((el) => {
        let position = el.getBoundingClientRect().top;
        if (position < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

// Run the function on scroll
window.addEventListener('scroll', revealOnScroll);

// Run on page load (in case some elements are already in view)
revealOnScroll();

// Typing Effect for Hero Text
const text = "Elevate Your Game";
let index = 0;
const speed = 100; // Typing speed in milliseconds

function typeEffect() {
    if (index < text.length) {
        document.getElementById("hero-text").innerHTML = text.substring(0, index + 1);
        index++;
        setTimeout(typeEffect, speed);
    }
}

// Import Firebase Authentication
import { getAuth, setPersistence, browserSessionPersistence, 
         signInWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// ✅ Enable session persistence (so users stay logged in)
setPersistence(auth, browserSessionPersistence)
  .then(() => console.log("Session persistence enabled"))
  .catch((error) => console.error("Error setting persistence:", error));

// ✅ Function to Log In User
function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      const errorMsg = document.querySelector(".login-error");
      if (errorMsg) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
      }
    });
}

// ✅ Ensure DOM is Loaded Before Running Scripts
document.addEventListener("DOMContentLoaded", () => {
  
  // ✅ Handle Login Form Submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      loginUser(email, password);
    });
  }

  // ✅ Handle Logout Button Click (Fix for dashboard.html)
  setTimeout(() => { // Ensures it executes after DOM is fully loaded
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            console.log("User logged out");
            window.location.href = "login.html"; // Redirect to login page
          })
          .catch((error) => console.error("Logout error:", error));
      });
    } else {
      console.error("Logout button not found!");
    }
  }, 500); // Small delay to ensure the DOM is ready

  // ✅ Protect Dashboard: Redirect if Not Logged In
  onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user);

    if (!user && window.location.pathname.includes("dashboard.html")) {
      console.log("No user detected, redirecting to login...");
      window.location.href = "login.html";
    } else if (user) {
      // Update User Profile Info in Dashboard
      const username = document.getElementById("username");
      const profileEmail = document.getElementById("profileEmail");

      if (username) username.innerText = user.displayName || "User";
      if (profileEmail) profileEmail.innerText = user.email;
    }
  });
});
// Image Slider Functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

// Back to Top Button
window.onscroll = function() {
    let button = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }
