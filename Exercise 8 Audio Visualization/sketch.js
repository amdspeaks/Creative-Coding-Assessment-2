let sound;
function preload() {
  
  sound = loadSound('Dance.mp3')
}




function setup() {
  createCanvas(600, 400);
  sound.loop();
}

function draw() {
  background(0);
  
  beginShape();
  for (let i = 0; i < width; i++) {
    let y = noise(i * 0.5) * 100;
    vertex(i, y + height / 2);
  }
  endShape();
}