const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let count = 0;

let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;

let food = randomPosition();
let bombs = [];

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

highScoreDisplay.textContent = "High Score: " + highScore;

function randomPosition() {
  return {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid
  };
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (++count < 5) return;
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move snake
  let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // wrap around
  if (head.x < 0) head.x = canvas.width - grid;
  if (head.x >= canvas.width) head.x = 0;
  if (head.y < 0) head.y = canvas.height - grid;
  if (head.y >= canvas.height) head.y = 0;

  snake.unshift(head);

  // eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;

    food = randomPosition();

    // add bomb
    bombs.push(randomPosition());

  } else {
    snake.pop();
  }

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

  // draw bombs
  ctx.fillStyle = "orange";
  bombs.forEach(bomb => {
    ctx.fillRect(bomb.x, bomb.y, grid - 1, grid - 1);

    // bomb collision
    if (head.x === bomb.x && head.y === bomb.y) {
      gameOver("💥 You hit a bomb!");
    }
  });

  // draw snake
  ctx.fillStyle = "lime";
  snake.forEach((part, index) => {
    ctx.fillRect(part.x, part.y, grid - 1, grid - 1);

    // self collision
    if (index !== 0 && head.x === part.x && head.y === part.y) {
      gameOver("🐍 You hit yourself!");
    }
  });
}

function gameOver(message) {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  alert(message + "\nScore: " + score);
  location.reload();
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft" && dx === 0) {
    dx = -grid;
    dy = 0;
  } else if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -grid;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = grid;
    dy = 0;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = grid;
  }
});

requestAnimationFrame(gameLoop);
