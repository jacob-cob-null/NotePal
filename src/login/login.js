// src/auth/auth.js (This is the main UI/login page logic file)

import '../style.css'; // Correct place for stylesheet import
import { loginWithEmail, createAccount } from '../Firebase/auth'; // auth.js is the Firebase logic file
import { successfulLogin, successfulRegistration, failedLogin, msgAlert } from '../dashboard/events/alerts'; // Assuming these are correct paths and functions
import { auth } from '../Firebase/setup'; // Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth'; // Prefer importing from 'firebase/auth' directly for modular SDK consistency

// --- DOMContentLoaded listener and event setup ---
document.addEventListener('DOMContentLoaded', () => {
  const signin = document.getElementById('signin');
  const register = document.getElementById('register');
  const loginIcon = document.getElementById('loginIcon');

  // Check auth status on page load
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('User is signed in:', user.uid);

    } else {
      console.log('User is signed out.');
    }
  });
  //true means 'isRegistering' false is 'login"
  // Add listener for Sign In button
  if (signin) {
    signin.addEventListener('click', () => {
      updateHeader('Welcome to NotePal');
      addForm('Sign In');
      submitElement(loginWithEmail);
      updateAuthTip(false);
    });
  }

  // Add listener for Register button
  if (register) {
    register.addEventListener('click', () => {
      updateHeader('Create Account');
      addForm('Register Account');
      submitElement(createAccount);
      updateAuthTip(true);
    });
  }
});

/**
 * Updates the main header text and styling.
 * @param {string} text - The text to display in the header.
 */
function updateHeader(text) {
  const header = document.getElementById('header');
  if (!header) return;

  header.innerHTML = '';
  header.className = 'p-6 sm:p-12 gap-4 flex flex-col items-center justify-center';

  const h = document.createElement('h1');
  h.textContent = text;
  h.className = 'text-3xl sm:text-5xl font-bold font-head motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-blur-in-[10px] mb-6';

  header.appendChild(h);
}

/**
 * Adds a responsive, styled login/register form to the header.
 * @param {string} btnName - The text for the submit button (e.g., 'Sign In', 'Register Account').
 */
function addForm(btnName) {
  const header = document.getElementById('header');
  const loginIcon = document.getElementById('loginIcon');
  if (!header || !loginIcon) return;

  loginIcon.classList.add('hidden');

  // Clear header completely (including old forms and wrappers)
  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }

  const heading = document.createElement('h1');
  heading.textContent = btnName === 'Sign In' ? 'Welcome Back!' : 'Register Here';
  heading.className =
    'text-3xl sm:text-5xl font-bold font-head motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-blur-in-[10px] mb-6';
  header.appendChild(heading);

  const formWrapper = document.createElement('div');
  formWrapper.className =
    'w-full sm:w-[400px] flex flex-col justify-center items-center';

  // --- MODIFIED HTML INJECTION for displayName and userBio ---
  let extraInputs = '';
  if (btnName === 'Register Account') { // Only show these fields for registration
    extraInputs = `
      <div class="flex flex-col w-full">
        <label for="displayName" class="text-base sm:text-lg font-medium">Display Name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          required
          placeholder="Your display name"
          class="bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95 text-sm sm:text-base"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="userBio" class="text-base sm:text-lg font-medium">Short Bio (Optional)</label>
        <textarea
          id="userBio"
          name="userBio"
          placeholder="Tell us a little about yourself"
          class="bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95 text-sm sm:text-base h-20"
        ></textarea>
      </div>
    `;
  }
  // --- End of MODIFIED HTML INJECTION ---

  formWrapper.innerHTML = `
    <form class="flex flex-col gap-4 w-full font-body" id="login-form">
      ${extraInputs}  <!-- Dynamically inject extra inputs here -->

      <div class="flex flex-col w-full">
        <label for="email" class="text-base sm:text-lg font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Type your email"
          class="bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95 text-sm sm:text-base"
        />
      </div>

      <div class="flex flex-col">
        <label for="password" class="text-base sm:text-lg font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Type your password"
          class="bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95 text-sm sm:text-base w-full"
        />
      </div>

      <button
        id="submit"
        class="button h-[50px] w-full bg-white dark-hover-active outline-1 outline-gray-300 rounded-[10px] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span class="text-black text-xl font-body">${btnName}</span>
      </button>
    </form>
  `;

  header.appendChild(formWrapper);
}

/**
 * Handles form submission based on the provided callback function (login or register).
 * @param {Function} callback - The function to call (loginWithEmail or createAccount).
 */
function submitElement(callback) {
  const submitBtn = document.getElementById('submit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    let user;
    try {
      if (callback === createAccount) { // If it's the createAccount function
        // --- NEW: Retrieve displayName and userBio for registration ---
        const displayName = document.getElementById('displayName')?.value || '';
        const userBio = document.getElementById('userBio')?.value || '';
        console.log("Attempting to create account with:", email, password, displayName, userBio);
        user = await callback(email, password, displayName, userBio); // Pass additional arguments
        successfulRegistration(user.uid); // Assuming you have a successfulRegistration alert
      } else { // It's loginWithEmail
        user = await callback(email, password);
      }

      userStore.setUser(user);
      let userId = user.uid;
      console.log(userStore.getUser());
      successfulLogin(userId); // Use your successfulLogin alert/UI update
      setTimeout(() => {
        window.location.href = '../dashboard/dashboard.html';
      }, "1500");

    } catch (err) {
      failedLogin(err); // Use your failedLogin alert/UI update
    }
  });
}

/**
 * Dynamically updates the prompt tip below the form (e.g., "New to NotePal? Register Here").
 * @param {boolean} isRegistering - True if the current form is registration, false for login.
 */
function updateAuthTip(isRegistering) {
  const header = document.getElementById('header');
  if (!header) return;

  const prompt = document.createElement('h2');
  prompt.className = 'mt-2 flex gap-1';

  const isLogin = !isRegistering;
  const actionText = isLogin ? 'Register Here' : 'Sign in here';
  const toggleId = isLogin ? 'register' : 'signin';
  const message = isLogin ? 'New to NotePal?' : 'Already have an account?';

  prompt.innerHTML = `${message} <div id="${toggleId}" class="text-orange-600 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95">${actionText}</div>`;
  header.append(prompt);

  // Reattach event listener to new dynamic toggle link
  document.getElementById(toggleId)?.addEventListener('click', () => {
    const isNowRegistering = isLogin;
    updateHeader(isNowRegistering ? 'Create Account' : 'Welcome to NotePal');
    addForm(isNowRegistering ? 'Register Account' : 'Sign In');
    submitElement(isNowRegistering ? createAccount : loginWithEmail);
    updateAuthTip(isNowRegistering);
  });
}

// Auth state store (client-side session management for UID)
export const userStore = (() => {
  let user = null;

  function setUser(userCredential) {
    user = userCredential;
    sessionStorage.setItem('userUID', userCredential.uid);
  }

  function getUser() {
    // Attempt to retrieve user from session storage if not already loaded
    if (!user) {
      const uid = sessionStorage.getItem('userUID');
      if (uid) {
        user = { uid };
      }
    }
    return user;
  }

  return { setUser, getUser };
})();
