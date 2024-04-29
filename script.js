// Elements
const keyboardElement = document.querySelector(".keyboard");
const guessesTextElement = document.querySelector(".guesses-text b");
const wordDisplayedElement = document.querySelector(".word-display");
const hangmanImageElement = document.querySelector(".hangman-box img");
const modalElement = document.querySelector(".game-modal");
const replayButtonElement = document.querySelector(".play-again");

let currentWord, wrongGuessCount, correctLetters;

const maxGuesses = 6;

const resetGame = () => {
  wrongGuessCount = 0;
  correctLetters = [];
  hangmanImageElement.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesTextElement.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardElement.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
  wordDisplayedElement.innerHTML = currentWord
    .split("")
    .map(() => {
      return `<li class="letter"></li>`;
    })
    .join("");
  modalElement.classList.remove("displayed");
};

// Création du clavier et ajout d'écouteur
for (let i = 97; i <= 122; i++) {
  const keyboardButtonElement = document.createElement("button");
  keyboardButtonElement.innerText = String.fromCharCode(i);
  keyboardElement.appendChild(keyboardButtonElement);
  keyboardButtonElement.addEventListener("click", (event) => {
    initGame(event.target, String.fromCharCode(i));
  });
}

// Récupère aléatoirement un mot :
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(currentWord.toLocaleUpperCase(), hint);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const initGame = (button, clickedLetter) => {
  // Vérifie si la lettre est dans le mot :
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplayedElement.querySelectorAll("li")[index].innerText = letter;
        wordDisplayedElement
          .querySelectorAll("li")
          [index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImageElement.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesTextElement.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) {
    return gameOver(true);
  }
  if (correctLetters.length === currentWord.length) {
    return gameOver(false);
  }
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalTitle = isVictory ? "Dommage !" : "Bravo !";
    const modalText = isVictory
      ? `Le mot à trouver était : <b>${currentWord}</b>`
      : `Le mot était : <b>${currentWord}</b>`;
    const modalImg = isVictory
      ? "images/cr9vIO7NsP5cY.webp"
      : "images/nqi89GMgyT3va.webp";

    console.log(modalImg, modalTitle, modalText, currentWord);
    modalElement.querySelector("img").src = modalImg;
    modalElement.querySelector("p").innerHTML = modalText;
    modalElement.querySelector("h4").innerText = modalTitle;
    modalElement.classList.add("displayed");
  }, 200);
};

getRandomWord();
replayButtonElement.addEventListener("click", getRandomWord);
