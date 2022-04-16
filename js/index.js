const keys = document.querySelectorAll(".key");
const whites = document.querySelectorAll(".key.white");
const blacks = document.querySelectorAll(".key.black");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import firebaseConfig from "./config.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let user = null

onAuthStateChanged(auth, (user) => {
  if (userData) {
    user = userData;
    console.log(user);
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("logout").style.display = "content";
    // ...
  } else {
    // User is signed out
    document.getElementById("login").style.display = "content";
    document.getElementById("signup").style.display = "content";
    document.getElementById("logout").style.display = "none";
    console.log("sign in a user");
  }
});

document.getElementById("logout").addEventListener("click", () => {
  let confirmAction = confirm("Are you sure you want to log out?");
  console.log(confirmAction);
  if (confirmAction) {
    console.log(auth.signOut);
    auth.signOut().then(() => {
      window.location.reload();
    });
  }
});

let playsound = (key) => {
  const notesound = document.getElementById(key.dataset.note);
  notesound.currentTime = 0;
  console.log(notesound);
  notesound.play();
  key.classList.add("active");
  // notesound.addEventListener('ended', () => {
  //     key.classList.remove("active")
  // })
  setTimeout(() => {
    key.classList.remove("active");
  }, 400);
  key.classList.remove("mouseon");
};

let colour = (key) => {
  key.classList.add("mouseon");
};

let point = (key) => {
  // key.classList.add("mouseoutt");
  key.classList.remove("mouseon");
};

keys.forEach((key) => {
  key.addEventListener("mouseover", () => colour(key));
  key.addEventListener("mouseout", () => point(key));
  key.addEventListener("click", () => playsound(key));
});
