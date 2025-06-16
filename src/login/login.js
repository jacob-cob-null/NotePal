import '../style.css';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/setup.js'; // ✅ Import the auth instance

const submitBtn = document.getElementById('submit');

//TO DO:::: refactor and transfer to auth.js
//TO DO:::: add create account logic
//TO DO:::: add dynamic content for sign up and registration function

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
