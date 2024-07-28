document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rocketImg = new Image();
    rocketImg.src = 'rocket.png';

    const explosionImg = new Image();
    explosionImg.src = 'explosion.png';

    let rocketX = 0;
    let rocketY = canvas.height - 100;
    let rocketSpeedX = 3;
    let rocketSpeedY = -5;
    let isExploded = false;
    let explosionFrame = 0;

    function drawRocket() {
        ctx.drawImage(rocketImg, rocketX, rocketY, 50, 100);
    }

    function drawExplosion() {
        ctx.drawImage(explosionImg, canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isExploded) {
            drawRocket();
            rocketX += rocketSpeedX;
            rocketY += rocketSpeedY;

            if (rocketY < canvas.height / 2 && rocketX > canvas.width / 2) {
                isExploded = true;
            }
        } else {
            if (explosionFrame < 30) {
                drawExplosion();
                explosionFrame++;
            }
        }

        requestAnimationFrame(update);
    }

    rocketImg.onload = function() {
        update();
    };
});
