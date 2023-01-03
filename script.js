const player = document.querySelector(".player");
const obstacle = document.querySelector(".obstacle");
const gameOver = document.querySelector(".gameOver");

let score = 0;
let crossed = true;
let audio = new Audio("gameover.mp3");

document.onkeydown = function (e) {
    if (e.keyCode == 38) {
        player.classList.add("animation");
        setTimeout(() => {
            player.classList.remove("animation");
        }, 700);
    }
    if (e.keyCode == 39) {
        let playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
        player.style.left = (playerX + 112) + "px";
    }
    if (e.keyCode == 37) {
        let playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
        player.style.left = (playerX - 112) + "px";
    }
}

setInterval(() => {
    px = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
    py = parseInt(window.getComputedStyle(player, null).getPropertyValue("right"));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("right"));

    offsetX = Math.abs(px - ox);
    offsetY = Math.abs(py - oy);

    if (offsetX < 73 && offsetY > 52) {
        gameOver.innerHTML = "Game Over - Reload";
        obstacle.classList.remove("animate");
        audio.play();
        setTimeout(() => {
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && crossed) {
        score++;
        updateScore(score);
        crossed = false;
        setTimeout(() => {
            crossed = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + "s";
        }, 500)
    }
}, 10);

function updateScore(score) {
    document.querySelector(".scoreCount").innerHTML = "Your Score: " + score;
}