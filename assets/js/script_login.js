const correctUsername = "a.mendyk";
const correctPassword = "INF.03";

// Obsługa logowania
document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if(username === correctUsername && password === correctPassword) {
    loginScreen.style.display = 'none';
    terminal.style.display = 'block';

    // --- tutaj tło zmienia się na czarne ---
    document.body.style.background = "#000";

    typeWishes();
  } else {
    alert('Niepoprawny login lub hasło!');
  }
});