var tg1Music;
var tg1Img;


function preload() {
  tg1Music = loadSound('assets/TG1_bumper.mp3');
  tg1Img = loadImage('assets/TG1-01.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  tg1Music.amp(0.2);
  angleMode(DEGREES);
  background(20);
  frameRate(30);
}

function draw() {
  waveCircle();
  if (frameCount % 180 == 0) {
    background(20);
  }
  push();
  translate(0,0,cos(frameCount) * -150);
  imageMode(CENTER);
  image(tg1Img, 0, 0, 240, 170);
  pop();
}

function togglePlay() {
  if (tg1Music.isPlaying()) {
    tg1Music.pause();
  } else {
    tg1Music.loop();
  }
}

function waveCircle() {
  let waveform = fft.waveform();
  noFill();
  blendMode(MULTIPLY);
  // background(20,20,20,10);
  blendMode(BLEND);
  beginShape();
  stroke("#F9C33D");
  strokeWeight(1);
  translate(0, 0, cos(frameCount) * 750);
  for (var i = 0; i < waveform.length; i++) {
    let r = map(i, 0, waveform.length, 0, 360);
    let h = map(waveform[i], -1, 1, 50, 120);
    vertex(sin(r) * h, cos(r) * h);
  }
  endShape();

}
