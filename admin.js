const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const passwordInput = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');
const messagesContainer = document.getElementById('messages-container');

const ADMIN_PASSWORD = "letmein"; 

loginBtn.addEventListener('click', () => {
  if (passwordInput.value === ADMIN_PASSWORD) {
    loginScreen.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    loadMessages();
  } else {
    loginError.textContent = "Incorrect password.";
  }
});

logoutBtn.addEventListener('click', () => {
  adminPanel.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  passwordInput.value = "";
  loginError.textContent = "";
});

function loadMessages() {
  messagesContainer.innerHTML = "";
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  if (messages.length === 0) {
    messagesContainer.innerHTML = "<p>No messages found.</p>";
    return;
  }

  messages.forEach((msg, i) => {
    const card = document.createElement('div');
    card.classList.add('message-card');
    card.innerHTML = `
      <h3>${msg.name} <small>(${msg.email})</small></h3>
      <p>${msg.message}</p>
      <span class="date">${msg.date}</span>
      <button onclick="deleteMessage(${i})">Delete</button>
    `;
    messagesContainer.appendChild(card);
  });
}

function deleteMessage(index) {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.splice(index, 1);
  localStorage.setItem('messages', JSON.stringify(messages));
  loadMessages();
}
