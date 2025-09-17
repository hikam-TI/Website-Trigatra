// Toggle navigation menu on mobile
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");
navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
});

// Data pembelajaran
const learningData = {
  kosakata: `
    <h3>Kosakata Lengkap</h3>
    <p>Pelajari ribuan kosakata bahasa Indonesia dari berbagai kategori seperti sehari-hari, bisnis, teknologi, dan budaya.</p>
    <ul>
      <li><strong>Buku</strong> - Book</li>
      <li><strong>Guru</strong> - Teacher</li>
      <li><strong>Teman</strong> - Friend</li>
      <li><strong>Rumah</strong> - House</li>
      <li><strong>Makan</strong> - Eat</li>
    </ul>
  `,
  tatabahasa: `
    <h3>Tata Bahasa Mendalam</h3>
    <p>Pelajari aturan tata bahasa Indonesia mulai dari dasar hingga tingkat lanjut dengan contoh dan latihan soal.</p>
    <ul>
      <li><strong>Kalimat aktif dan pasif</strong></li>
      <li><strong>Penggunaan kata depan</strong></li>
      <li><strong>Penggunaan imbuhan</strong></li>
      <li><strong>Jenis kata (kata benda, kata kerja, dll.)</strong></li>
    </ul>
  `,
  percakapan: `
    <h3>Percakapan Sehari-hari</h3>
    <p>Latihan percakapan dalam berbagai situasi dan konteks.</p>
    <ul>
      <li><strong>Salam dan perkenalan</strong></li>
      <li><strong>Memesan makanan di restoran</strong></li>
      <li><strong>Berbelanja di pasar</strong></li>
      <li><strong>Menanyakan arah</strong></li>
    </ul>
  `,
};

// Event listener untuk tombol pembelajaran
const learnButtons = document.querySelectorAll(".learn-btn");
const learningContent = document.getElementById("learning-content");

learnButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const topic = btn.getAttribute("data-topic");
    learningContent.innerHTML = learningData[topic] || "<p>Materi belum tersedia.</p>";
    learningContent.scrollIntoView({ behavior: "smooth" });
  });
});

// Data game Tebak Kata
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

// Data game Susun Kalimat
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

// Data game Cocokkan Kata
const matchGameData = [
  { word: "Buku", match: "Book" },
  { word: "Guru", match: "Teacher" },
  { word: "Teman", match: "Friend" },
];

// Elemen DOM game
const gameContainer = document.getElementById("game-container");
const gameButtons = document.querySelectorAll(".game-btn");

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
        alert(`Game selesai! Skor Anda: ${score}/${sentenceData.length}`);
        gameContainer.innerHTML = "";
      }
    });
  }

  renderGame();
}

// Game Cocokkan Kata
function startCocokkanKata() {
  let words = shuffle(matchGameData.map((p) => p.word));
  let matches = shuffle(matchGameData.map((p) => p.match));
  let selectedWord = null;
  let selectedMatch = null;
  let matchedPairs = [];
  let score = 0;

  function renderGame() {
    gameContainer.innerHTML = `
      <h3>Cocokkan Kata</h3>
      <p>Cocokkan kata bahasa Indonesia dengan arti yang tepat:</p>
      <div class="match-container">
        <div id="words" class="match-column">
          <h4>Kata</h4>
          ${words.map((w) => `<button class="match-btn" data-type="word">${w}</button>`).join("")}
        </div>
        <div id="matches" class="match-column">
          <h4>Arti</h4>
          ${matches.map((m) => `<button class="match-btn" data-type="match">${m}</button>`).join("")}
        </div>
      </div>
      <p>Skor: ${score}</p>
    `;

    const wordButtons = gameContainer.querySelectorAll('button[data-type="word"]');
    const matchButtons = gameContainer.querySelectorAll('button[data-type="match"]');

    wordButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        if (selectedWord === btn.textContent) {
          selectedWord = null;
          btn.classList.remove("selected");
        } else {
          selectedWord = btn.textContent;
          wordButtons.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        checkMatch();
      })
    );

    matchButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        if (selectedMatch === btn.textContent) {
          selectedMatch = null;
          btn.classList.remove("selected");
        } else {
          selectedMatch = btn.textContent;
          matchButtons.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        checkMatch();
      })
    );
  }

  function checkMatch() {
    if (selectedWord && selectedMatch) {
      const correct = matchGameData.find(
        (p) => p.word === selectedWord && p.match === selectedMatch
      );
      if (correct) {
        alert("Pasangan benar!");
        score++;
        matchedPairs.push([selectedWord, selectedMatch]);
        words = words.filter((w) => w !== selectedWord);
        matches = matches.filter((m) => m !== selectedMatch);
        selectedWord = null;
        selectedMatch = null;
        if (words.length === 0) {
          alert(`Game selesai! Skor Anda: ${score}/${matchGameData.length}`);
          gameContainer.innerHTML = "";
          return;
        }
        renderGame();
      } else {
        alert("Pasangan salah, coba lagi.");
        selectedWord = null;
        selectedMatch = null;
        renderGame();
      }
    }
  }

  renderGame();
}

// Event listener untuk tombol game
gameButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const game = btn.getAttribute("data-game");
    if (game === "tebak-kata") {
      startTebakKata();
    } else if (game === "susun-kalimat") {
      startSusunKalimat();
    } else if (game === "cocokkan-kata") {
      startCocokkanKata();
    }
    gameContainer.scrollIntoView({ behavior: "smooth" });
  });
});
