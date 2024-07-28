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
    y: canvas.height - 150, // La fusée commence en bas
    width: 150, // Taille ajustée de la fusée
    height: 150, // Taille ajustée de la fusée
    speed: 2,
    exploded: false
};

let backgroundY = 0;
let multiplier = 1.00;
let multiplierIncrement = 0.02;
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
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawRocket();
    ctx.fillStyle = rocket.exploded ? 'red' : 'green';
    ctx.font = '80px Arial'; // Augmentation de la taille de la police
    ctx.fillText(`x${multiplier.toFixed(2)}`, canvas.width / 2 - 50, canvas.height / 2 + canvas.height / 4); // Centré et décalé vers le bas
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Espace pour simuler l'explosion de la fusée
        rocket.exploded = true;
        gameRunning = false;
        alert(`Vous avez explosé à un multiplicateur de x${multiplier.toFixed(2)}`);
    }
});

backgroundImage.onload = () => {
    rocketImage.onload = () => {
        explosionImage.onload = () => {
            gameLoop();
        };
    };
};
