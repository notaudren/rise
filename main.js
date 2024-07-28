const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImage = new Image();
backgroundImage.src = 'path/to/your/new/background/image.jpg';

const rocketImage = new Image();
rocketImage.src = 'rocket.png';

const explosionImage = new Image();
explosionImage.src = 'explosion.png';

let rocket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 150, // Adjusted size for the rocket
    height: 150, // Adjusted size for the rocket
    speed: 2,
    exploded: false
};

let backgroundY = 0;
let multiplier = 1.00;
let multiplierIncrement = 0.01;
let gameRunning = true;

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, backgroundImage.height);
    ctx.drawImage(backgroundImage, 0, backgroundY - backgroundImage.height, canvas.width, backgroundImage.height);
}

function drawRocket() {
    if (!rocket.exploded) {
        ctx.drawImage(rocketImage, rocket.x, rocket.y, rocket.width, rocket.height);
    } else {
        ctx.drawImage(explosionImage, rocket.x, rocket.y, rocket.width, rocket.height);
    }
}

function update() {
    if (gameRunning) {
        multiplier += multiplierIncrement;
        backgroundY += rocket.speed;
        if (backgroundY >= backgroundImage.height) {
            backgroundY = 0;
        }
        rocket.y -= rocket.speed;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawRocket();
    ctx.fillStyle = rocket.exploded ? 'red' : 'green';
    ctx.font = '40px Arial';
    ctx.fillText(`x${multiplier.toFixed(2)}`, 50, 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Space key to simulate rocket explosion
        rocket.exploded = true;
        gameRunning = false;
        alert(`You exploded at multiplier x${multiplier.toFixed(2)}`);
    }
});

rocketImage.onload = () => {
    gameLoop();
};
