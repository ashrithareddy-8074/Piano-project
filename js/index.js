const keys = document.querySelectorAll(".key");
const whites = document.querySelectorAll(".key.white");
const blacks = document.querySelectorAll(".key.black");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import firebaseConfig from "./config.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("sign in a user")
  }
});

document.getElementById("logout").addEventListener("click", () => {
  let confirmAction = confirm("Are you sure you want to log out?");
  console.log(confirmAction);
  if (confirmAction) {
    console.log(auth.signOut);
    auth.signOut().then(() => {
      console.log("user logged out");
    });
    console.log("clear local session storage");
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
//     setTimeout(()=>
//     {
//         key.classList.remove("mouseon")
//     },100)
// }
let point = (key) => {
  // key.classList.add("mouseoutt");
  key.classList.remove("mouseon");
};
keys.forEach((key) => {
  key.addEventListener("mouseover", () => colour(key));
  key.addEventListener("mouseout", () => point(key));
  key.addEventListener("click", () => playsound(key));
});
