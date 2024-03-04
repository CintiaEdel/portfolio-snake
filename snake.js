//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX;
var snakeY;

var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

//food
var foodX;
var foodY;

//game over
var gameOver = false;

window.onload = function() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  placeSnake();
  document.addEventListener("keydown", changeDirection);
  setInterval(update, 1000/10);
}

function update() {
  if (gameOver) {
    return;
  }
  //board
  context.fillStyle="black";
  context.fillRect(0, 0, board.width, board.height);

  //food
  context.fillStyle="red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //snake head
  context.fillStyle="green";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //eat food
  if (snakeX == foodX && snakeY == foodY) {
    placeFood();
    snakeBody.push([foodX, foodY]);
  }

  //move body
  for (let i = snakeBody.length-1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX,snakeY];
  }

  //game over conditions
  if (snakeX < 0 || snakeX > cols*blockSize-1 || snakeY < 0 || snakeY > rows*blockSize-1) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}
//place snake
function placeSnake() {
  snakeX = Math.floor(Math.random() * cols) * blockSize;
  snakeY = Math.floor(Math.random() * rows) * blockSize;
}

//place food
function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

//move snake
function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY == 0) {
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown" && velocityY == 0) {
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX == 0) {
    velocityX = -1;
    velocityY = 0;
  }
  else if (e.code == "ArrowRight" && velocityX == 0) {
    velocityX = 1;
    velocityY = 0;
  }
}
