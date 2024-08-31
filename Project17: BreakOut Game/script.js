const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.getElementById("rules");
const closeBtn = document.getElementById("close");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bricksRowCount = 9;
const bricksColumnCount = 5;

let score = 0;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 100,
  h: 10,
  speed: 8,
  dx: 0,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offSetX: 45,
  offSetY: 60,
  visible: true,
};

//Create Bricks
const bricks = [];

for (let row = 0; row < bricksRowCount; row++) {
  bricks[row] = [];
  for (let col = 0; col < bricksColumnCount; col++) {
    const x = row * (brickInfo.w + brickInfo.padding) + brickInfo.offSetX;
    const y = col * (brickInfo.h + brickInfo.padding) + brickInfo.offSetY;

    bricks[row][col] = { x, y, ...brickInfo };
  }
}
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}
function draw() {
  //Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}
function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //Paddle collision cotrol
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y &&
    ball.y - ball.size < paddle.y + paddle.h
  ) {
    ball.dy = -ball.speed;
  }

  //Brick collision control
  bricks.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  if (ball.size + ball.y > canvas.height) {
    showAllBricks();
    score = 0;
  }
}
function update() {
  movePaddle();
  moveBall();
  draw();

  requestAnimationFrame(update);
}
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

function increaseScore() {
  score++;

  if (score % (bricksRowCount * bricksColumnCount) === 0) {
    showAllBricks();
  }
}
function showAllBricks() {
  bricks.forEach((col) => {
    col.forEach((brick) => (brick.visible = true));
  });
}
rulesBtn.addEventListener("click", () => {
  rulesContainer.classList.add("show");
  rulesBtn.style.display = "none";
});
closeBtn.addEventListener("click", () => {
  rulesContainer.classList.remove("show");
  rulesBtn.style.display = "block";
});
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
update();
