const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.6;
canvas.height = window.innerHeight * 0.6;

const backgroundImage = new Image();
backgroundImage.src = 'star-background.jpg';

const rocketImage = new Image();
rocketImage.src = 'rocket.png';

const explosionImage = new Image();
backgroundImage.src = 'star-background.jpg';
rocketImage.src = 'rocket.png';
explosionImage.src = 'explosion.png';

const launchSound = document.getElementById('launchSound');
const explosionSound = document.getElementById('explosionSound');
const loadingBar = document.getElementById('loadingBar');
const crashHistoryContainer = document.getElementById('crashHistoryContainer');
const balanceContainer = document.getElementById('balanceContainer');

let rocket = {
    width: 337.5,
    height: 337.5,
    x: -337.5 / 2,
    y: canvas.height - 337.5, // Adjusted for better positioning
    speed: 4,
    exploded: false
};

let backgroundY = 0;
let multiplier = 1.00;
let multiplierIncrement = 0.02;
let gameRunning = true;
let rocketReachedPosition = false;
let gameStarted = false;
const explosionThreshold = 5.0;

const crashHistory = [];
let balance = 100.25;
let betAmount = 0;
let collectMultiplier = 0;
let placeBetButton = document.getElementById('placeBetButton');

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, backgroundImage.height);
    ctx.drawImage(backgroundImage, 0, backgroundY - backgroundImage.height, canvas.width, backgroundImage.height);
}

function updateBackground() {
    backgroundY += 2;
    if (backgroundY >= backgroundImage.height) {
        backgroundY = 0;
    }
}

function drawRocket() {
    if (!rocket.exploded) {
        ctx.drawImage(rocketImage, rocket.x, rocket.y, rocket.width, rocket.height);
    } else {
        ctx.drawImage(explosionImage, rocket.x, rocket.y, rocket.width, rocket.height);
    }
}

function drawMultiplier() {
    ctx.font = '120px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = rocket.exploded ? 'red' : 'green';
    ctx.fillText(`x${multiplier.toFixed(2)}`, canvas.width / 2, canvas.height * 7 / 8);
}

function updateMultiplier() {
    if (!rocket.exploded && rocketReachedPosition) {
        multiplier += multiplierIncrement;
        checkExplosion();
        updateBetButton();
    }
}

function updateBetButton() {
    if (!rocket.exploded && rocketReachedPosition) {
        const betValue = (betAmount * multiplier).toFixed(2);
        placeBetButton.innerHTML = `<div class="bet-amount">${betValue}</div><span>COLLECT</span>`;
        placeBetButton.classList.add('in-game');
    }
}

function checkExplosion() {
    if (multiplier >= explosionThreshold) {
        rocket.exploded = true;
        gameRunning = false;
        explosionSound.play().catch(error => console.log('Erreur lors de la lecture du son d\'explosion:', error));
        startLoading();
    }
}

function updateRocketPosition() {
    if (!rocketReachedPosition) {
        rocket.x += rocket.speed;
        rocket.y -= rocket.speed * (canvas.height / canvas.width);

        const targetX = canvas.width / 2 - rocket.width / 2;
        const targetY = canvas.height / 2 - rocket.height / 2;
        if (rocket.x >= targetX && rocket.y <= targetY) {
            rocket.x = targetX;
            rocket.y = targetY;
            rocketReachedPosition = true;
        }
    }
}

function startLoading() {
    let loadingProgress = 0;
    loadingBar.style.width = '0';

    const loadingInterval = setInterval(() => {
        loadingProgress += 2;
        loadingBar.style.width = `${loadingProgress}%`;

        if (loadingProgress >= 100) {
            clearInterval(loadingInterval);
            addCrashToHistory(multiplier);
            resetGame();
        }
    }, 100);
}

function addCrashToHistory(multiplier) {
    const crashBox = document.createElement('div');
    crashBox.className = 'crashBox';
    crashBox.textContent = multiplier.toFixed(2);

    if (multiplier < 2) {
        crashBox.style.backgroundColor = 'red';
    } else if (multiplier < 5) {
        crashBox.style.backgroundColor = 'purple';
    } else {
        crashBox.style.backgroundColor = 'green';
    }

    crashHistoryContainer.insertBefore(crashBox, crashHistoryContainer.firstChild);

    if (crashHistoryContainer.childNodes.length > 50) {
        crashHistoryContainer.removeChild(crashHistoryContainer.lastChild);
    }
}

function resetGame() {
    rocket = {
        width: 337.5,
        height: 337.5,
        x: -337.5 / 2,
        y: canvas.height - 337.5, // Adjusted for better positioning
        speed: 4,
        exploded: false
    };
    backgroundY = 0;
    multiplier = 1.00;
    rocketReachedPosition = false;
    gameRunning = true;
    gameStarted = false;
    document.getElementById('bettingContainer').classList.remove('in-game');
    placeBetButton.innerHTML = 'Place your bet';
    placeBetButton.classList.remove('in-game');
    startGame();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawRocket();
    drawMultiplier();
    updateBackground();
    updateRocketPosition();
    updateMultiplier();

    requestAnimationFrame(gameLoop);
}

function startGame() {
    if (!gameStarted) {
        launchSound.play().catch(error => console.log('Erreur lors de la lecture du son de décollage:', error));
        gameStarted = true;
        gameLoop();
    }
}

backgroundImage.onload = function() {
    rocketImage.onload = function() {
        explosionImage.onload = function() {
            document.addEventListener('click', startGame);
            document.addEventListener('keydown', (event) => {
                if (event.key === ' ') {
                    startGame();
                    rocket.exploded = true;
                    gameRunning = false;
                    explosionSound.play().catch(error => console.log('Erreur lors de la lecture du son d\'explosion:', error));
                    startLoading();
                }
            });
        };
    };
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.6;
    canvas.height = window.innerHeight * 0.6;
    rocket.x = -rocket.width / 2;
    rocket.y = canvas.height - 337.5; // Adjusted for better positioning
});

// Allow swipe scrolling on mobile and touch devices
let startX;
let scrollLeft;

crashHistoryContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - crashHistoryContainer.offsetLeft;
    scrollLeft = crashHistoryContainer.scrollLeft;
});

crashHistoryContainer.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - crashHistoryContainer.offsetLeft;
    const walk = (x - startX) * 2; // Accelerate the scroll
    crashHistoryContainer.scrollLeft = scrollLeft - walk;
});

document.getElementById('placeBetButton').addEventListener('click', () => {
    if (placeBetButton.classList.contains('in-game')) {
        collectBet();
    } else {
        placeBet();
    }
});

function placeBet() {
    betAmount = parseFloat(document.getElementById('betInput').value);
    collectMultiplier = parseFloat(document.getElementById('collectInput').value);
    placeBetButton.innerHTML = `Bet ${betAmount} for the next round`;

    // Change the button color to red during the loading phase
    placeBetButton.classList.add('bet-placed');

    setTimeout(() => {
        // Start the game
        startGame();
        placeBetButton.innerHTML = `<div class="bet-amount">${betAmount}</div>`;
        placeBetButton.classList.remove('bet-placed');
        placeBetButton.classList.add('in-game');
    }, 5000);
}

function collectBet() {
    const winnings = betAmount * multiplier;
    balance += winnings;
    balanceContainer.innerText = `Balance: ${balance.toFixed(2)}$`;

    // Reset the button and game state
    placeBetButton.innerHTML = 'Place your bet';
    document.getElementById('bettingContainer').classList.remove('in-game');
    document.getElementById('bettingContainer').classList.remove('bet-placed');
    rocket.exploded = true;
    gameRunning = false;
    explosionSound.play().catch(error => console.log('Erreur lors de la lecture du son d\'explosion:', error));
    startLoading();
}

// Initial call to reset the game
resetGame();
