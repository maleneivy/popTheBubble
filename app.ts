// Henter HTML-elementene
const bubblesRoom = document.querySelector(".bubbles-room") as HTMLDivElement;
const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
const scoreDisplay = document.getElementById("score") as HTMLSpanElement;
const timerDisplay = document.getElementById("timer") as HTMLSpanElement;
const modal = document.getElementById("game-over-modal") as HTMLDivElement;
const finalScore = document.getElementById("final-score") as HTMLSpanElement;
const restartButton = document.getElementById("restart-button") as HTMLButtonElement;
const difficultySelect = document.getElementById("difficulty") as HTMLSelectElement;
const modeSelect = document.getElementById("mode") as HTMLSelectElement;
const startButton = document.getElementById("start-game") as HTMLButtonElement;
const startMenu = document.getElementById("start-menu") as HTMLDivElement;
const backToGameOptionsButton = document.getElementById("back-to-game-options") as HTMLButtonElement;

let score: number = 0;
let timeLeft: number = 20;
let gameActive: boolean = false;
let bubbleInterval: any;
let gameTimer: any;

// Definerer boblestørrelser og poengverdier
const bubbleSizes: { size: number; points: number }[] = [
  { size: 20, points: 10 },
  { size: 30, points: 5 },
  { size: 50, points: 3 },
  { size: 70, points: 2 },
];

// Definerer vanskelighetsgrader
const difficultySettings = {
  easy: { spawnRate: 200, speedMin: 10, speedMax: 15 },
  medium: { spawnRate: 200, speedMin: 7, speedMax: 12 },
  hard: { spawnRate: 200, speedMin: 4, speedMax: 6 } // Hardest should be fastest!
};

// Nedtellings-element øverst i spillrommet
const countdownTimer = document.createElement("div");
countdownTimer.classList.add("countdown");
bubblesRoom.appendChild(countdownTimer);

// Funksjon for å starte spillet
function startGame(): void {
  document.querySelectorAll(".bubble").forEach(bubble => bubble.remove());
  bubblesRoom.classList.remove("blurry-background");
  score = 0;
  timeLeft = 10;
  gameActive = true;
  scoreDisplay.textContent = "0";
  timerDisplay.textContent = "20";
  modal.style.display = "none";
  startMenu.style.display = "none"; // Skjuler startmeny
  gameContainer.style.display = "flex";
  
  bubblesRoom.style.display = "block"; // Viser spillområdet
  const scoreBoard = document.querySelector(".score-board") as HTMLElement;
  if (scoreBoard) {
    scoreBoard.style.display = "block";
  }  

  // Henter valgt vanskelighetsgrad og modus
  const difficulty = difficultySelect.value as keyof typeof difficultySettings;
  const mode = modeSelect.value as "calm" | "chaos";
  const { spawnRate, speedMin, speedMax } = difficultySettings[difficulty];

  // Start boblegenerering
  bubbleInterval = setInterval(() => createBubble(mode, speedMin, speedMax), spawnRate);

// Opprett et nedtellings-element øverst i spillrommet
const countdownTimer = document.createElement("div");
countdownTimer.classList.add("countdown");
bubblesRoom.appendChild(countdownTimer);

// Start spill-timeren
gameTimer = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.textContent = timeLeft.toString();

    // Når det er 3 sekunder igjen, vis tydelig nedtelling
    if (timeLeft <= 3) {
      countdownTimer.textContent = `${timeLeft}!`;
      countdownTimer.classList.add("countdown-active");
    }

    // Fjern nedtellingen når spillet er over
    if (timeLeft === 0) {
      clearInterval(gameTimer);
      clearInterval(bubbleInterval);
      gameActive = false;
      countdownTimer.remove(); // Fjern tekst
      endGame();
    }
  }
}, 1000);
}

// Funksjon for å avslutte spillet
function endGame(): void {
  clearInterval(gameTimer);
  clearInterval(bubbleInterval);
  gameActive = false;

  // Fjern nedtellingsteksten
  countdownTimer.remove();

  // Ikke fjern boblene – la de fortsette å flyte bak den blurry effekten
  bubblesRoom.classList.add("blurry-background");

  // Vent 2 sekunder før modalen vises
  setTimeout(() => {
    finalScore.textContent = score.toString();
    modal.style.display = "flex";
  }, 2000);
}

// Funksjon for bobler
function createBubble(mode: "calm" | "chaos", speedMin: number, speedMax: number): void {
  if (!gameActive) return;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Velger en tilfeldig størrelse
  const selectedSize = bubbleSizes[Math.floor(Math.random() * bubbleSizes.length)];
  bubble.style.width = `${selectedSize.size}px`;
  bubble.style.height = `${selectedSize.size}px`;

  // Tilfeldig startposisjon
  const randomLeft: number = Math.random() * (bubblesRoom.clientWidth - selectedSize.size);
  bubble.style.left = `${randomLeft}px`;

  // Plasser boblen nederst i spillområdet
  bubble.style.bottom = "0px";

  // Legger til refleksjon
  const reflection = document.createElement("div");
  reflection.classList.add(selectedSize.size > 40 ? "reflection-big" : "reflection");
  bubble.appendChild(reflection);

  // Velger animasjonstype basert på modus
  if (mode === "calm") {
    bubble.classList.add("calm-bubble");
  } else {
    bubble.classList.add("chaos-bubble");
  }

  // **Setter varighet på bobleanimasjonen basert på vanskelighetsgrad**
  const duration: number = Math.random() * (speedMax - speedMin) + speedMin;
  bubble.style.animationDuration = `${duration}s`; // 📌 Legger til hastighet

  // Legger til boblen i spillområdet
  bubblesRoom.appendChild(bubble);

  // Event Listener for popping
  bubble.addEventListener("click", (event) => popBubble(bubble, selectedSize.points, event));

  // 📌 **Kun calm-modus fjerner boblen manuelt**
  if (mode === "calm") {
    setTimeout(() => {
      if (bubble.parentElement) {
        bubble.remove();
      }
    }, duration * 1000); // 📌 Fjerner boblen kun i calm modus
  }
}

// Funksjon for å poppe bobler og oppdatere poeng
function popBubble(bubble: HTMLDivElement, points: number, event: MouseEvent): void {
  if (!gameActive || bubble.dataset.popped) return;
  
  bubble.dataset.popped = "true"; // Hindrer dobbelt poeng

  // Oppdater poeng
  score += points;
  scoreDisplay.textContent = score.toString();

  // Vis grønn klikkindikator med poeng
  showClickEffect(event.clientX, event.clientY, true, points);

  // Spiller pop-animasjonen
  bubble.style.animation = "pop 0.3s ease-out forwards";

  // Fjerner boblen etter popping
  setTimeout(() => {
    bubble.remove();
  }, 300);
}

// Funksjon for å vise et klikkmerke (rød = bom, grønn = treff)
function showClickEffect(x: number, y: number, hit: boolean, points?: number): void {
  const clickEffect = document.createElement("div");
  clickEffect.classList.add("click-effect", hit ? "hit" : "miss");

  // Plasserer sirkelen der brukeren klikket
  clickEffect.style.left = `${x}px`;
  clickEffect.style.top = `${y}px`;

  document.body.appendChild(clickEffect);

  if (hit && points) {
    const scoreIndicator = document.createElement("div");
    scoreIndicator.classList.add("score-indicator");
    scoreIndicator.textContent = `+${points}`;
    scoreIndicator.style.left = `${x}px`;
    scoreIndicator.style.top = `${y - 20}px`;

    document.body.appendChild(scoreIndicator);

    // Fjern poengindikator etter 500ms
    setTimeout(() => {
      scoreIndicator.remove();
    }, 500);
  }

  // Fjern klikkmerket etter 300ms
  setTimeout(() => {
    clickEffect.remove();
  }, 300);
}

// Legg til event listeners for start og restart-knapp
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => {
  modal.style.display = "none";
  startGame();
});

backToGameOptionsButton.addEventListener("click", () => {
  clearInterval(gameTimer);
  clearInterval(bubbleInterval);
  gameContainer.style.display = "none";
  gameActive = false;
  startMenu.style.display = "block"; 
})

// Forslag til andre ting
// Istedet for click, hva med å bruke hover?
// Større viewport - Bastian syns det ble aaaaaltfor smått