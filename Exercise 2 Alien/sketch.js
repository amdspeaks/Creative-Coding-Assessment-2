function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20);

  // Body
  fill(100, 255, 100);
  ellipse(200, 220, 120, 160);

  // Head
  ellipse(200, 140, 140, 120);

  // Eyes
  fill(0);
  ellipse(170, 130, 30, 50);
  ellipse(230, 130, 30, 50);

  // Eye shine
  fill(255);
  ellipse(165, 120, 8, 12);
  ellipse(225, 120, 8, 12);

  // Antennas
  stroke(100, 255, 100);
  strokeWeight(4);
  line(170, 80, 150, 40);
  line(230, 80, 250, 40);

  noStroke();
  fill(255, 100, 100);
  ellipse(150, 40, 10);
  ellipse(250, 40, 10);

  // Arms
  fill(100, 255, 100);
  ellipse(130, 220, 40, 100);
  ellipse(270, 220, 40, 100);

  // Legs
  ellipse(170, 320, 40, 80);
  ellipse(230, 320, 40, 80);
}