import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set ,ref} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import firebaseConfig from "./config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
document.getElementById("submit").addEventListener("click", function () {
  event.preventDefault();
  console.log("clicked test");
  checkpassword();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log("created");
      // setTimeout(function() {
      //  document.getElementById("final").style.visibility="visible";
      //  console.log("testing")
      // }, 3000);
    }).then(()=>{
      window.location.assign('index.html')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode + errorMessage);
    });
});

// document.getElementById("conpassword").addEventListener("click", function()
// {
//   checkpassword();
// });
// const con=document.getElementById("conpassword");
// conpassword.addEventListener("mouseup", function(){
//   checkpassword();
// });
function checkpassword()
{
  let passwordd=document.getElementById("password").value;
  let conpasswordd=document.getElementById("conpassword").value;
  console.log(passwordd, conpasswordd);
  let message=document.getElementById("message");
  if (passwordd.length!=0)
  {
    if (passwordd==conpasswordd)
    {
      message.textContent="passwords match";
      message.style.backgroundColor="#3ae374";
    }
    else
    {
      message.textContent="passwords don't match";
      message.style.backgroundColor="#ff4d4d";
      message.style.width="200px";
    }
  }
  else
  {
    alert("password cannot be empty");
    message.textContent="";
  }
}
const database=getDatabase();
document.getElementById("submit").addEventListener('click', ()=>
{
  var firstName=document.getElementById('firstName').value;
  var lastName=document.getElementById('lastName').value;
  var email=document.getElementById('email').value;
  const userId= push(child(ref(database), 'users')).key;
  set(ref(database, 'users/'+ userId),
  {
    firstName: firstName,
    lastName: lastName,
    email:email
  });
});   
