document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let rocketY = canvas.height - 100;
    let rocketSpeed = -2;
    let isExploded = false;
    let explosionRadius = 0;

    function drawRocket() {
        ctx.fillStyle = "white";
        ctx.fillRect(canvas.width / 2 - 10, rocketY, 20, 50);
    }

    function drawExplosion() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, rocketY + 25, explosionRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isExploded) {
            drawRocket();
            rocketY += rocketSpeed;

            if (rocketY < canvas.height / 2) {
                isExploded = true;
            }
        } else {
            drawExplosion();
            explosionRadius += 2;
        }

        requestAnimationFrame(update);
    }

    update();
});
