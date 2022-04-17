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
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import firebaseConfig from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbRef = ref(getDatabase());

const keys = document.querySelectorAll(".key");
const whites = document.querySelectorAll(".key.white");
const blacks = document.querySelectorAll(".key.black");

let user = null;
let timerVar;
let totalSeconds = 0;
let recordings = {};
let numberOfRecordings = 0;
let totalSecondsFromInit = 0;
let timerRunning = false;

onAuthStateChanged(auth, (userData) => {
  if (userData) {
    user = userData;
    console.log(user);
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("logout").style.display = "content";
    document.getElementById("userName").innerText = user.displayName;

    get(child(dbRef, "users/" + user.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          numberOfRecordings = snapshot.val().numberOfRecordings;
          recordings = snapshot.val().recordings;
          totalSecondsFromInit = snapshot.val().totalSecondsFromInit;
          updateoverallTimerDisplay(totalSecondsFromInit);
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // User is signed out
    document.getElementById("login").style.display = "content";
    document.getElementById("signup").style.display = "content";
    document.getElementById("logout").style.display = "none";
    console.log("sign in a user");
  }
});

function updateRecordings(title, recordFile) {
  set(child(dbRef, "users/" + user.uid + "/recordings/" + title), recordFile);
}

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

document.getElementById("startTimer").addEventListener("click", function () {
  if (!timerRunning) {
    timerRunning = true;
    clearInterval(timerVar);
    timerVar = setInterval(countTimer, 1000);
    function countTimer() {
      ++totalSeconds;
      var hour = Math.floor(totalSeconds / 3600);
      var minute = Math.floor((totalSeconds - hour * 3600) / 60);
      var seconds = totalSeconds - (hour * 3600 + minute * 60);
      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      if (seconds < 10) seconds = "0" + seconds;
      document.getElementById("timer").innerHTML =
        hour + ":" + minute + ":" + seconds;
    }
  }
});

document.getElementById("pauseTimer").addEventListener("click", function () {
  if (timerRunning) {
    clearInterval(timerVar);
    document.getElementById("startTimer").innerText = "Resume Timer";
    timerRunning = false;
  }
});

function updateoverallTimerDisplay(totalSecondsValue) {
  var hour = Math.floor(totalSecondsValue / 3600);
  var minute = Math.floor((totalSecondsValue - hour * 3600) / 60);
  var seconds = totalSecondsValue - (hour * 3600 + minute * 60);
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (seconds < 10) seconds = "0" + seconds;
  document.getElementById("overallTimer").innerHTML =
    hour + ":" + minute + ":" + seconds;
}

document.getElementById("stopTimer").addEventListener("click", function () {
  clearInterval(timerVar);
  totalSecondsFromInit += totalSeconds;

  updateoverallTimerDisplay(totalSecondsFromInit);
  if (user) {
    set(
      child(dbRef, "users/" + user.uid + "/totalSecondsFromInit"),
      totalSecondsFromInit
    );
  }
  totalSeconds = 0;
  timerRunning = false;
  document.getElementById("timer").innerHTML = "00:00:00";
  document.getElementById("startTimer").innerText = "Start Timer";
});
