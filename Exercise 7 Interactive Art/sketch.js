let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(400, 400, WEBGL); // enables 3D with WEBGL
}

function draw() {
  background(30);

  // lighting
  ambientLight(120);
  directionalLight(255, 255, 255, 0.5, 1, -1);

  // apply rotation
  rotateX(angleX);
  rotateY(angleY);

  // cube
  normalMaterial();
  box(150);
}

// rotate when mouse is dragged
function mouseDragged() {
  angleY += movedX * 0.01;
  angleX += movedY * 0.01;
}