// ✅ Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// ✅ Ensure Firebase Auth Persistence (Keeps user logged in)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log("Persistence set to LOCAL"))
    .catch(error => console.error("Error setting persistence:", error));

// ✅ Dashboard Authentication Check
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("dashboard.html")) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("User is logged in:", user);
                document.getElementById("profileName").textContent = user.displayName || "User";
                document.getElementById("profileEmail").textContent = user.email;
                document.getElementById("profilePic").src = user.photoURL || "default-pic.jpg";
            } else {
                console.log("No user logged in. Redirecting...");
                alert("You must be logged in to access the dashboard!");
                window.location.href = "login.html";
            }
        });
    }
});

// ✅ Handle Login
function handleLogin() {
    let email = document.getElementById("login-email")?.value.trim();
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
        .then(userCredential => {
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            if (errorBox) {
                errorBox.textContent = "Invalid email or password!";
                errorBox.style.display = "block";
            }
        });
}

// ✅ Handle Logout
function handleLogout() {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html";
    }).catch(error => console.error("Logout error:", error));
}

// ✅ Update Profile
function editProfile() {
    let user = firebase.auth().currentUser;
    if (!user) return alert("You must be logged in!");

    let newName = prompt("Enter your new name:", user.displayName || "User");
    let newEmail = prompt("Enter your new email:", user.email || "email@example.com");

    if (newName || newEmail) {
        user.updateProfile({ displayName: newName }).then(() => {
            document.getElementById("profileName").textContent = newName;
            alert("Profile updated!");
        }).catch(error => console.error("Profile update error:", error));

        user.updateEmail(newEmail).then(() => {
            document.getElementById("profileEmail").textContent = newEmail;
            alert("Email updated!");
        }).catch(error => console.error("Email update error:", error));
    }
}

// ✅ Update Profile Picture
function updateProfilePic(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let profilePic = document.getElementById("profilePic");
            if (profilePic) {
                profilePic.src = e.target.result;
                firebase.auth().currentUser.updateProfile({ photoURL: e.target.result })
                    .then(() => console.log("Profile picture updated!"))
                    .catch(error => console.error("Profile pic update error:", error));
            }
        };
        reader.readAsDataURL(file);
    }
}

// ✅ Smooth Scroll to Sports Section
function scrollToSection() {
    let sportsSection = document.querySelector("#sports");
    if (sportsSection) {
        sportsSection.scrollIntoView({ behavior: "smooth" });
    }
}

// ✅ Sticky Navigation Bar
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "#222";
            nav.style.transition = "0.3s";
        } else {
            nav.style.backgroundColor = "transparent";
        }
    }
});

// ✅ Mobile Navigation Toggle
let menuTimeout;
function toggleMenu() {
    let navLinks = document.getElementById("nav-links");
    if (navLinks) {
        if (navLinks.style.display === "block") {
            navLinks.style.display = "none";
            clearTimeout(menuTimeout);
        } else {
            navLinks.style.display = "block";
            menuTimeout = setTimeout(() => {
                navLinks.style.display = "none";
            }, 7000);
        }
    }
}

// ✅ Chatbox Functionality
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
