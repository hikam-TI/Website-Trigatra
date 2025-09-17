// Data untuk game Tebak Kata
const wordGuessData = [
  {
    question: "Apa bahasa Indonesia dari 'Book'?",
    options: ["Buku", "Pena", "Meja", "Pensil"],
    answer: "Buku",
  },
  {
    question: "Apa bahasa Indonesia dari 'Teacher'?",
    options: ["Guru", "Murid", "Sekolah", "Kelas"],
    answer: "Guru",
  },
  {
    question: "Apa bahasa Indonesia dari 'Friend'?",
    options: ["Teman", "Keluarga", "Tetangga", "Kenalan"],
    answer: "Teman",
  },
];

// Data untuk game Susun Kalimat
const sentenceData = [
  {
    words: ["saya", "pergi", "ke", "sekolah"],
    correctOrder: ["saya", "pergi", "ke", "sekolah"],
  },
  {
    words: ["dia", "sedang", "membaca", "buku"],
    correctOrder: ["dia", "sedang", "membaca", "buku"],
  },
];

// Data untuk game Cocokkan Kata
const matchGameData = [
  { word: "Buku", match: "Book" },
  { word: "Guru", match: "Teacher" },
  { word: "Teman", match: "Friend" },
];

// Elemen DOM
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");
const gameContainer = document.getElementById("game-container");
const gameButtons = document.querySelectorAll(".game-btn");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
});

// Utility shuffle function
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  const arr = array.slice();
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
}

// Game Tebak Kata
function startTebakKata() {
  let currentQuestion = 0;
  let score = 0;

  function renderQuestion() {
    const q = wordGuessData[currentQuestion];
    gameContainer.innerHTML = `
      <h3>Tebak Kata</h3>
      <p>${q.question}</p>
      <div class="options">
        ${q.options
          .map(
            (opt) =>
              `<button class="option-btn">${opt}</button>`
          )
          .join("")}
      </div>
      <p>Skor: ${score}</p>
    `;

    const optionButtons = gameContainer.querySelectorAll(".option-btn");
    optionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent === q.answer) {
          score++;
          alert("Jawaban benar!");
        } else {
          alert(`Salah! Jawaban yang benar: ${q.answer}`);
        }
        currentQuestion++;
        if (currentQuestion < wordGuessData.length) {
          renderQuestion();
        } else {
          alert(`Game selesai! Skor Anda: ${score}/${wordGuessData.length}`);
          gameContainer.innerHTML = "";
        }
      });
    });
  }

  renderQuestion();
}

// Game Susun Kalimat
function startSusunKalimat() {
  let currentIndex = 0;
  let score = 0;

  function renderGame() {
    const data = sentenceData[currentIndex];
    const shuffledWords = shuffle(data.words);
    let userOrder = [];

    gameContainer.innerHTML = `
      <h3>Susun Kalimat</h3>
      <p>Susun kata-kata berikut menjadi kalimat yang benar:</p>
      <div id="word-pool" class="word-pool">
        ${shuffledWords.map((w) => `<button class="word-btn">${w}</button>`).join("")}
      </div>
      <div id="sentence-area" class="sentence-area"></div>
      <button id="undo-btn" disabled>Undo</button>
      <button id="submit-btn" disabled>Submit</button>
      <p>Skor: ${score}</p>
    `;

    const wordPool = document.getElementById("word-pool");
    const sentenceArea = document.getElementById("sentence-area");
    const undoBtn = document.getElementById("undo-btn");
    const submitBtn = document.getElementById("submit-btn");

    wordPool.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        userOrder.push(btn.textContent);
        sentenceArea.innerHTML += `<span class="sentence-word">${btn.textContent}</span> `;
        btn.disabled = true;
        undoBtn.disabled = false;
        if (userOrder.length === data.words.length) {
          submitBtn.disabled = false;
        }
      });
    });

    undoBtn.addEventListener("click", () => {
      if (userOrder.length === 0) return;
      const lastWord = userOrder.pop();
      sentenceArea.innerHTML = userOrder.map((w) => `<span class="sentence-word">${w}</span> `).join("");
      Array.from(wordPool.children).forEach((btn) => {
        if (btn.textContent === lastWord) btn.disabled = false;
      });
      submitBtn.disabled = userOrder.length !== data.words.length;
      if (userOrder.length === 0) undoBtn.disabled = true;
    });

    submitBtn.addEventListener("click", () => {
      const correct = data.correctOrder.join(" ");
      const userAnswer = userOrder.join(" ");
      if (userAnswer === correct) {
        score++;
        alert("Jawaban benar!");
      } else {
        alert(`Jawaban salah! Jawaban yang benar: ${correct}`);
      }
      currentIndex++;
      if (currentIndex < sentenceData.length) {
        renderGame();
      } else {
        alert(`Game selesai! Sk