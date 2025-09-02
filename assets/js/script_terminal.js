const loginScreen = document.getElementById('loginScreen');
const terminal = document.getElementById('terminal');

const wishes = [
  "Achievement Unlocked: INF.03 Master",
  "Dziękujemy za cierpliwość i empatię do wszystkich uczniów,",
  "za wyrozumiałość w każdej trudnej sytuacji,",
  "za przepracowane godziny na tłumaczeniu nam tajników programowania,",
  "za cierpliwe poprawianie niezliczonych linijek kodu,",
  "oraz za przygotowanie nas do egzaminu INF.03.",
  "Odblokowane po latach nauki, niezliczonych błędach i niekończącej się kawie!"
];

const errorResponses = [
  "Error: Command not found",
  "Warning: Syntax invalid",
  "Error: INF.03 module missing",
  "Alert: Coffee required"
];

let currentWish = 0;



// Animacja jednej linii (prompt + tekst)
function typeLine(text, callback) {
  const lineDiv = document.createElement('div');
  lineDiv.classList.add('line');
  terminal.appendChild(lineDiv);

  const promptSpan = document.createElement('span');
  promptSpan.classList.add('prompt');
  promptSpan.textContent = "C:\\Users\\TopStudents> ";
  lineDiv.appendChild(promptSpan);

  const textSpan = document.createElement('span');
  lineDiv.appendChild(textSpan);

  let i = 0;
  function typeChar() {
    if(i < text.length) {
      textSpan.textContent += text[i];
      i++;
      setTimeout(typeChar, 50);
    } else {
      if(callback) callback();
    }
  }
  typeChar();
}

// Wyświetlanie życzeń po kolei
function typeWishes() {
  if(currentWish < wishes.length) {
    typeLine(wishes[currentWish], () => {
      currentWish++;
      typeWishes();
    });
  } else {
    showGUIError();
  }
}

// Komunikat błędu GUI po życzeniach
function showGUIError() {
  const errorLine = document.createElement('div');
  errorLine.classList.add('line', 'error');
  errorLine.textContent = "Błąd z załadowaniem GUI, obecnie nie jesteśmy w stanie przywrócić graficznej szaty systemu";
  terminal.appendChild(errorLine);

  setTimeout(startInteractive, 500);
}

// Interaktywny terminal
function startInteractive() {
  const lineDiv = document.createElement('div');
  lineDiv.classList.add('line');
  terminal.appendChild(lineDiv);

  const promptSpan = document.createElement('span');
  promptSpan.classList.add('prompt');
  promptSpan.textContent = "C:\\Users\\Class4TI> ";
  lineDiv.appendChild(promptSpan);

  const textSpan = document.createElement('span');
  lineDiv.appendChild(textSpan);

  let userInput = "";
  document.addEventListener('keydown', function handler(e) {
    if(e.key.length === 1) {
      userInput += e.key;
      textSpan.textContent = userInput;
    } else if(e.key === "Backspace") {
      userInput = userInput.slice(0, -1);
      textSpan.textContent = userInput;
    } else if(e.key === "Enter") {
      document.removeEventListener('keydown', handler);

      // Błąd pod spodem w czerwonym kolorze
      const errorLine = document.createElement('div');
      errorLine.classList.add('line', 'error');
      const errorSpan = document.createElement('span');
      errorSpan.textContent = errorResponses[Math.floor(Math.random() * errorResponses.length)];
      errorLine.appendChild(errorSpan);
      terminal.appendChild(errorLine);

      startInteractive();
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
}