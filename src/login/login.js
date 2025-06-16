import '../style.css';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/setup.js'; // ✅ Import the auth instance

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = '../dashboard/dashboard.html';
      alert('Logged in!');
    })
    .catch((error) => {
      alert(`Login failed: ${error.message}`);
    });
});

//create account
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
