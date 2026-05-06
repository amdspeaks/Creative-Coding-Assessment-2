function setup() {
  createCanvas(400, 400);
  noLoop(); // draw once
}

function draw() {
  background(20);

  // Loop through the grid positions
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      
      // Random color
      fill(random(255), random(255), random(255));
      noStroke();

      // Random size
      let size = random(10, 35);

      // Draw repeated shapes
      ellipse(x + 20, y + 20, size, size);
    }
  }
}