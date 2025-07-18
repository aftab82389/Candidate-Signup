const username =document.querySelector('#Username');
const rollno =document.querySelector('#rollno');
const paasKey= document.querySelector('#passKey');
const btn=document.querySelector('.submit');
rollno.addEventListener('input', () => {
  limitLength(rollno, 11);
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcugiZPZnlZ9XqRW4snTbjp-_hak1BOqY",
  authDomain: "farewell-register.firebaseapp.com",
  databaseURL: "https://farewell-register-default-rtdb.firebaseio.com",
  projectId: "farewell-register",
  storageBucket: "farewell-register.appspot.com",
  messagingSenderId: "1000923768561",
  appId: "1:1000923768561:web:5c050e34af2de143b42b50"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

function setData() {
  set(ref(db, "Students/" + rollno.value.trim()), {
    Name: username.value.trim(),
    Rollno:rollno.value.trim(),
    Passkey:passKey.value.trim()
  });
  alert("Thank you for Registration ❣️");
  username.value = "";
  rollno.value = "";
  passKey.value = "";
}

function checkPhoneExists(rollno, callback) {
  const dataRef = ref(db, "Students/" + rollno);
  onValue(dataRef, (snapshot) => {
    callback(snapshot.exists());
  }, { onlyOnce: true });
}

btn.addEventListener('click', () => {
  if (username.value && rollno.value && passKey.value) {
    if (rollno.value.length == 11) {
      checkPhoneExists(rollno.value.trim(), (exists) => {
        if (exists) {
          alert("roll number already registered!");
        } else {
          setData();
        }
      });
    }
    else {
      alert("Enter valid rollno")
    }
  }
  else {
    alert("Please fill complete field");
  }
});
