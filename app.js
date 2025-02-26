// Henter HTML-elementene
var bubblesRoom = document.querySelector(".bubbles-room");
var gameContainer = document.querySelector(".game-container");
var scoreDisplay = document.getElementById("score");
var timerDisplay = document.getElementById("timer");
var modal = document.getElementById("game-over-modal");
var finalScore = document.getElementById("final-score");
var restartButton = document.getElementById("restart-button");
var difficultySelect = document.getElementById("difficulty");
var modeSelect = document.getElementById("mode");
var startButton = document.getElementById("start-game");
var startMenu = document.getElementById("start-menu");
var backToGameOptionsButton = document.getElementById("back-to-game-options");
var score = 0;
var timeLeft = 20;
var gameActive = false;
var bubbleInterval;
var gameTimer;
// Definerer boblestørrelser og poengverdier
var bubbleSizes = [
    { size: 20, points: 10 },
    { size: 30, points: 5 },
    { size: 50, points: 3 },
    { size: 70, points: 2 },
];
// Definerer vanskelighetsgrader
var difficultySettings = {
    easy: { spawnRate: 200, speedMin: 10, speedMax: 15 },
    medium: { spawnRate: 200, speedMin: 7, speedMax: 12 },
    hard: { spawnRate: 200, speedMin: 4, speedMax: 6 } // Hardest should be fastest!
};
// Nedtellings-element øverst i spillrommet
var countdownTimer = document.createElement("div");
countdownTimer.classList.add("countdown");
bubblesRoom.appendChild(countdownTimer);
// Funksjon for å starte spillet
function startGame() {
    document.querySelectorAll(".bubble").forEach(function (bubble) { return bubble.remove(); });
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
    var scoreBoard = document.querySelector(".score-board");
    if (scoreBoard) {
        scoreBoard.style.display = "block";
    }
    // Henter valgt vanskelighetsgrad og modus
    var difficulty = difficultySelect.value;
    var mode = modeSelect.value;
    var _a = difficultySettings[difficulty], spawnRate = _a.spawnRate, speedMin = _a.speedMin, speedMax = _a.speedMax;
    // Start boblegenerering
    bubbleInterval = setInterval(function () { return createBubble(mode, speedMin, speedMax); }, spawnRate);
    // Opprett et nedtellings-element øverst i spillrommet
    var countdownTimer = document.createElement("div");
    countdownTimer.classList.add("countdown");
    bubblesRoom.appendChild(countdownTimer);
    // Start spill-timeren
    gameTimer = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft.toString();
            // Når det er 3 sekunder igjen, vis tydelig nedtelling
            if (timeLeft <= 3) {
                countdownTimer.textContent = "".concat(timeLeft, "!");
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
function endGame() {
    clearInterval(gameTimer);
    clearInterval(bubbleInterval);
    gameActive = false;
    // Fjern nedtellingsteksten
    countdownTimer.remove();
    // Ikke fjern boblene – la de fortsette å flyte bak den blurry effekten
    bubblesRoom.classList.add("blurry-background");
    // Vent 2 sekunder før modalen vises
    setTimeout(function () {
        finalScore.textContent = score.toString();
        modal.style.display = "flex";
    }, 2000);
}
// Funksjon for bobler
function createBubble(mode, speedMin, speedMax) {
    if (!gameActive)
        return;
    var bubble = document.createElement("div");
    bubble.classList.add("bubble");
    // Velger en tilfeldig størrelse
    var selectedSize = bubbleSizes[Math.floor(Math.random() * bubbleSizes.length)];
    bubble.style.width = "".concat(selectedSize.size, "px");
    bubble.style.height = "".concat(selectedSize.size, "px");
    // Tilfeldig startposisjon
    var randomLeft = Math.random() * (bubblesRoom.clientWidth - selectedSize.size);
    bubble.style.left = "".concat(randomLeft, "px");
    // Plasser boblen nederst i spillområdet
    bubble.style.bottom = "0px";
    // Legger til refleksjon
    var reflection = document.createElement("div");
    reflection.classList.add(selectedSize.size > 40 ? "reflection-big" : "reflection");
    bubble.appendChild(reflection);
    // Velger animasjonstype basert på modus
    if (mode === "calm") {
        bubble.classList.add("calm-bubble");
    }
    else {
        bubble.classList.add("chaos-bubble");
    }
    // **Setter varighet på bobleanimasjonen basert på vanskelighetsgrad**
    var duration = Math.random() * (speedMax - speedMin) + speedMin;
    bubble.style.animationDuration = "".concat(duration, "s"); // 📌 Legger til hastighet
    // Legger til boblen i spillområdet
    bubblesRoom.appendChild(bubble);
    // Event Listener for popping
    bubble.addEventListener("click", function (event) { return popBubble(bubble, selectedSize.points, event); });
    // 📌 **Kun calm-modus fjerner boblen manuelt**
    if (mode === "calm") {
        setTimeout(function () {
            if (bubble.parentElement) {
                bubble.remove();
            }
        }, duration * 1000); // 📌 Fjerner boblen kun i calm modus
    }
}
// Funksjon for å poppe bobler og oppdatere poeng
function popBubble(bubble, points, event) {
    if (!gameActive || bubble.dataset.popped)
        return;
    bubble.dataset.popped = "true"; // Hindrer dobbelt poeng
    // Oppdater poeng
    score += points;
    scoreDisplay.textContent = score.toString();
    // Vis grønn klikkindikator med poeng
    showClickEffect(event.clientX, event.clientY, true, points);
    // Spiller pop-animasjonen
    bubble.style.animation = "pop 0.3s ease-out forwards";
    // Fjerner boblen etter popping
    setTimeout(function () {
        bubble.remove();
    }, 300);
}
// Funksjon for å vise et klikkmerke (rød = bom, grønn = treff)
function showClickEffect(x, y, hit, points) {
    var clickEffect = document.createElement("div");
    clickEffect.classList.add("click-effect", hit ? "hit" : "miss");
    // Plasserer sirkelen der brukeren klikket
    clickEffect.style.left = "".concat(x, "px");
    clickEffect.style.top = "".concat(y, "px");
    document.body.appendChild(clickEffect);
    if (hit && points) {
        var scoreIndicator_1 = document.createElement("div");
        scoreIndicator_1.classList.add("score-indicator");
        scoreIndicator_1.textContent = "+".concat(points);
        scoreIndicator_1.style.left = "".concat(x, "px");
        scoreIndicator_1.style.top = "".concat(y - 20, "px");
        document.body.appendChild(scoreIndicator_1);
        // Fjern poengindikator etter 500ms
        setTimeout(function () {
            scoreIndicator_1.remove();
        }, 500);
    }
    // Fjern klikkmerket etter 300ms
    setTimeout(function () {
        clickEffect.remove();
    }, 300);
}
// Legg til event listeners for start og restart-knapp
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", function () {
    modal.style.display = "none";
    startGame();
});
backToGameOptionsButton.addEventListener("click", function () {
    clearInterval(gameTimer);
    clearInterval(bubbleInterval);
    gameContainer.style.display = "none";
    gameActive = false;
    startMenu.style.display = "block";
});
// Forslag til andre ting
// Istedet for click, hva med å bruke hover?
// Større viewport - Bastian syns det ble aaaaaltfor smått
