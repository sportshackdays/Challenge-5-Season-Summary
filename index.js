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
		loadImage('img/mountain2.jpg'),
		loadImage('img/mountain3.jpg'),
		loadImage('img/stable-athlete.jpg')
	]
}

function setup() {
  textFont(myFont, 40);
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
	background(0);
  noStroke();
  frameRate(60);
	info = [
		[ '\nduration', myData.TotalTrainingTime, 60 ],
		[ 'top\nactivity', myData.MostCommonSportsType, 70 ],
		[ 'longest\nworkout', myData.longest_workout_info.duration, 74 ]
	]
	setupChart();
}

timer = 0;

rect_height = 100;
rect_margin = 10;

function draw() {

	//return scene3 ();

  timer++;
	if (timer < 500) { scene1(); }
	else if (timer < 1000) { scene2(); }  
	else if (timer < 1400) { scene3(); }  
	else if (timer < 1900) { scene4(); }  
	else { 
		timer = t2 = t3 = t4 = 0;
	}  

	return;

	// For debugging:
	fill(120);
	circle(mouseX, mouseY, 20);
  textAlign(RIGHT);
  textFont(myFont, 20);
	text('T: ' + timer + ' | M: ' + int(mouseX) + ',' + int(mouseY), WINDOW_WIDTH-10, WINDOW_HEIGHT-10);
}

function footerText(message) {
	rotate(-0.59);
	textAlign(LEFT);
  textFont(myFontBold, 45);
  fill(0);
	text('\n       ' + message, -350, WINDOW_HEIGHT * 0.9);
	rotate(0);
}

function scene1() {
	background(100);
	image(arrayBG[0], 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
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
		xx = min(xx, WINDOW_WIDTH * info[i][2] / 100);
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

	footerText('#seasonflash');
}

let t2 = 0;
function scene2() {
	background(100);
	image(arrayBG[1], 1-min(1000, ++t2)/3, 0, WINDOW_WIDTH*3, WINDOW_HEIGHT);
	image(myLogo, 0, 0, logo_w, logo_h);

  fill(255);
	textAlign(RIGHT);
  textFont(myFont, 50);
	text('SEASON\n2023/24', WINDOW_WIDTH-10, 50);
  textFont(myFont, 20);
	text('Training time by month', WINDOW_WIDTH-10, 160);

  drawChart();

	image(myFooter, WINDOW_WIDTH-footer_w, WINDOW_HEIGHT-footer_h, footer_w, footer_h);
}

let t3 = 0;
function scene3() {
	background(100);
	image(arrayBG[2], 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  fill(0);
	textAlign(LEFT);
  let xx, yy = 0;
  let MARGIN_TOP = 40 - (++t3)/8;
  myData.day_in_the_life_of.forEach(function(d) {
  	xx = 10;
  	++yy; let yym = MARGIN_TOP + (yy * 100);
  	textFont(myFontBold, 32);
		text(d['type'], xx + 10, yym);
  	fill('#E2001A');
		text(d.start_time, xx + 300, yym);
		text(d.end_time, xx + 300, yym+35);
  	fill(0);
  	textFont(myFont, 20);
		text(d.method.replace('/', '\n'), xx + 10, yym + 30);
  });

  fill('#E2001A');
	textAlign(LEFT);
  textFont(myFont, 50);
	text('JULY 6\n2024', 20, WINDOW_HEIGHT-160 + (t3/10));

	image(myLogo, 0, 0, logo_w, logo_h);
	image(myFooter, WINDOW_WIDTH-footer_w, WINDOW_HEIGHT-footer_h, footer_w, footer_h);

  rotate(-0.59);
	textAlign(LEFT);
  textFont(myFontBold, 45);
  fill(255);
	text('\n        Day in the life', -350, WINDOW_HEIGHT * 0.9);
	rotate(0);
}

let t4 = 0;
function scene4() {
	background(100);
	image(arrayBG[3], -20, 1-min(500, ++t4)/4, WINDOW_WIDTH*1.2, WINDOW_HEIGHT*1.2);
	image(myLogo, 0, 0, logo_w, logo_h);
	image(myFooter, WINDOW_WIDTH-footer_w, WINDOW_HEIGHT-footer_h, footer_w, footer_h);

  rotate(-0.59);
	textAlign(LEFT);
  textFont(myFontBold, 45);
  fill(255);
	text('  Share me\n', -350, WINDOW_HEIGHT * 0.9);
  fill(0);
	text('\n       #seasonflash', -350, WINDOW_HEIGHT * 0.9);
	rotate(0);
}