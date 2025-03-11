// Henter HTML-elementene
const bubblesRoom = document.querySelector(".bubbles-room") as HTMLDivElement;
const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
const scoreDisplay = document.getElementById("score") as HTMLSpanElement;
const timerDisplay = document.getElementById("timer") as HTMLSpanElement;
const modal = document.querySelector(".modal") as HTMLDivElement;
const finalScore = document.getElementById("final-score") as HTMLSpanElement;
const restartButton = document.getElementById("restart-button") as HTMLButtonElement;
const difficultySelect = document.getElementById("difficulty") as HTMLSelectElement;
const modeSelect = document.getElementById("mode") as HTMLSelectElement;
const startButton = document.getElementById("start-game") as HTMLButtonElement;
const startMenuContainer = document.querySelector(".start-menu-container") as HTMLDivElement;
const startMenu = document.getElementById("start-menu") as HTMLDivElement;
const backToGameOptionsButton = document.getElementById("back-to-game-options") as HTMLButtonElement;
const heading1 = document.querySelector("h1") as HTMLHeadingElement;
const countdownWarning = document.getElementById("countdown-warning") as HTMLDivElement;

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

startButton.addEventListener("click", () => {
  startGame();
});

// Funksjon for å starte spillet
function startGame(): void {
  clearInterval(gameTimer);
  clearInterval(bubbleInterval);
  document.querySelectorAll(".bubble").forEach(bubble => bubble.remove());
  bubblesRoom.classList.remove("blurry-background");
  score = 0;
  timeLeft = 20;
  gameActive = true;
  scoreDisplay.textContent = "0";
  timerDisplay.textContent = "20";
  timerDisplay.style.color = "white";
  timerDisplay.style.textShadow = "none";
  startMenuContainer.style.display = "none";
  startMenu.style.display = "none"; // Skjuler startmeny
  gameContainer.style.display = "flex";
  heading1.style.display = "none";
  
  bubblesRoom.style.display = "block"; // Viser spillområdet
  const scoreBoard = document.querySelector(".score-board") as HTMLElement;
  if (scoreBoard) {
    scoreBoard.style.display = "flex";
  }  

  // Henter valgt vanskelighetsgrad og modus
  const difficulty = difficultySelect.value as keyof typeof difficultySettings;
  const mode = modeSelect.value as "calm" | "chaos";
  const { spawnRate, speedMin, speedMax } = difficultySettings[difficulty];

  // Start boblegenerering
  bubbleInterval = setInterval(() => createBubble(mode, speedMin, speedMax), spawnRate);

  // Spill-timeren
gameTimer = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.textContent = timeLeft.toString();

  // Når det er 5 sekunder igjen, vis countdown midt i skjermen
  if (timeLeft <= 5 && timeLeft > 0) {
    countdownWarning.style.display = "block";
    countdownWarning.textContent = timeLeft.toString();
      } else {
          countdownWarning.style.display = "none";
        }

    // Når det er 3 sekunder igjen, vis tydelig nedtelling
    if (timeLeft === 3) {
      timerDisplay.classList.add("countdown-active");
      timerDisplay.style.color = "red";
      timerDisplay.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.8)";
    }

    // Når tiden er ute, fjern klassen
    if (timeLeft === 0) {
      clearInterval(gameTimer);
      clearInterval(bubbleInterval);
      gameActive = false;
      timerDisplay.classList.remove("countdown-active"); // Fjerner animasjonen
      endGame();
      timerDisplay.style.color = "red";
      timerDisplay.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.8)";
      countdownWarning.style.display = "none";
      if (window.innerWidth <= 480) {
        timerDisplay.style.fontSize = "24px";
      } else if (window.innerWidth <= 768) {
        timerDisplay.style.fontSize = "32px"; 
      } else {
        timerDisplay.style.fontSize = "40px";
      }
    }
  }
}, 1000);

// Funksjon for å avslutte spillet
function endGame(): void {
  clearInterval(gameTimer);
  clearInterval(bubbleInterval);
  gameActive = false;

  // Ikke fjern boblene – la de fortsette å flyte bak den blurry effekten
  bubblesRoom.classList.add("blurry-background");

  // Vent 2 sekunder før modalen vises
  setTimeout(() => {
    finalScore.textContent = score.toString();
    modal.classList.add("show-modal");
  }, 2000);
}

// Funksjon for bobler
function createBubble(mode: "calm" | "chaos", speedMin: number, speedMax: number): void {
  if (!gameActive) return;

  const bubble = document.createElement("div");

  // 10% sjanse for at det blir en rød boble
  const isRedBubble = Math.random() < 0.1; 

  if (isRedBubble) {
    bubble.classList.add("bubble", "red-bubble"); // Legger til red-bubble klassen
  } else {
    bubble.classList.add("bubble"); // Vanlig boble
  }

  // Velger en tilfeldig størrelse
  const selectedSize = bubbleSizes[Math.floor(Math.random() * bubbleSizes.length)];
  bubble.style.width = `${selectedSize.size}px`;
  bubble.style.height = `${selectedSize.size}px`;

  // Legge til skull i minusboble 
  if (isRedBubble) {
  const skull = document.createElement("img");
  skull.src = "./assets/icons/skull.svg";
  skull.classList.add(selectedSize.size > 40 ? "skull-big" : "skull-small");

  bubble.appendChild(skull);
  }

  // Sett poeng basert på farge
  const points = isRedBubble ? -selectedSize.points : selectedSize.points;

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

  // Setter varighet på bobleanimasjonen basert på vanskelighetsgrad
  const duration: number = Math.random() * (speedMax - speedMin) + speedMin;
  bubble.style.animationDuration = `${duration}s`;

  // Legger til boblen i spillområdet
  bubblesRoom.appendChild(bubble);

  //Event Listener for popping
  bubble.addEventListener("click", (event) => popBubble(bubble, points, event));

  // Kun calm-modus fjerner boblen manuelt
  if (mode === "calm") {
    setTimeout(() => {
      if (bubble.parentElement) {
        bubble.remove();
      }
    }, duration * 1000);
  }
}

// Funksjon for å poppe bobler og oppdatere poeng
function popBubble(bubble: HTMLDivElement, points: number, event: MouseEvent): void {
  if (!gameActive || bubble.dataset.popped) return;

  bubble.dataset.popped = "true"; // Hindrer dobbelt poeng

  // Stopper all bevegelse og synlighet umiddelbart
  bubble.style.animation = "none"; // Fjerner pågående animasjoner
  bubble.style.transition = "none"; // Sikrer at det ikke er noen uønskede overganger
  bubble.style.display = "none"; // Fjerner boblen etter pop!

  // Oppdater poeng
  score += points;
  scoreDisplay.textContent = score.toString();

  // Vis grønn klikkindikator med poeng
  showClickEffect(event.clientX, event.clientY, true, points);

  // Spiller pop-animasjonen
  bubble.classList.add("popping");

  // Fjern boblen etter popping
  setTimeout(() => {
    if (bubble.parentElement) {
      bubble.remove();
    }
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
  
    // Sjekk om poengene er negative eller positive
    if (points > 0) {
      scoreIndicator.textContent = `+${points}`;
      scoreIndicator.style.color = "green";
    } else {
      scoreIndicator.textContent = `${points}`; // Negativt tall vises med minus
      scoreIndicator.style.color = "red";
    }
  
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

// Vise "miss" effekt for bruker når det bommes på boblen
bubblesRoom.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains("bubble")) {
      showClickEffect(event.clientX, event.clientY, false);
  }
});

// Legg til event listeners for start og restart-knapp
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => {
  modal.classList.remove("show-modal"); 
  clearInterval(gameTimer);
  clearInterval(bubbleInterval);
  startGame();
});

backToGameOptionsButton.addEventListener("click", () => {
  clearInterval(gameTimer);
  clearInterval(bubbleInterval);
  gameContainer.style.display = "none";
  gameActive = false;
  modal.classList.remove("show-modal"); 
  startMenuContainer.style.display = "block";
  startMenu.style.display = "flex"; 
  heading1.style.display = "block";
});}