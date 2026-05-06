let img;

function preload() {
  img = loadImage("SYMPHONY.png");
}

function setup() {
  createCanvas(400, 400);
  noStroke();
  background(240); // Only once
}

function draw() {

  // -------- IMAGE INSIDE CLIP --------
  push();
  clip(mask);
  image(img, 0, 100, width, height);
  pop();

  // -------- WATERCOLOR OUTSIDE --------
  let x = random(width);
  let y = random(height);
  let r = random(20, 80);

  fill(random(255), random(255), random(255), 10);
  ellipse(x, y, r, r);
  
  // -------- TEXT --------
  fill(0); // reset color (important after random fill)
  text("SYMPHONY", 165, 200);
}

function mask() {
  circle(200, 200, 200);
}