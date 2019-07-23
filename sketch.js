P1 = 'Jasper';

i = 0;
j = 0;
P1Leg = [];
Darts = 0;

lastWin = null;

LEgs = 0;

P1LEGS = [];
P1allShots = [];


P1Curr = 501;




const w = 500;
const h = 600;

function setup() {
  P1av = float(0.0);
  createCanvas(w, h);
  background(153, 153, 255);
  drawGrid();
  updateScore();
  textAlign(CENTER);
  input = createInput();
  input.position(w / 2 - 66, h / 40);
  button = createButton('Undo');
  button.position(9 * w / 10, h / 40);
  button.mousePressed(Undo);


}

function draw() {
  fill(255, 165, 0);
}

function drawGrid() {
  background(153, 153, 255);
  stroke(0);
  strokeWeight(4);
  line(0, 2 * h / 10, w, 2 * h / 10);
  
  line(w/4, 0, w/4, h);

  textSize(w / 20);
  textAlign(CENTER);
  fill(0);
  noStroke();

  // NAMES:
  text(P1, w/2, 3 * h / 20);

  textSize(w / 20);
  text('501',w/2,5*h/20);
  text('Legs',w/4 -w/8,3*h/20);
  if(LEgs > 0){
    for (var i = 0; i < LEgs; i++) {
      text(str(P1LEGS[i] - 2) + ' - ' + str(P1LEGS[i]), w / 8, 5 * h / 20 + i * h / 20);
    }
  }
  

}

function updateScore() {
  textSize(w / 20);
  textAlign(CENTER);
  fill(10, 0, 145);

  text(str(P1av), w / 2 + 100, 3 * h / 20);
  
  fill(0);
}


function Score() {
  drawGrid();
  strokeWeight(4);
  fill(0);
  var value = input.value();
  P1allShots.push(int(value));
  P1Curr = P1Curr - int(value);
  P1Leg.push(P1Curr);
  input.value('');
  textSize(w / 20);
  textAlign(CENTER);
  fill(0);
  
  
  if(P1Curr == 0){
    Darts += 3;
    P1LEGS.push(Darts);
    Darts = 0;
  }else{
    Darts += 3;
  }
  
  drawScore()
  if (P1Curr == 0) {
    LEgs += 1;
    redo();
  }
  

  var temp = 0;
  for (var k = 0; k < P1allShots.length; k++) {
    temp = temp + int(P1allShots[k]);
  }
  P1av = float(temp / P1allShots.length);

  P1av = round(P1av * 100);
  P1av = P1av / 100;
  
  updateScore();
}

function redo() {
  i = 0;
  j = 0;

  P1Leg = [];

  P1Curr = 501;
  drawGrid();
}

function keyTyped() {
  if (key === ' ' & int(input.value()) < 181 & int(input.value()) > -1 & isNaN(input.value()) == false) {
    if (int(input.value()) < P1Curr + 1) {
      Score();
    }
  }
}

function Undo() {
    if (P1Leg.length != 0) {
      if (P1Leg.length == 1) {
        P1Curr = 501;
      } else {
        P1Curr = P1Leg[P1Leg.length - 2];
      }
      P1allShots.pop();
      P1Leg.pop();
      drawGrid();
      fill(0);
      drawScore();

      var temp = 0;
      for (var k = 0; k < P1allShots.length; k++) {
        temp = temp + int(P1allShots[k]);
      }
      P1av = float(temp / P1allShots.length);

      P1av = round(P1av * 100);
      P1av = P1av / 100;

      
    
  }

}

function drawScore() {
  for (var i = 0; i < P1Leg.length; i++) {
    if (i < 14) {
      text(str(P1Leg[i]), w / 2, 6 * h / 20 + i * h / 20);
    } else {
      text(str(P1Leg[i]), w / 2 + w / 8, 6 * h / 20 + (i - 15) * h / 20);
    }
  }

}
