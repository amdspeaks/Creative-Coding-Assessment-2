let table;

function preload() {
  table = loadTable("input.csv", "csv", "header");
}

function setup() {
  createCanvas(500, 400);
  textAlign(CENTER);
}

function draw() {
  background(240);

  let rowCount = table.getRowCount();
  let barWidth = width / rowCount;

  for (let i = 0; i < rowCount; i++) {
    let country = table.getString(i, "Country");
    let val = table.getNum(i, "Population"); // FIXED NAME

    let h = map(val, 0, 1500, 0, height - 100);

    fill(100, 150, 255);
    rect(i * barWidth, height - h, barWidth - 10, h);

    fill(0);
    text(country, i * barWidth + barWidth / 2, height - 10);
    text(val, i * barWidth + barWidth / 2, height - h - 10);
  }
}