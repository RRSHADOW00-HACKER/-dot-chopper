const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = { x: 320, y: 320 };

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (++count < 4) return;
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move snake
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // eat food
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * 20) * grid;
    food.y = Math.floor(Math.random() * 20) * grid;
  } else {
    snake.pop();
  }

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

  // draw snake
  ctx.fillStyle = "lime";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, grid - 1, grid - 1);
  });
}

let count = 0;
requestAnimationFrame(gameLoop);

// controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    dx = -grid; dy = 0;
  } else if (e.key === "ArrowUp") {
    dx = 0; dy = -grid;
  } else if (e.key === "ArrowRight") {
    dx = grid; dy = 0;
  } else if (e.key === "ArrowDown") {
    dx = 0; dy = grid;
  }
});
