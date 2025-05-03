/** @format */
// DOM elements
const cursor = document.querySelector(".cursor");
const startBtn = document.querySelector(".Start");
const resetBtn = document.querySelector(".Reset");
const container = document.querySelector(".container");

// Game variables
let target = null;
let moveInterval = null;
let timerInterval = null;
let score = 0;
let timeLeft = 30;

// Create and append timer display
const timerDisplay = document.createElement("div");
timerDisplay.style.color = "white";
timerDisplay.style.fontSize = "1.2rem";
timerDisplay.style.marginTop = "10px";
container.appendChild(timerDisplay);

// Cursor movement
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

// Start game
startBtn.addEventListener("click", () => {
  if (moveInterval || timerInterval) return;

  score = 0;
  timeLeft = 30;
  updateScore();
  updateTimerDisplay();
  createTarget();

  moveInterval = setInterval(moveTarget, 1500);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
});

// Create or reuse target
function createTarget() {
  if (!target) {
    target = document.createElement("img");
    target.src = "./image/target.png";
    target.classList.add("target");
    container.appendChild(target);

    target.addEventListener("click", () => {
      score++;
      updateScore();
    });
  }
  moveTarget();
}

// Move target
function moveTarget() {
  const contWidth = container.clientWidth;
  const contHeight = container.clientHeight;
  const ranTop = Math.random() * (contHeight - 100);
  const ranLeft = Math.random() * (contWidth - 100);
  target.style.top = `${ranTop}px`;
  target.style.left = `${ranLeft}px`;
}

// Score UI
function updateScore() {
  startBtn.textContent = `Score: ${score}`;
}

// Timer UI
function updateTimerDisplay() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}

// Stop game
function stopGame() {
  clearInterval(moveInterval);
  clearInterval(timerInterval);
  moveInterval = null;
  timerInterval = null;

  if (target) {
    target.remove();
    target = null;
  }

  startBtn.textContent = "Start";
  timerDisplay.textContent = "Time's up!";
}

// Reset button
resetBtn.addEventListener("click", () => {
  stopGame();
  score = 0;
  timeLeft = 30;
  updateScore();
  updateTimerDisplay();
});
