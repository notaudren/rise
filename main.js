const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rocketImg = new Image();
rocketImg.src = 'https://notaudren.github.io/rise/rocket.png'; // URL de l'image rocket.png sur votre dépôt GitHub

const explosionImg = new Image();
explosionImg.src = 'https://notaudren.github.io/rise/explosion.png'; // URL de l'image explosion.png sur votre dépôt GitHub

let rocketX = canvas.width * 0.1;
let rocketY = canvas.height - 200;
const rocketWidth = 50;  // Largeur de la fusée originale
const rocketHeight = 100; // Hauteur de la fusée originale
const scaledRocketWidth = rocketWidth * 2;  // Largeur de la fusée doublée
const scaledRocketHeight = rocketHeight * 2; // Hauteur de la fusée doublée

const explosionWidth = 64; // Largeur de l'explosion originale
const explosionHeight = 64; // Hauteur de l'explosion originale
const scaledExplosionWidth = explosionWidth * 2;  // Largeur de l'explosion doublée
const scaledExplosionHeight = explosionHeight * 2; // Hauteur de l'explosion doublée

let rocketSpeedX = 2;
let rocketSpeedY = -2;

let multiplier = 1.00;
let multiplierElement = document.getElementById('multiplier');
let isExploded = false;

function update() {
    if (!isExploded) {
        rocketX += rocketSpeedX;
        rocketY += rocketSpeedY;
        if (rocketY <= canvas.height / 2 - scaledRocketHeight / 2) {
            isExploded = true;
            multiplierElement.style.color = 'red';
        } else {
            multiplier += 0.01;
            multiplierElement.textContent = `x${multiplier.toFixed(2)}`;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isExploded) {
        ctx.drawImage(explosionImg, rocketX, rocketY, scaledExplosionWidth, scaledExplosionHeight);
    } else {
        ctx.drawImage(rocketImg, rocketX, rocketY, scaledRocketWidth, scaledRocketHeight);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

rocketImg.onload = function() {
    gameLoop();
};
