function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(200, 220, 255); // sky

  // the ground
  fill(100, 200, 100);
  rect(0, 200, width, 100);

  // car body
  noStroke()
  fill(255, 0, 0);
  rect(100, 150, 200, 50); // main body

  // car top
  rect(140, 110, 120, 40);

  // windows
  fill(200, 230, 255);
  rect(150, 115, 40, 30);
  rect(210, 115, 40, 30);

  // wheels
  fill(0);
  ellipse(150, 200, 40, 40);
  ellipse(250, 200, 40, 40);

  // rims for wheel
  fill(180);
  ellipse(150, 200, 20, 20);
  ellipse(250, 200, 20, 20);
}