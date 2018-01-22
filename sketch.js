/*
 *
 * Coca-Cola
 * Store Distribution (January 2017)
 * Klustera
 * Adrian Santuario
 *
 * Test: https://santuario.github.io/KLUSTERA_Coca-Cola_Stores/
 */


/*
 *****************************************
 *****************************************
 * VARIABLES
 *****************************************
 *************
 */


// Background
var backgroundImage;

// Header
var logoHeader;


// Locator
var locatorImage;

// Points
var points = [];

// Key Points
var keyPoints = [];

// Items
var items = [];
var itemsCount = 16;

// Font
var geoMidFont
var geoSmallFont;

var currentPosition;
var currentPositions = [];


// Table
var table
var lines = [];


// UI
var showPaths = true;




/*
 *****************************************
 *****************************************
 * LYFE CYCLE METHODS
 *****************************************
 *****************************************
 */


function preload() {
  // Backgrund
  backgroundImage = loadImage("assets/images/MapTepeyacDark.png");


  //KeyItems

  for (var i = 0; i < 2; i++) {
    var nameImage = "assets/images/KeyPoints_" + i + "_0.png";
    window['imgKeyPoints_' + i + "_0"] = loadImage(nameImage);
  }


  // Locator
  locatorImage = loadImage("assets/images/location.png");

  //Header
  logoHeader = loadImage("assets/images/cocacola.png");


  // Fonts
  geoMidFont = loadFont('assets/fonts/Geogtq-Md.otf');
  geoSmallFont = loadFont('assets/fonts/Geogtq-Ul.otf');


  // table
  table = loadTable('assets/data/paths.csv', 'csv', 'header');

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);


  initializePoints();
  initializeKeyPoints();
  //initializeItems();
}


function setup() {

  createCanvas(displayWidth, displayHeight);

  initialize();
}

function draw() {


  drawBackground();
  drawLocator();
  drawPoints();
  drawKeyPoints();
  drawClock();
  drawItems();



}




/*
 *****************************************
 *****************************************
 * INITIALIZE METHODS
 *****************************************
 *****************************************
 */

function initialize() {

  initializeTable();
  initializeBackground();
  initializeLocator();
  initializePoints();
  initializeClock();
  initializeKeyPoints();
  initializeItems();

}



/*
 *****************************************
 *****************************************
 * BACKGROUND METHODS
 *****************************************
 *****************************************
 */


function initializeBackground() {


}



function drawBackground() {


  var correctionXS = (windowWidth / 2) - (backgroundImage.width / 2);
  var correctionYS = (windowHeight / 2) - (backgroundImage.height / 2);

  image(backgroundImage, correctionXS, correctionYS);

}


/*
 *****************************************
 *****************************************
 * LOCATOR METHODS
 *****************************************
 *****************************************
 */


function initializeLocator() {


}



function drawLocator() {

  /*
    var correctionXS = (windowWidth / 2) - (locatorImage.width / 2);
    var correctionYS = (windowHeight / 2) - (locatorImage.height / 2);
  */
  image(locatorImage, windowWidth / 2 - 5, windowHeight / 2 - 5);

}



/*
 *****************************************
 *****************************************
 * POINTS METHODS
 *****************************************
 *****************************************
 */


function initializePoints() {

  //print(table.getNum(0, 5));

  for (var r = 0; r < table.getRowCount(); r++) {



  }

  lines.length = 0;

  for (var i = 0; i < table.getNum(0, 5); i++) {
    var rows = table.findRows(str(i + 1), 'line');
    lines.push(rows);
  }


  //print(lines[0][0].getString("x"));
  //print(lines[0].length );



}



function drawPoints() {

  // currentPositions.length = 0;

  for (var i = 0; i < table.getNum(0, 5); i++) {

    noFill();
    stroke(128);

    if (showPaths) {

      beginShape();

      for (var j = 0; j < lines[i].length; j++) {
        vertex(windowWidth / 2 - lines[i][j].getNum("x"), windowHeight / 2 - lines[i][j].getNum("y"));
      }

      endShape(CLOSE);

    }


    var progress = map(mouseX, 0, windowWidth, 0, lines[i].length - 1);
    var index = floor(progress);



    if (typeof lines[i][index] != 'undefined' && typeof lines[i][index + 1] != 'undefined') {

      var firstP = createVector(windowWidth / 2 - lines[i][index].getNum("x"), windowHeight / 2 - lines[i][index].getNum("y"));

      var secondP = createVector(windowWidth / 2 - lines[i][index + 1].getNum("x"), windowHeight / 2 - lines[i][index + 1].getNum("y"));



      var px = lerp(firstP.x, secondP.x, progress - index);
      var py = lerp(firstP.y, secondP.y, progress - index);



      currentPositions[i] = createVector(px, py);

      fill(150, 220);
      noStroke();

      ellipse(currentPositions[i].x, currentPositions[i].y, 8, 8);

      currentPosition = createVector(px, py);




    }

  }















}


/*
 *****************************************
 *****************************************
 * CLOCK METHODS
 *****************************************
 *****************************************
 */


function initializeClock() {

}


function drawClock() {

  fill(255);
  textAlign(LEFT, TOP);
  noStroke();
  //Title
  textFont(geoMidFont);
  textSize(30);
  image(logoHeader, 30, 20);
  text("Abarrotes La Poblanita", 30, 60);

  //Subtitle
  textFont(geoSmallFont);
  textSize(20);
  text("Calle Garrido 66, Villa Gustavo A. Madero, 07000, CDMX", 30, 100, (windowWidth / 2) - 50, windowHeight);

  //Clock
  textAlign(RIGHT, TOP);
  textFont(geoMidFont);
  textSize(50);
  var timeText = "";
  var timeSupportText = "";
  var hourFloat = round(map(mouseX, 0, windowWidth, 0, 23));
  var minFloat = round(map(mouseX, 0, windowWidth, 0, 1440));
  minFloat = minFloat % 60;

  var hourText = str(hourFloat);
  var minText = str(minFloat);

  if (hourFloat < 10) {
    hourText = "0" + hourText;
  }

  if (hourFloat < 12) {
    timeSupportText = "AM";
  } else {
    timeSupportText = "PM";
  }

  if (minFloat < 10) {
    minText = "0" + minText;
  }




  timeText = hourText + ":" + minText;
  text(timeText, windowWidth - 60, 20);

  textAlign(LEFT, TOP);
  textFont(geoSmallFont);
  textSize(25);
  text(timeSupportText, windowWidth - 55, 30);



}




/*
 *****************************************
 *****************************************
 * KEYPOINTS METHODS
 *****************************************
 *****************************************
 */



function initializeKeyPoints() {
  keyPoints.length = 0;

  for (var k = 0; k < table.getNum(0, 5); k++) {
    var keyPointsTMP = [];
    for (var i = 0; i < lines[k].length; i++) {
      //print(lines[k][i].getString("key"));
      if (lines[k][i].getString("key") == 'YES') {
        var p = createVector(lines[k][i].getNum("x"), lines[k][i].getNum("y"));
        keyPointsTMP.push(p);
      }
    }

    keyPoints[k] = keyPointsTMP;
  }

}



function drawKeyPoints() {

  for (var k = 0; k < table.getNum(0, 5); k++) {
    for (var i = 0; i < keyPoints[k].length; i++) {
      var d = dist((windowWidth / 2) - keyPoints[k][i].x, (windowHeight / 2) - keyPoints[k][i].y, currentPositions[k].x, currentPositions[k].y);
      if (d < 20) {
        // Keypoints

        var posX = -80;
        var posY = 180;
        fill(255)

        var itemPosX = (windowWidth / 2) - keyPoints[k][i].x;
        var itemPosY = (windowHeight / 2) - keyPoints[k][i].y;
        ellipse(itemPosX, itemPosY, 20, 20);

        //Title

        textAlign(LEFT, CENTER);
        textFont(geoMidFont);
        textSize(24);
        //text("Agasis", itemPosX - posX, itemPosY - posY);

        image(window['imgKeyPoints_' + k + "_0"], itemPosX - posX, itemPosY - posY);


        //Stroke
        stroke(255, 255, 255, 255);
        strokeWeight(2);
        line(itemPosX, itemPosY, itemPosX - posX, itemPosY - posY + 40);

      }
    }
  }



}


/*
 *****************************************
 *****************************************
 * ITEMS METHODS
 *****************************************
 *****************************************
 */


function initializeItems() {

  items.length = 0;

  for (var i = 0; i < table.getNum(0, 5); i++) {

    var itemsTMP = [];

    for (var j = 0; j < lines[i][0].getNum("count"); j++) {

      var s = floor(random(2, 10));
      //itemsTMP.push(new Item(windowWidth / 2 - lines[i][0].getNum("x"), windowHeight / 2 - lines[i][0].getNum("y")));
      itemsTMP.push(new Item(floor(random(s, windowWidth - s)), floor(random(s, windowHeight - s)), s));
      //itemsTMP.push(new Item(currentPositions[i].x,currentPositions[i].y));

    }

    items[i] = itemsTMP;


  }


  // print(items[0].length);



}


function drawItems() {


  for (var k = 0; k < table.getNum(0, 5); k++) {

    for (var i = 0; i < items[k].length; i++) {
      items[k][i].targetPosition = currentPositions[k];
      items[k][i].update();
      items[k][i].display();
      items[k][i].checkBoundaryCollision();
      for (var j = 0; j < items[k].length; j++) {
        items[k][j].checkCollision(items[k][i]);
      }
    }
  }


}


/*
 *****************************************
 *****************************************
 * TABLE METHODS
 *****************************************
 *****************************************
 */


function initializeTable() {


}






/*
 *****************************************
 *****************************************
 * UI METHODS
 *****************************************
 *****************************************
 */

function mouseClicked() {
  // initializeItems();
  // print("MIAU");
  // print(((windowWidth / 2) - mouseX) + " :: " + mouseX + " , " + ((windowHeight / 2) - mouseY) + " :: " + mouseY);

  //print(((windowWidth / 2) - mouseX) + "," + ((windowHeight / 2) - mouseY));


}


function keyPressed() {
  if (keyCode == 32) {
    // SPACE
    showPaths = !showPaths;

  }

  return false;
}