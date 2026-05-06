let word = "Greetings";

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(60);
  noLoop(); // static effect
}

function draw() {
  background(20);

  // Draw multiple layers of the same text
  for (let i = 0; i < 10; i++) {
    fill(random(255), random(255), random(255), 80);
    
    // Slight random offset for glitch effect
    let xOffset = random(-10, 10);
    let yOffset = random(-10, 10);

    text(word, width / 2 + xOffset, height / 2 + yOffset);
  }

  // Main clean text on top
  fill(255);
  text(word, width / 2, height / 2);
}