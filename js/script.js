// Smooth Scroll to Sports Section
function scrollToSection() {
    let sportsSection = document.querySelector("#sports");
    if (sportsSection) {
        sportsSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Sticky Navigation Bar on Scroll
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "#222"; // Darker background when scrolling
            nav.style.transition = "0.3s";
        } else {
            nav.style.backgroundColor = "transparent"; // Transparent when at top
        }
    }
});

// Ensure DOM is Loaded Before Running Scripts
document.addEventListener("DOMContentLoaded", () => {
    // ✅ Set Current Year in Footer
    let yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // ✅ Protect Dashboard: Redirect if Not Logged In
    if (window.location.pathname.includes("dashboard.html")) {
        let isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            alert("You must be logged in to access the dashboard!");
            window.location.href = "login.html";
        }
    }

    // ✅ Ensure Logout Button Works
    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            alert("Logging out...");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            window.location.href = "login.html";
        });
    }

    // ✅ Apply Dark Mode on Load
    let isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }

    // ✅ Ensure Dark Mode Toggle Works
    let darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            let isDark = document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", isDark);
        });
    }

    // ✅ Load Saved Profile Data from Local Storage
    let profileName = document.getElementById("profileName");
    let profileEmail = document.getElementById("profileEmail");
    let profilePic = document.getElementById("profilePic");

    if (profileName) profileName.textContent = localStorage.getItem("profileName") || "User";
    if (profileEmail) profileEmail.textContent = localStorage.getItem("profileEmail") || "email@example.com";
    if (profilePic) profilePic.src = localStorage.getItem("profilePic") || "default-pic.jpg";
});

// ✅ Function to Enable Profile Editing
function editProfile() {
    let nameElement = document.getElementById("profileName");
    let emailElement = document.getElementById("profileEmail");

    if (nameElement && emailElement) {
        let newName = prompt("Enter your new name:", nameElement.textContent);
        let newEmail = prompt("Enter your new email:", emailElement.textContent);

        if (newName) {
            nameElement.textContent = newName;
            localStorage.setItem("profileName", newName);
        }
        if (newEmail) {
            emailElement.textContent = newEmail;
            localStorage.setItem("profileEmail", newEmail);
        }
    }
}

// ✅ Function to Update Profile Picture
function updateProfilePic(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let profilePic = document.getElementById("profilePic");
            if (profilePic) {
                profilePic.src = e.target.result;
                localStorage.setItem("profilePic", e.target.result);
            }
        };
        reader.readAsDataURL(file);
    }
}

// ✅ Mobile Navigation Menu Toggle
let menuTimeout;
function toggleMenu() {
    let navLinks = document.getElementById("nav-links");
    if (navLinks) {
        if (navLinks.style.display === "block") {
            navLinks.style.display = "none";
            clearTimeout(menuTimeout);
        } else {
            navLinks.style.display = "block";
            clearTimeout(menuTimeout);
            menuTimeout = setTimeout(() => {
                navLinks.style.display = "none";
            }, 7000);
        }
    }
}

// ✅ Handle Login
function handleLogin() {
    let username = document.getElementById("login-username")?.value.trim();
    let password = document.getElementById("login-password")?.value.trim();
    let errorBox = document.querySelector(".login-error");

    if (!username || !password) {
        if (errorBox) {
            errorBox.textContent = "All fields are required!";
            errorBox.style.display = "block";
        }
        return;
    }

    // Dummy User Check
    let fakeUser = { username: "user", password: "123456" };
    if (username === fakeUser.username && password === fakeUser.password) {
        alert("Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";
    } else if (errorBox) {
        errorBox.textContent = "Invalid username or password!";
        errorBox.style.display = "block";
    }
}

// ✅ Chatbox Toggle & Messaging
function toggleChat() {
    let chatBox = document.getElementById("chatBox");
    if (chatBox) {
        chatBox.style.display = chatBox.style.display === "none" || chatBox.style.display === "" ? "block" : "none";
    }
}

function sendMessage() {
    let inputField = document.getElementById("chatInput");
    let chatMessages = document.getElementById("chatMessages");

    if (inputField && chatMessages) {
        let message = inputField.value.trim();
        if (message) {
            let userMessage = document.createElement("div");
            userMessage.classList.add("message", "user-message");
            userMessage.textContent = "You: " + message;
            chatMessages.appendChild(userMessage);

            setTimeout(() => {
                let botMessage = document.createElement("div");
                botMessage.classList.add("message", "bot-message");
                botMessage.textContent = "Bot: Hello! How can I help you?";
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

            inputField.value = "";
        }
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// ✅ Typing Effect for Hero Text
const text = "Elevate Your Game";
let index = 0;
const speed = 100;

function typeEffect() {
    let heroText = document.getElementById("hero-text");
    if (heroText && index < text.length) {
        heroText.innerHTML = text.substring(0, index + 1);
        index++;
        setTimeout(typeEffect, speed);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);
