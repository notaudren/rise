const backgroundCanvas = document.getElementById('backgroundCanvas');
const bgCtx = backgroundCanvas.getContext('2d');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

backgroundCanvas.width = canvas.width = window.innerWidth;
backgroundCanvas.height = canvas.height = window.innerHeight;

const rocketImg = new Image();
rocketImg.src = 'https://notaudren.github.io/rise/rocket.png';

const explosionImg = new Image();
explosionImg.src = 'https://notaudren.github.io/rise/explosion.png';

const starBgImg = new Image();
starBgImg.src = 'https://notaudren.github.io/rise/star-background.jpg'; // Assurez-vous que cette image est grande et de bonne qualité

let rocketX = canvas.width * 0.1;
let rocketY = canvas.height - 300;
const rocketWidth = 100;
const rocketHeight = 300;

let rocketSpeedX = 2;
let rocketSpeedY = -2;

let bgY = 0;
const bgSpeed = 1;

let multiplier = 1.00;
let multiplierElement = document.getElementById('multiplier');
let isExploded = false;

function update() {
    if (!isExploded) {
        rocketX += rocketSpeedX;
        rocketY += rocketSpeedY;
        if (rocketY <= canvas.height / 2 - rocketHeight / 2) {
            isExploded = true;
            multiplierElement.style.color = 'red';
        } else {
            multiplier += 0.01;
            multiplierElement.textContent = `x${multiplier.toFixed(2)}`;
        }
    }

    bgY += bgSpeed;
    if (bgY >= backgroundCanvas.height) {
        bgY = 0;
    }
}

function draw() {
    bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    bgCtx.drawImage(starBgImg, 0, bgY, backgroundCanvas.width, backgroundCanvas.height);
    bgCtx.drawImage(starBgImg, 0, bgY - backgroundCanvas.height, backgroundCanvas.width, backgroundCanvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isExploded) {
        ctx.drawImage(explosionImg, rocketX, rocketY, explosionImg.width, explosionImg.height);
    } else {
        ctx.drawImage(rocketImg, rocketX, rocketY, rocketImg.width, rocketImg.height);
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
