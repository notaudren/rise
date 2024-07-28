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
    x: (canvas.width / 2) - 75 * 2, // Centré horizontalement
    y: (canvas.height / 2) + 50, // Centré verticalement
    width: 75 * 4, // Taille ajustée de la fusée (4 fois plus grande)
    height: 75 * 4, // Taille ajustée de la fusée (4 fois plus grande)
    speed: 2,
    exploded: false
};

let backgroundY = 0;
let multiplier = 1.00;
let multiplierIncrement = 0.04;
let gameRunning = true;

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, backgroundImage.height);
    ctx.drawImage(backgroundImage, 0, backgroundY - backgroundImage.height, canvas.width, backgroundImage.height);
}

function updateBackground() {
    backgroundY += rocket.speed / 2;
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

function updateRocket() {
    rocket.y -= rocket.speed;
    if (rocket.y + rocket.height < 0) {
        rocket.exploded = true;
    }
}

function drawMultiplier() {
    ctx.font = '90px Arial'; // Taille de la police augmentée
    ctx.textAlign = 'center';
    if (rocket.exploded) {
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'green';
    }
    ctx.fillText(`x${multiplier.toFixed(2)}`, canvas.width / 2, canvas.height / 2 + 200); // Position centrée
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
    updateRocket();
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
