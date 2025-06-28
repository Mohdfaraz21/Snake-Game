console.log("script working");

document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("game-area");
  const areaSize = 800;
  const cellSize = 20;
  let score = 0;
  let gameStarted = false;
  let food = { x: 300, y: 200 };
  let snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 },
  ];
  let dx = cellSize; // displacement on x axis
  let dy = 0; // displacement on y axis

  function drawScoreBoard() {
    const scoreBoard = document.getElementById('score-board');
    scoreBoard.textContent = `Score: ${score}`; 
  }

  function drawDiv (x, y, className) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    return div;
  }

  function drawFoodAndSnake() {
    // if previously something is drawn remove it
    // wipe out everything and redraw with the new coordinates when snake moves.
    gameArea.innerHTML = '';

    snake.forEach((snakeCell) => {
        const element = drawDiv(snakeCell.x, snakeCell.y, 'snake');
        gameArea.appendChild(element);
    })

     const foodElement = drawDiv(food.x, food.y, 'food');
     gameArea.appendChild(foodElement);

    function moveFood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * ((areaSize - cellSize)/cellSize) * cellSize);
            newY = Math.floor(Math.random() * ((areaSize - cellSize)/cellSize) * cellSize);
        } while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

        food = {x: newX, y: newY};
    }


  }
   function updateSnake() {
    //1. Calculate new coordinate the snake head will go to
    const newHead = {x:snake[0].x + dx, y:snake[0].y + dy}
    snake.unshift(newHead); // add the new head
    if(newHead.x === food.x && newHead.y === food.y) {
        // collision
        score +=5;
        // don't pop the tail

        //move the food
        moveFood();
    } else {
        snake.pop(); // remove the last cell

    }
   } 

  // EVERY ONE SEC WE HAVE TO CHANGE SOMETHING BY THIS FUNCTION
  function gameLoop() {
    setInterval(() => {
        updateSnake();
        drawScoreBoard();
        drawFoodAndSnake();
    }, 1000);
  }

  function runGame() {
    gameStarted = true;
    gameLoop();
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    scoreBoard.textContent = "";
    document.body.insertBefore(scoreBoard, gameArea);

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");
    document.body.appendChild(startButton);

    startButton.addEventListener("click", () => {
      startButton.style.display = "none";
      runGame();
    });
  }
  // this is the first fnc to be executed so that we have make the UI.
  initiateGame();
});
