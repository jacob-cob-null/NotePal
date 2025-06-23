import '../style.css';
import { loginWithEmail, createAccount } from '../Firebase/auth';

// Elements
const submitBtn = document.getElementById('submit');
const signin = document.getElementById('signin');
const header = document.getElementById('header');
const register = document.getElementById('register');

//change to sign in
signin.addEventListener('click', () => {
  updateHeader('Sign In');
  addForm('Sign In');
  submitElement(loginWithEmail, 'Successfuly Signed In');
  updateAuthTip(false)
});
//change to registration
register.addEventListener('click', () => {
  updateHeader('Create Account');
  addForm('Register Account');
  submitElement(createAccount, 'Account Created Successfuly');
  updateAuthTip(true);
});

function updateHeader(text) {
  header.innerHTML = '';
  const h = document.createElement('div');
  h.textContent = text;
  h.className = 'text-5xl font-bold font-head mb-4  motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-blur-in-[10px]';
  header.classList.add('p-12', 'gap-2');
  header.appendChild(h);
}
function addForm(btnName) {
  const form = document.createElement('div');
  form.innerHTML = `
    <form class="flex flex-col w-full max-w-sm justify-center gap-4" id="login-form">
      <label class="text-xl font-body" for="email">Username</label>
      <input class="bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95"
             type="email" placeholder="Type your email" id="email" name="email" required />

      <label class="text-xl font-body" for="password">Password</label>
      <input class=" h-12 w-90 bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95"
             type="password" placeholder="Type your password" id="password" name="password" required />

      <button id="submit" class="bg-white outline-1 rounded-[10px] shadow-md h-12 mb-5 hover:brightness-95 active:scale-95 active:translate-y-[2px] transition">
        ${btnName}
      </button>
    </form>
   
  `;
  header.appendChild(form);

}
//takes login or register method as param
function submitElement(callback, msg) {
  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const user = await callback(email, password); //returns user
      userStore.setUser(user)
      alert(`${msg}, Welcome ${user.uid}`);
      window.location.href = '../dashboard/dashboard.html';
    } catch (err) {
      alert(`Login failed: ${err.message}`);
    }
  });
}
//set and get user
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
  return { setUser, getUser }

})();


function updateAuthTip(isRegistering) {
  const prompt = document.createElement('h2');
  prompt.className = 'mt-2';

  const isLogin = !isRegistering;
  const actionText = isLogin ? 'Register here' : 'Sign in here';
  const toggleId = isLogin ? 'register' : 'signin';
  const message = isLogin
    ? 'New to NotePal?'
    : 'Already have an account?';

  prompt.innerHTML = `${message} <span id="${toggleId}" class="text-orange-600 cursor-pointer">${actionText}</span>`;
  header.append(prompt);

  // Set listener
  document.getElementById(toggleId)?.addEventListener('click', () => {
    const isNowRegistering = isLogin;
    updateHeader(isNowRegistering ? 'Create Account' : 'Sign In');
    addForm(isNowRegistering ? 'Register Account' : 'Sign In');
    submitElement(
      isNowRegistering ? createAccount : loginWithEmail,
      isNowRegistering ? 'Account Created Successfully' : 'Successfully Signed In'
    );
    updateAuthTip(isNowRegistering);
  });
}
