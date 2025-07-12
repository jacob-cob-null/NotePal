import '../style.css';
import { loginWithEmail, createAccount } from '../Firebase/auth';
import { successfulLogin, successfulRegistration, failedLogin, msgAlert } from '../dashboard/events/alerts';
import { auth } from '../Firebase/setup';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';


document.addEventListener('DOMContentLoaded', () => {
  const signin = document.getElementById('signin');
  const header = document.getElementById('header');
  const register = document.getElementById('register');
  const loginIcon = document.getElementById('loginIcon')

  //check auth status
  onAuthStateChanged(auth, user => {
    if (user) {


    } else {

    }
  });

  // Add listener for Sign In
  if (signin) {
    signin.addEventListener('click', () => {
      updateHeader('Welcome to NotePal');
      addForm('Sign In');
      submitElement(loginWithEmail);
      updateAuthTip(false);
    });

  }

  // Add listener for Register
  if (register) {
    register.addEventListener('click', () => {
      updateHeader('Create Account');
      addForm('Register Account');
      submitElement(createAccount);
      updateAuthTip(true);
    });
  }
});
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

// Add a responsive, styled login/register form
function addForm(btnName) {
  const header = document.getElementById('header');
  const loginIcon = document.getElementById('loginIcon');
  if (!header || !loginIcon) return;

  loginIcon.classList.add('hidden');

  // 🔥 Clear header completely (including old forms and wrappers)
  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }

  // Add heading again (optional if using updateHeader separately)
  const heading = document.createElement('h1');
  heading.textContent = btnName === 'Sign In' ? 'Welcome Back!' : 'Register Here';
  heading.className =
    'text-3xl sm:text-5xl font-bold font-head motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-blur-in-[10px] mb-6';
  header.appendChild(heading);

  // Consistent form wrapper
  const formWrapper = document.createElement('div');
  formWrapper.className =
    'w-full sm:w-[400px] flex flex-col justify-center items-center';

  formWrapper.innerHTML = `
    <form class="flex flex-col gap-4 w-full font-body" id="login-form">
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
// Handles submit based on login or register
function submitElement(callback) {
  const submitBtn = document.getElementById('submit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    try {
      const user = await callback(email, password);
      userStore.setUser(user);
      let userId = user.uid;
      console.log(userStore.getUser());
      // alert(`${msg}, Welcome ${user.uid}`);
      successfulLogin(userId);
      setTimeout(() => {
        window.location.href = '../dashboard/dashboard.html';
      }, "1500");


    } catch (err) {
      failedLogin(err)
      // alert(`Login failed: ${err.message}`);
    }
  });
}

// Dynamically updates the prompt tip below the form
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

  // Reattach event listener to new dynamic toggle
  document.getElementById(toggleId)?.addEventListener('click', () => {
    const isNowRegistering = isLogin;
    updateHeader(isNowRegistering ? 'Register Account' : 'Sign In');
    addForm(isNowRegistering ? 'Register Account' : 'Sign In');
    submitElement(
      isNowRegistering ? createAccount : loginWithEmail,
      isNowRegistering
        ? 'Account Created Successfully'
        : 'Successfully Signed In'
    );
    updateAuthTip(isNowRegistering);
  });
}

// Auth state store
export const userStore = (() => {
  let user = null;

  function setUser(userCredential) {
    user = userCredential;
    sessionStorage.setItem('userUID', userCredential.uid);
  }

  function getUser() {
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
