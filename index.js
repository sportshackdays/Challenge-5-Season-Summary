SCALING_FACTOR = 0.4;
WINDOW_WIDTH = 1080 * SCALING_FACTOR;
WINDOW_HEIGHT = 1920 * SCALING_FACTOR;
CENTER_X = WINDOW_WIDTH / 2;
CENTER_Y = WINDOW_HEIGHT / 2;

let myData, myFont, myFontBold, arrayBG;
let myLogo, myFooter, mySlider;
let logo_w = 346 / 2; //750 / 4;
let logo_h = 116 / 2; //190 / 4;
let footer_w = 375;
let footer_h = 219;
let slider_w = 554;
let slider_h = 75;

function preload() {
	myData = loadJSON('data_dump.json');
  myFont = loadFont('font/PTSans-Regular.ttf');
  myFontBold = loadFont('font/PTSans-Bold.ttf');
	myLogo = loadImage('img/swissski2.png');
	myFooter = loadImage('img/corner-bottom.png');
	mySlider = loadImage('img/corner-wide.png');
	arrayBG = [
		loadImage('img/mountain.jpg'),
		loadImage('img/vlcsnap-2024-10-12-18h24m42s736.jpg')
	]
}

function setup() {
  textFont(myFont, 40);
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
	background(0);
  noStroke();
  frameRate(60);
	info = [
		[ '\nduration', myData.TotalTrainingTime ],
		[ 'time in\nzone 5', round(myData.TimeInZones.zone_5_time, 2) ],
		[ 'longest\nworkout', myData.longest_workout_info.duration ]
	]
}

timer = 0;

rect_height = 100;
rect_margin = 10;

function draw() {
  timer++;
	if (timer > 1000) { return }
	background(100);
	image(arrayBG[0], 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  fill(50);

	image(myLogo, 0, 0, logo_w, logo_h);
	image(myFooter, WINDOW_WIDTH-footer_w, WINDOW_HEIGHT-footer_h, footer_w, footer_h);
	
  fill(255);
	textAlign(CENTER);
  textFont(myFont, 60);
	text('TRAINING', CENTER_X, 180 - min(30, timer));

	c = color(0);
	c.setAlpha(150);
	for (i = 0; i < 3; i++) {
		xx = 3 * timer / (i + 1);
		xx = min(min(xx, 200 + (1 + i) * 60), WINDOW_WIDTH);
		yy = 200 + rect_margin + (i * rect_height);
		fill(c);
  	rect(0, yy, WINDOW_WIDTH, slider_h);
		image(mySlider, xx - slider_w, yy, slider_w, slider_h);
		fill(255);

		textAlign(LEFT);
	  textFont(myFont, 24);
		text(info[i][0], xx + 10, yy + rect_height / 3);

		textAlign(RIGHT);
	  textFont(myFontBold, 76);
		text(info[i][1], xx - 50, yy + rect_height / 1.6);
	}
	
  fill(120);
	//circle(mouseX, mouseY, 20);
  textAlign(RIGHT);
  textFont(myFont, 20);
	text('F: ' + timer + ' | M: ' + int(mouseX) + ',' + int(mouseY), WINDOW_WIDTH-10, WINDOW_HEIGHT-10);
}