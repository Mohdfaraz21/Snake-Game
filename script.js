


const eatSoundUrl = "https://freesound.org/people/Rudmer_Rotteveel/sounds/364924/";
const gameOverSoundUrl = "https://storage.googleapis.com/mixkit/sfx/preview/mixkit-arcade-retro-game-over-2134.mp3";


function playEatSound() {
  const eatSound = new Audio(eatSoundUrl);
  eatSound.volume = 0.5;
  eatSound.play().catch((e) => console.log("Eat sound error:", e));
}

function playGameOverSound() {
  const overSound = new Audio(gameOverSoundUrl);
  overSound.volume = 0.7;
  overSound.play().catch((e) => console.log("Game over sound error:", e));
}

document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("game-area");
  const scoreBoard = document.getElementById("score-board");
  const startButton = document.querySelector(".start-button");
  const pauseButton = document.createElement("button");
  pauseButton.textContent = "Pause";
  pauseButton.classList.add("start-button");
  pauseButton.style.display = "none";
  document.body.appendChild(pauseButton);

  const cellSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--cell-size")
  );
  let areaSize = Math.floor(
    Math.min(gameArea.clientWidth, gameArea.clientHeight)
  );
  areaSize = Math.floor(areaSize / cellSize) * cellSize;
  gameArea.style.width = gameArea.style.height = `${areaSize}px`;

  let snake, dx, dy, food, intervalId, gameSpeed, score, gameStarted;
  let isPaused = false;

  function resetGame() {
    score = 0;
    gameSpeed = 200;
    gameStarted = true;
    dx = cellSize;
    dy = 0;
    snake = [
      { x: cellSize * 5, y: cellSize * 5 },
      { x: cellSize * 4, y: cellSize * 5 },
      { x: cellSize * 3, y: cellSize * 5 },
    ];
    moveFood();
    draw();
    updateScore();
  }

  function updateScore() {
    scoreBoard.textContent = `Score: ${score}`;
  }

  function draw() {
    gameArea.innerHTML = "";
    snake.forEach((part) => {
      const div = document.createElement("div");
      div.className = "snake";
      div.style.left = `${part.x}px`;
      div.style.top = `${part.y}px`;
      gameArea.appendChild(div);
    });
    const foodEl = document.createElement("div");
    foodEl.className = "food";
    foodEl.style.left = `${food.x}px`;
    foodEl.style.top = `${food.y}px`;
    gameArea.appendChild(foodEl);
  }

  function moveFood() {
    let x, y;
    do {
      x = Math.floor(Math.random() * (areaSize / cellSize)) * cellSize;
      y = Math.floor(Math.random() * (areaSize / cellSize)) * cellSize;
    } while (snake.some((s) => s.x === x && s.y === y));
    food = { x, y };
  }

  function changeDirection(e) {
    if (e.key === "ArrowUp" && dy === 0) {
      dx = 0;
      dy = -cellSize;
    } else if (e.key === "ArrowDown" && dy === 0) {
      dx = 0;
      dy = cellSize;
    } else if (e.key === "ArrowLeft" && dx === 0) {
      dx = -cellSize;
      dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
      dx = cellSize;
      dy = 0;
    }
  }

  function isGameOver() {
    const head = snake[0];
    const hitWall =
      head.x < 0 || head.x >= areaSize || head.y < 0 || head.y >= areaSize;
    const hitSelf = snake
      .slice(1)
      .some((s) => s.x === head.x && s.y === head.y);
    return hitWall || hitSelf;
  }

  function gameLoop() {
    intervalId = setInterval(() => {
      if (!gameStarted || isPaused) return;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        // eatSound.currentTime = 0;
        // eatSound.play();

        score += 5;
        updateScore();
        moveFood();
        playEatSound();
        if (gameSpeed > 50) {
          clearInterval(intervalId);
          gameSpeed -= 10;
          gameLoop();
        }
      } else {
        snake.pop();
      }

      if (isGameOver()) {
        clearInterval(intervalId);
        playGameOverSound();
        // gameOverSound.currentTime = 0;
        // gameOverSound.play();

        alert(`Game Over! Score: ${score}`);
        gameStarted = false;
        startButton.style.display = "inline-block";
        pauseButton.style.display = "none";
        pauseButton.textContent = "Pause";
        isPaused = false;
      }

      draw();
    }, gameSpeed);
  }

  startButton.addEventListener("click", () => {
    pauseButton.style.display = "inline-block";
    startButton.style.display = "none";
    resetGame();
    gameLoop();
    document.addEventListener("keydown", changeDirection);
  });
  pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
  });
});
