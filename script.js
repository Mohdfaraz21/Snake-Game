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

     const foodElement = drawDiv(food.x, food.y, 'food');
     gameArea.appendChild(foodElement);


  }


  // EVERY ONE SEC WE HAVE TO CHANGE SOMETHING BY THIS FUNCTION
  function gameLoop() {
    setInterval(() => {
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
