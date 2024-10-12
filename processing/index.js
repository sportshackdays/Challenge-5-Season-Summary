SCALING_FACTOR = 0.4;
WINDOW_WIDTH = 1080 * SCALING_FACTOR;
WINDOW_HEIGHT = 1920 * SCALING_FACTOR;
CENTER_X = WINDOW_WIDTH / 2;
CENTER_Y = WINDOW_HEIGHT / 2;

let myData, myFont, myFontBold, myLogo, myBG;
let logo_w = 750 / 4;
let logo_h = 190 / 4;

function preload() {
	myData = loadJSON('data_dump.json');
  myFont = loadFont('PTSans-Regular.ttf');
  myFontBold = loadFont('PTSans-Bold.ttf');
	myLogo = loadImage('swissski.png');
	myBG = loadImage('vlcsnap-2024-10-12-18h24m42s736.jpg');
}

function setup() {
  textFont(myFont, 40);
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
	background(0);
  noStroke();
  frameRate(60);
	info = [
		myData.TotalTrainingTime,
		myData.MostCommonSportsType,
		myData.longest_workout_info.duration
	]
}

timer = 0;

rect_height = 50;
rect_margin = 5;

function draw() {
  timer++;
	if (timer > 1200) { return }
	background(100);
	image(myBG, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  fill(50);
  rect(0, WINDOW_HEIGHT-logo_h-20, WINDOW_WIDTH, logo_h+20);
	
	c = color(255);
	c.setAlpha(150);
  textFont(myFontBold, 30);
	for (i = 0; i < 3; i++) {
		xx = 3.2 * timer / (i + 1);
		xx = min(xx, (1 + i) * 100);
		yy = rect_margin + (i * rect_height);
		fill(c);
  	rect(0, yy, xx, rect_height - rect_margin);
		fill(255);
		text(info[i], xx + 5, yy + rect_height / 1.8);
	}
	
	alpha(1.0);
  fill(255);
	textAlign(CENTER);
  textFont(myFontBold, 70);
	text('SEASON\nFLASH', CENTER_X, CENTER_Y + min(100, timer));
	
	image(myLogo, WINDOW_WIDTH-logo_w-10, WINDOW_HEIGHT-logo_h-10, logo_w, logo_h);
	
  fill(150);
	circle(mouseX, mouseY, 20);
  textAlign(LEFT);
  textFont(myFont, 20);
	text('F: ' + timer + ' | M: ' + int(mouseX) + ',' + int(mouseY), 20, WINDOW_HEIGHT-20);
}