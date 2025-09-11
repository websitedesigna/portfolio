let snakeCanvas, ctx1, snake, dx, dy, food, snakeInterval;

function startSnake() {
  snakeCanvas = document.getElementById('snakeGame');
  ctx1 = snakeCanvas.getContext('2d');
  snakeCanvas.width = snakeCanvas.offsetWidth;
  snakeCanvas.height = snakeCanvas.offsetHeight;

  snake = [{ x: 50, y: 50 }];
  dx = 10; dy = 0;
  food = { x: 100, y: 100 };

  document.addEventListener("keydown", changeDirection);
  clearInterval(snakeInterval);
  snakeInterval = setInterval(drawSnakeGame, 100);
}

function drawSnakeGame() {
  ctx1.fillStyle = "#111";
  ctx1.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  ctx1.fillStyle = "lime";
  snake.forEach(part => ctx1.fillRect(part.x, part.y, 10, 10));

  ctx1.strokeStyle = "red";
  ctx1.strokeRect(food.x, food.y, 10, 10);

  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (snakeCanvas.width / 10)) * 10,
      y: Math.floor(Math.random() * (snakeCanvas.height / 10)) * 10
    };
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height ||
      snake.slice(1).some(p => p.x === head.x && p.y === head.y)) {
    clearInterval(snakeInterval);
    alert("Game Over!");
  }
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -10; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 10; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -10; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = 10; dy = 0; }
  if (e.key === "w" && dy === 0) { dx = 0; dy = -10; }
  if (e.key === "s" && dy === 0) { dx = 0; dy = 10; }
  if (e.key === "a" && dx === 0) { dx = -10; dy = 0; }
  if (e.key === "d" && dx === 0) { dx = 10; dy = 0; }
} 

function triggerGradient() {
  alert("Gradient is already animating! 😎");
}
