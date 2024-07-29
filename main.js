const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImage = new Image();
backgroundImage.src = 'star-background.jpg';

const rocketImage = new Image();
rocketImage.src = 'rocket.png';

const explosionImage = new Image();
explosionImage.src = 'explosion.png';

let rocket = {
    width: 300, // Taille ajustée de la fusée (4 fois plus grande)
    height: 300, // Taille ajustée de la fusée (4 fois plus grande)
    exploded: false
};

let backgroundY = 0;
let multiplier = 1.00;
let multiplierIncrement = 0.08; // Vitesse de multiplication augmentée
let gameRunning = true;

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, backgroundImage.height);
    ctx.drawImage(backgroundImage, 0, backgroundY - backgroundImage.height, canvas.width, backgroundImage.height);
}

function updateBackground() {
    backgroundY += 2; // Vitesse du background
    if (backgroundY >= backgroundImage.height) {
        backgroundY = 0;
    }
}

function drawRocket() {
    const rocketX = canvas.width / 2 - rocket.width / 2;
    const rocketY = canvas.height / 2 - rocket.height / 2;
    if (!rocket.exploded) {
        ctx.drawImage(rocketImage, rocketX, rocketY, rocket.width, rocket.height);
    } else {
        ctx.drawImage(explosionImage, rocketX, rocketY, rocket.width, rocket.height);
    }
}

function drawMultiplier() {
    ctx.font = '120px Arial'; // Taille de la police augmentée
    ctx.textAlign = 'center';
    if (rocket.exploded) {
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'green';
    }
    ctx.fillText(`x${multiplier.toFixed(2)}`, canvas.width / 2, canvas.height / 2 + 300); // Position centrée
}

function updateMultiplier() {
    if (!rocket.exploded) {
        multiplier += multiplierIncrement;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawRocket();
    drawMultiplier();
    updateBackground();
    updateMultiplier();

    if (!rocket.exploded) {
        requestAnimationFrame(gameLoop);
    }
}

rocketImage.onload = function() {
    backgroundImage.onload = function() {
        gameLoop();
    };
};
