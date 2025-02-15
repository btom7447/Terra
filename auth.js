// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBXAhMsce2d5bIobO2s0-P4dpXZhxOF0E0",
    authDomain: "terra-7447.firebaseapp.com",
    projectId: "terra-7447",
    storageBucket: "terra-7447.firebasestorage.app",
    messagingSenderId: "946572207590",
    appId: "1:946572207590:web:1317787dbde09e8f38e227",
    measurementId: "G-24TXS2KPYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Redirect Logic Based on LocalStorage
const currentPage = window.location.pathname;
const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn) {
    // If user is logged in and on index.html, redirect to admin.html
    if (currentPage.endsWith("index.html")) {
        window.location.href = "admin.html";
    }
} 
// else {
//     // If user is not logged in and not on index.html, redirect to index.html
//     if (!currentPage.endsWith("index.html")) {
//         window.location.href = "index.html";
//     }
// }

// Listen for Authentication State Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userDetails = { uid: user.uid, email: user.email };
        localStorage.setItem("loggedIn", JSON.stringify(userDetails)); // Save user details to localStorage
    } else {
        localStorage.removeItem("loggedIn"); // Clear localStorage if user is not logged in
    }
});

// Login functionality
const loginButton = document.getElementById("login-button");
if (loginButton) {
    loginButton.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDetails = {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            };
            localStorage.setItem("loggedIn", JSON.stringify(userDetails)); // Save user details to localStorage
            alert("Login successful!");
            window.location.href = "admin.html"; // Redirect to admin.html
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message);
        }
    });
}

// Sign-Up functionality
const signupButton = document.getElementById("signup-button");
if (signupButton) {
    signupButton.addEventListener("click", async () => {
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDetails = {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            };
            localStorage.setItem("loggedIn", JSON.stringify(userDetails)); // Save user details to localStorage
            alert("Sign-up successful! You are now logged in.");
            window.location.href = "admin.html"; // Redirect to admin.html
        } catch (error) {
            console.error("Sign-up error:", error);
            alert(error.message);
        }
    });
}

// Logout functionality
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await signOut(auth); // Firebase sign-out
            localStorage.removeItem("loggedIn"); // Clear localStorage
            alert("You have logged out.");
            window.location.href = "index.html"; // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    });
}
