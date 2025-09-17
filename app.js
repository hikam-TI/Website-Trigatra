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
    learningContent.style.opacity = 0;
    learningContent.style.display = "block";
    // Animasi fade-in
    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 0.05;
      learningContent.style.opacity = opacity;
      if (opacity >= 1) clearInterval(fadeIn);
    }, 20);
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

// Fungsi untuk menampilkan pesan di game (bukan alert)
function showMessage(msg, isError = false) {
  let msgBox = document.getElementById("game-message");
  if (!msgBox) {
    msgBox = document.createElement("div");
    msgBox.id = "game-message";
    msgBox.style.margin = "1rem 0";
    msgBox.style.padding = "0.75rem 1rem";
    msgBox.style.borderRadius = "0.5rem";
    msgBox.style.fontWeight = "600";
    gameContainer.prepend(msgBox);
  }
  msgBox.textContent = msg;
  msgBox.style.backgroundColor = isError ? "#fee2e2" : "#d1fae5";
  msgBox.style.color = isError ? "#b91c1c" : "#065f46";
  msgBox.style.border = isError ? "1px solid #b91c1c" : "1px solid #065f46";
  setTimeout(() => {
    msgBox.textContent = "";
    msgBox.style.border = "none";
    msgBox.style.backgroundColor = "transparent";
  }, 3000);
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
      <p>Skor: <span id="score">${score}</span></p>
      <button id="exit-game" class="exit-btn">Keluar Game</button>
    `;

    const optionButtons = gameContainer.querySelectorAll(".option-btn");
    const scoreEl = document.getElementById("score");
    const exitBtn = document.getElementById("exit-game");

    optionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent === q.answer) {
          score++;
          showMessage("Jawaban benar!");
        } else {
          showMessage(`Salah! Jawaban yang benar: ${q.answer}`, true);
        }
        scoreEl.textContent = score;
        currentQuestion++;
        if (currentQuestion < wordGuessData.length) {
          setTimeout(renderQuestion, 1000);
        } else {
          setTimeout(() => {
            showMessage(`Game selesai! Skor Anda: ${score}/${wordGuessData.length}`);
            gameContainer.innerHTML = "";
          }, 1000);
        }
      });
    });

    exitBtn.addEventListener("click", () => {
      gameContainer.innerHTML = "";
      showMessage("Anda keluar dari game.");
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
      <div class="btn-group">
        <button id="undo-btn" disabled>Undo</button>
        <button id="submit-btn" disabled>Submit</button>
        <button id="exit-game" class="exit-btn">Keluar Game</button>
      </div>
      <p>Skor: <span id="score">${score}</span></p>
    `;

    const wordPool = document.getElementById("word-pool");
    const sentenceArea = document.getElementById("sentence-area");
    const undoBtn = document.getElementById("undo-btn");
    const submitBtn = document.getElementById("submit-btn");
    const scoreEl = document.getElementById("score");
    const exitBtn = document.getElementById("exit-game");

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
        showMessage("Jawaban benar!");
      } else {
        showMessage(`Jawaban salah! Jawaban yang benar: ${correct}`, true);
      }
      scoreEl.textContent = score;
      currentIndex++;
      if (currentIndex < sentenceData.length) {
        setTimeout(renderGame, 1200);
      } else {
        setTimeout(() => {
          showMessage(`Game selesai! Skor Anda: ${score}/${sentenceData.length}`);
          gameContainer.innerHTML = "";
        }, 1200);
      }
    });

    exitBtn.addEventListener("click", () => {
      gameContainer.innerHTML = "";
      showMessage("Anda keluar dari game.");
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
      <p>Skor: <span id="score">${score}</span></p>
      <button id="exit-game" class="exit-btn">Keluar Game</button>
    `;

    const wordButtons = gameContainer.querySelectorAll('button[data-type="word"]');
    const matchButtons = gameContainer.querySelectorAll('button[data-type="match"]');
    const scoreEl = document.getElementById("score");
    const exitBtn = document.getElementById("exit-game");

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

    exitBtn.addEventListener("click", () => {
      gameContainer.innerHTML = "";
      showMessage("Anda keluar dari game.");
    });
  }

  function checkMatch() {
    if (selectedWord && selectedMatch) {
      const correct = matchGameData.find(
        (p) => p.word === selectedWord && p.match === selectedMatch
      );
      if (correct) {
        showMessage("Pasangan benar!");
        score++;
        words = words.filter((w) => w !== selectedWord);
        matches = matches.filter((m) => m !== selectedMatch);
        selectedWord = null;
        selectedMatch = null;
        if (words.length === 0) {
          setTimeout(() => {
            showMessage(`Game selesai! Skor Anda: ${score}/${matchGameData.length}`);
            gameContainer.innerHTML = "";
          }, 1000);
          return;
        }
        renderGame();
      } else {
        showMessage("Pasangan salah, coba lagi.", true);
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
