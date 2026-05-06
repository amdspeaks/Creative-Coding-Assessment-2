// ==========================
// TETRIS GAME (p5.js)
// ==========================

// Grid size (10x20 board)
const COLS = 10;
const ROWS = 20;
const SIZE = 30; // size of each block (pixels)

// Game variables
let grid = [];           // stores placed blocks
let currentPiece;        // active falling piece
let gameState = "title"; // title, playing, lose
let score = 0;
let particles = [];      // explosion effect

// Basic tetromino shapes (1 = block, 0 = empty)
const SHAPES = [
  [[1,1,1,1]],          // I
  [[1,1],[1,1]],        // O
  [[0,1,0],[1,1,1]],    // T
  [[1,0,0],[1,1,1]],    // L
  [[0,0,1],[1,1,1]],    // J
];

// ==========================
// SETUP (runs once)
// ==========================
function setup() {
  createCanvas(COLS * SIZE, ROWS * SIZE);
  resetGame();
}

// ==========================
// RESET GAME STATE
// ==========================
function resetGame() {
  // create empty grid
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  spawnPiece();
  score = 0;
}

// ==========================
// MAIN LOOP (runs every frame)
// ==========================
function draw() {
  background(20);

  if (gameState === "title") drawTitle();
  else if (gameState === "playing") gameLoop();
  else if (gameState === "lose") drawEnd();
}

// ==========================
// TITLE SCREEN
// ==========================
function drawTitle() {
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("TETRIS", width/2, height/2 - 20);

  textSize(16);
  text("Press ENTER to Start", width/2, height/2 + 20);
}

// ==========================
// MAIN GAME LOGIC
// ==========================
function gameLoop() {
  drawGrid();        // draw placed blocks
  updatePiece();     // move current piece down
  drawPiece();       // draw current piece
  handleParticles(); // draw particle effects

  fill(255);
  textSize(14);
  text("Score: " + score, 10, 20);
}

// ==========================
// DRAW GRID (placed blocks)
// ==========================
function drawGrid() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      stroke(50);
      fill(grid[r][c] ? 200 : 30); // filled or empty
      rect(c * SIZE, r * SIZE, SIZE, SIZE);
    }
  }
}

// ==========================
// SPAWN NEW PIECE
// ==========================
function spawnPiece() {
  let shape = random(SHAPES);

  currentPiece = {
    shape: shape,
    x: floor(COLS / 2) - 1, // center horizontally
    y: 0                    // start at top
  };

  // if spawn collides → game over
  if (collision(currentPiece.x, currentPiece.y, shape)) {
    gameState = "lose";
  }
}

// ==========================
// UPDATE FALLING PIECE
// ==========================
function updatePiece() {
  // slow falling using frame count
  if (frameCount % 30 === 0) {
    if (!collision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
      currentPiece.y++; // move down
    } else {
      mergePiece();  // lock piece into grid
      clearLines();  // check for full rows
      spawnPiece();  // new piece
    }
  }
}

// ==========================
// DRAW CURRENT PIECE
// ==========================
function drawPiece() {
  fill(0, 200, 255);

  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (currentPiece.shape[r][c]) {
        rect(
          (currentPiece.x + c) * SIZE,
          (currentPiece.y + r) * SIZE,
          SIZE,
          SIZE
        );
      }
    }
  }
}

// ==========================
// COLLISION DETECTION
// checks walls, floor, and blocks
// ==========================
function collision(x, y, shape) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        let newX = x + c;
        let newY = y + r;

        // out of bounds OR hits another block
        if (
          newX < 0 || newX >= COLS ||
          newY >= ROWS ||
          (newY >= 0 && grid[newY][newX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// ==========================
// LOCK PIECE INTO GRID
// ==========================
function mergePiece() {
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (currentPiece.shape[r][c]) {
        grid[currentPiece.y + r][currentPiece.x + c] = 1;
      }
    }
  }
}

// ==========================
// CLEAR FULL LINES
// ==========================
function clearLines() {
  for (let r = ROWS - 1; r >= 0; r--) {

    // if entire row is filled
    if (grid[r].every(cell => cell === 1)) {

      grid.splice(r, 1);                    // remove row
      grid.unshift(Array(COLS).fill(0));    // add empty row at top
      score += 10;

      // create particle effect
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: random(width),
          y: r * SIZE,
          vx: random(-2, 2),
          vy: random(-2, 2),
          life: 30
        });
      }
    }
  }
}

// ==========================
// PARTICLE EFFECT SYSTEM
// ==========================
function handleParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    fill(255, 200, 0);
    noStroke();
    circle(p.x, p.y, 5);

    // move particles
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    // remove when expired
    if (p.life <= 0) particles.splice(i, 1);
  }
}

// ==========================
// ROTATE MATRIX (90°)
// ==========================
function rotateMatrix(matrix) {
  // transpose + reverse rows
  return matrix[0].map((_, i) =>
    matrix.map(row => row[i]).reverse()
  );
}

// ==========================
// INPUT CONTROLS
// ==========================
function keyPressed() {

  // start game
  if (gameState === "title" && keyCode === ENTER) {
    gameState = "playing";
  } 

  // restart after lose
  else if (gameState === "lose" && key === 'r') {
    resetGame();
    gameState = "playing";
  }

  if (gameState === "playing") {

    // move left
    if (keyCode === LEFT_ARROW &&
        !collision(currentPiece.x - 1, currentPiece.y, currentPiece.shape)) {
      currentPiece.x--;
    }

    // move right
    if (keyCode === RIGHT_ARROW &&
        !collision(currentPiece.x + 1, currentPiece.y, currentPiece.shape)) {
      currentPiece.x++;
    }

    // move down faster
    if (keyCode === DOWN_ARROW &&
        !collision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
      currentPiece.y++;
    }

    // rotate piece (with simple wall kick)
    if (key === ' ') {
      let rotated = rotateMatrix(currentPiece.shape);

      if (!collision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
      }
      else if (!collision(currentPiece.x + 1, currentPiece.y, rotated)) {
        currentPiece.x++;
        currentPiece.shape = rotated;
      }
      else if (!collision(currentPiece.x - 1, currentPiece.y, rotated)) {
        currentPiece.x--;
        currentPiece.shape = rotated;
      }
    }
  }
}

// ==========================
// GAME OVER SCREEN
// ==========================
function drawEnd() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("GAME OVER", width/2, height/2);

  textSize(14);
  text("Press R to Restart", width/2, height/2 + 30);
}