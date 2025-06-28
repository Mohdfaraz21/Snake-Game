// console.log("script working");

// document.addEventListener("DOMContentLoaded", () => {
//   const gameArea = document.getElementById("game-area");
//   const areaSize = 800;
//   const cellSize = 20;
//   let score = 0;
//   let gameStarted = false;
//   let food = { x: 300, y: 200 };
//   let snake = [
//     { x: 160, y: 200 },
//     { x: 140, y: 200 },
//     { x: 120, y: 200 },
//   ];
//   let dx = cellSize; // displacement on x axis
//   let dy = 0; // displacement on y axis
//   let gameSpeed = 200;
//   let intervalId;

//   function drawScoreBoard() {
//     const scoreBoard = document.getElementById("score-board");
//     scoreBoard.textContent = `Score: ${score}`;
//   }

//   function drawDiv(x, y, className) {
//     const div = document.createElement("div");
//     div.classList.add(className);
//     div.style.top = `${y}px`;
//     div.style.left = `${x}px`;
//     return div;
//   }

//   function drawFoodAndSnake() {
//     // if previously something is drawn remove it
//     // wipe out everything and redraw with the new coordinates when snake moves.
//     gameArea.innerHTML = "";

//     snake.forEach((snakeCell) => {
//       const element = drawDiv(snakeCell.x, snakeCell.y, "snake");
//       gameArea.appendChild(element);
//     });

//     const foodElement = drawDiv(food.x, food.y, "food");
//     gameArea.appendChild(foodElement);
//   }

//   function moveFood() {
//     let newX, newY;
//     do {
//       newX =
//         Math.floor(Math.random() * ((areaSize - cellSize) / cellSize)) *
//         cellSize;
//       newY =
//         Math.floor(Math.random() * ((areaSize - cellSize) / cellSize)) *
//         cellSize;
//     } while (
//       snake.some((snakeCell) => snakeCell.x === newX && snakeCell.y === newY)
//     );

//     food = { x: newX, y: newY };
//   }
//   function updateSnake() {
//     //1. Calculate new coordinate the snake head will go to
//     const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
//     snake.unshift(newHead); // add the new head
//     if (newHead.x === food.x && newHead.y === food.y) {
//       // collision
//       score += 5;
//       if(gameSpeed > 30) {
//         clearInterval(intervalId);
//         gameSpeed -= 10;
//         gameLoop();

//       }
//       // don't pop the tail
//       //move the food
//       moveFood();
//     } else {
//       snake.pop(); // remove the last cell
//     }
//   }

//   function isGameOver() {
//     // check snake body hit
//     for (i = 1; i < snake.length; i++) {
//       if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
//     }

//     //check Wall Collision
//     const isHittingLeftWall = snake[0].x < 0;
//     const isHittingTopWall = snake[0].y < 0;
//     const isHittingRightWall = snake[0].x >= areaSize;
//     const isHittingDownWall = snake[0].y >= areaSize;

//     // game over.
//     return (
//       isHittingDownWall ||
//       isHittingLeftWall ||
//       isHittingRightWall ||
//       isHittingTopWall
//     );
//   }
//   // EVERY ONE SEC WE HAVE TO CHANGE SOMETHING BY THIS FUNCTION
//   function gameLoop() {
//     intervalId =  setInterval(() => {
//       if (!gameStarted) return;
//       // check for game over
//       if (isGameOver()) {
//         gameStarted = false;
//         alert(`Game Over, Score = ${score}`);
//         window.location.reload();
//         return;
//       }
//       updateSnake();
//       drawScoreBoard();
//       drawFoodAndSnake();
//     }, gameSpeed);
//   }

//   function changeDirection(e) {
//     const LEFT_KEY = 37;
//     const RIGHT_KEY = 39;
//     const UP_KEY = 38;
//     const DOWN_KEY = 40;

//     const keyPressed = e.keyCode;

//     const isGoingUp = dy === -cellSize;
//     const isGoingDown = dy === cellSize;
//     const isGoingLeft = dx === -cellSize;
//     const isGoingRight = dx === cellSize;

//     if (keyPressed === LEFT_KEY && !isGoingRight) {
//       dy = 0;
//       dx = -cellSize;
//     }
//     if (keyPressed === RIGHT_KEY && !isGoingLeft) {
//       dy = 0;
//       dx = cellSize;
//     }
//     if (keyPressed === UP_KEY && !isGoingDown) {
//       dy = -cellSize;
//       dx = 0;
//     }
//     if (keyPressed === DOWN_KEY && !isGoingUp) {
//       dy = cellSize;
//       dx = 0;
//     }
//   }

//   function runGame() {
//     if (!gameStarted) {
//       gameStarted = true;
//       gameLoop();
//       document.addEventListener("keydown", changeDirection);
//     }
//   }

//   function initiateGame() {
//     const scoreBoard = document.createElement("div");
//     scoreBoard.id = "score-board";
//     scoreBoard.textContent = "";
//     document.body.insertBefore(scoreBoard, gameArea);

//     const startButton = document.createElement("button");
//     startButton.textContent = "Start Game";
//     startButton.classList.add("start-button");
//     document.body.appendChild(startButton);

//     startButton.addEventListener("click", () => {
//       startButton.style.display = "none";
//       runGame();
//     });
//   }
//   // this is the first fnc to be executed so that we have make the UI.
//   initiateGame();
// });


document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("game-area");
  const scoreBoard = document.getElementById("score-board");
  const startButton = document.querySelector(".start-button");

  const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell-size'));
  let areaSize = Math.floor(Math.min(gameArea.clientWidth, gameArea.clientHeight));
  areaSize = Math.floor(areaSize / cellSize) * cellSize;
  gameArea.style.width = gameArea.style.height = `${areaSize}px`;

  let snake, dx, dy, food, intervalId, gameSpeed, score, gameStarted;

  function resetGame() {
    score = 0;
    gameSpeed = 200;
    gameStarted = true;
    dx = cellSize;
    dy = 0;
    snake = [
      { x: cellSize * 5, y: cellSize * 5 },
      { x: cellSize * 4, y: cellSize * 5 },
      { x: cellSize * 3, y: cellSize * 5 }
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
    snake.forEach(part => {
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
    } while (snake.some(s => s.x === x && s.y === y));
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
    const hitWall = head.x < 0 || head.x >= areaSize || head.y < 0 || head.y >= areaSize;
    const hitSelf = snake.slice(1).some(s => s.x === head.x && s.y === head.y);
    return hitWall || hitSelf;
  }

  function gameLoop() {
    intervalId = setInterval(() => {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score += 5;
        updateScore();
        moveFood();
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
        alert(`Game Over! Score: ${score}`);
        gameStarted = false;
        startButton.style.display = "inline-block";
      }

      draw();
    }, gameSpeed);
  }

  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    resetGame();
    gameLoop();
    document.addEventListener("keydown", changeDirection);
  });
});
