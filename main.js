const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImage = new Image();
backgroundImage.src = 'star-background.jpg'; // Remplacez par le bon chemin

const rocketImage = new Image();
rocketImage.src = 'rocket.png';

const explosionImage = new Image();
explosionImage.src = 'explosion.png';

let rocket = {
    x: canvas.width / 2 - 75 * 4, // Centré horizontalement
    y: canvas.height / 2 - 75 * 4 - 100, // Centré verticalement avec un décalage vers le haut
    width: 150 * 4, // Taille ajustée de la fusée (4 fois plus grande)
    height: 150 * 4, // Taille ajustée de la fusée (4 fois plus grande)
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
    ctx.textAlign = 'center';
    ctx.fillText(`x${multiplier.toFixed(2)}`, canvas.width / 2, canvas.height * 3 / 4); // Centré et décalé vers le bas
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

// Redimensionne le canvas lorsque la taille de la fenêtre change
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rocket.x = canvas.width / 2 - rocket.width / 2; // Recentre la fusée
    rocket.y = canvas.height / 2 - rocket.height / 2 - 100; // Replace la fusée au centre de l'écran avec un décalage vers le haut
});
