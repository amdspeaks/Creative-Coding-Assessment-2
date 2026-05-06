let trail = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  // Slight fade instead of full clear (creates trail effect)
  background(0, 30);

  // Add current mouse position to trail
  trail.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 25)
  });

  // Limit trail length
  if (trail.length > 40) {
    trail.shift();
  }

  // Draw trail
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];

    // Fade older points
    let alpha = map(i, 0, trail.length, 50, 255);

    fill(random(255), random(255), random(255), alpha);
    ellipse(t.x, t.y, t.size);
  }
}