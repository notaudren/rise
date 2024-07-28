import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let rocket;
let multiplier = 1.0;
let gameRunning = false;
let explosion;
let gameText;

function preload() {
    this.load.image('rocket', 'assets/rocket.png');
    this.load.image('explosion', 'assets/explosion.png');
}

function create() {
    rocket = this.physics.add.sprite(400, 500, 'rocket');
    gameText = this.add.text(10, 10, 'Multiplier: 1.0x\nGains: 1.0$', { fontSize: '32px', fill: '#fff' });

    this.time.addEvent({
        delay: 500, // 0.5 second interval for faster multiplier
        callback: updateMultiplier,
        callbackScope: this,
        loop: true
    });

    this.input.keyboard.on('keydown-SPACE', withdrawGains, this);

    startGame();
}

function update() {
    if (gameRunning) {
        rocket.y -= 2; // La fusée monte
    }
}

function startGame() {
    gameRunning = true;
    multiplier = 1.0;
    rocket.setVisible(true);
    rocket.y = 500;
}

function updateMultiplier() {
    if (!gameRunning) return;

    multiplier += 0.2; // Increase multiplier faster
    gameText.setText(`Multiplier: ${multiplier.toFixed(1)}x\nGains: ${multiplier.toFixed(1)}$`);
    
    // Simulate random explosion
    if (Math.random() < 0.05) { // Adjust the probability as needed
        explode();
    }
}

function withdrawGains() {
    if (!gameRunning) return;

    gameRunning = false;
    gameText.setText(`Félicitations ! Vous avez retiré à ${multiplier.toFixed(1)}x ! Gains : ${multiplier.toFixed(1)}$`);

    // Envoyer le multiplicateur au bot Telegram via une API
    // Par exemple, utiliser fetch pour appeler une API
    fetch('/withdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ multiplier })
    });
}

function explode() {
    gameRunning = false;
    rocket.setVisible(false);
    explosion = this.add.sprite(rocket.x, rocket.y, 'explosion');
    gameText.setText(`Vous n'avez pas retiré vos gains à temps !`);
}
