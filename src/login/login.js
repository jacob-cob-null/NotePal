import '../style.css';
import { loginWithEmail } from '../Firebase/auth';

// Elements
const submitBtn = document.getElementById('submit');
const signin = document.getElementById('signin');
const header = document.getElementById('header');

//change to sign in
signin.addEventListener('click', () => {
  updateHeader('Sign In');
  addForm();
});


function updateHeader(text) {
  header.innerHTML = '';
  const h = document.createElement('div');
  h.textContent = text;
  h.className = 'text-6xl font-bold font-head mb-4';
  header.classList.add('p-12','gap-2');
  header.appendChild(h);
}
function addForm() {
  const form = document.createElement('div');
  form.innerHTML = `
    <form class="flex flex-col w-full max-w-sm justify-center gap-4" id="login-form">
      <label class="text-xl font-body" for="email">Username</label>
      <input class="bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95"
             type="email" placeholder="Type your email" id="email" name="email" required />

      <label class="text-xl font-body" for="password">Password</label>
      <input class=" h-12 w-90 bg-gray-100 p-2 border-2 border-gray-300 rounded-[10px] hover:brightness-95"
             type="password" placeholder="Type your password" id="password" name="password" required />

      <button id="submit" class="bg-white outline-1 rounded-[10px] shadow-md h-12 mb-5 hover:brightness-95 transition">
        Sign In
      </button>
    </form>
    <h2 class="mt-2">New to NotePal? <span id="register">Register Here </span></h2>
  `;
  header.appendChild(form);
  submitElement()

}
function submitElement() {
  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await loginWithEmail(email, password);
      alert('Logged in!');
      window.location.href = '../dashboard/dashboard.html';
    } catch (err) {
      alert(`Login failed: ${err.message}`);
    }
  });
}