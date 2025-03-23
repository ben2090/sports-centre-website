// ✅ Firebase Configuration (Ensure this is also in your HTML file)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Ensure User Login Persistence
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// ✅ Smooth Scroll to Sports Section
function scrollToSection() {
    let sportsSection = document.querySelector("#sports");
    if (sportsSection) {
        sportsSection.scrollIntoView({ behavior: "smooth" });
    }
}

// ✅ Sticky Navigation Bar on Scroll
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

// ✅ Ensure DOM is Loaded Before Running Scripts
document.addEventListener("DOMContentLoaded", () => {
    // ✅ Set Current Year in Footer
    let yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // ✅ Protect Dashboard: Redirect if Not Logged In
    if (window.location.pathname.includes("dashboard.html")) {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                alert("You must be logged in to access the dashboard!");
                window.location.href = "login.html";
            } else {
                // ✅ Load User Data in Dashboard
                document.getElementById("profileName").textContent = user.displayName || "User";
                document.getElementById("profileEmail").textContent = user.email;
                document.getElementById("profilePic").src = user.photoURL || "default-pic.jpg";
            }
        });
    }

    // ✅ Ensure Logout Button Works
    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            firebase.auth().signOut().then(() => {
                alert("Logged out successfully!");
                window.location.href = "login.html";
            }).catch((error) => {
                alert("Error logging out: " + error.message);
            });
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
});

// ✅ Handle Firebase Login
function handleLogin() {
    let email = document.getElementById("login-username")?.value.trim();
    let password = document.getElementById("login-password")?.value.trim();
    let errorBox = document.querySelector(".login-error");

    if (!email || !password) {
        if (errorBox) {
            errorBox.textContent = "All fields are required!";
            errorBox.style.display = "block";
        }
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            if (errorBox) {
                errorBox.textContent = error.message;
                errorBox.style.display = "block";
            }
        });
}

// ✅ Function to Enable Profile Editing
function editProfile() {
    let nameElement = document.getElementById("profileName");
    let emailElement = document.getElementById("profileEmail");

    if (nameElement && emailElement) {
        let newName = prompt("Enter your new name:", nameElement.textContent);
        let newEmail = prompt("Enter your new email:", emailElement.textContent);

        if (newName) {
            nameElement.textContent = newName;
            firebase.auth().currentUser.updateProfile({ displayName: newName });
        }
        if (newEmail) {
            firebase.auth().currentUser.updateEmail(newEmail).catch(error => alert(error.message));
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
                firebase.auth().currentUser.updateProfile({ photoURL: e.target.result });
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
