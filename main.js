const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rocketImg = new Image();
rocketImg.src = 'rocket.png';

const explosionImg = new Image();
explosionImg.src = 'explosion.png';

let rocketX = canvas.width * 0.1;
let rocketY = canvas.height - 100;
const rocketWidth = 50;
const rocketHeight = 100;
let rocketSpeed = 2;

let multiplier = 1.00;
let multiplierElement = document.getElementById('multiplier');
let isExploded = false;

function update() {
    if (!isExploded) {
        rocketY -= rocketSpeed;
        if (rocketY <= canvas.height / 2 - rocketHeight / 2) {
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
        ctx.drawImage(explosionImg, rocketX, rocketY, rocketWidth, rocketHeight);
    } else {
        ctx.drawImage(rocketImg, rocketX, rocketY, rocketWidth, rocketHeight);
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
