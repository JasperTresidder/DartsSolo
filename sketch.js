//update

let buttonSize = 100;
let Buttons = [];

let finish = false;

let lastval = 0;
let w;
let h;
let legavg = [];

let digit = [];

let score = 501;
let throws = [];

let average = 0;
let fs = false;

function setup() {
  h = displayWidth -100;
  w = displayHeight;
  createCanvas(w, h);
  createButtons();
  textSize(40);
  button = createButton('FullScreen');
  button.position(10, 19);
  button.mousePressed(full);
}

function draw() {
  background(220);

  showButtons();
  digitUpdate();
  drawScore();

  if (finish == true || score == 0) {
    if (digit.length > 0) {
      if (int(digit[0]) < 4) {
        updateAverage(digit[0]);
      }

    }
    digit = [];
  }

}

function scoreUpdate() {
  let num = join(digit, '');
  if (score - int(num) == 0) {
    print('ok')
    finish = true;
    lastval = int(num);
    //throws.push(int(num))
    digit = [];
  }else if (int(num) < 181 && score - int(num) > 0 && score - int(num) != 1) {
    throws.push(int(num))
    score = score - int(num)
    updateAverage();
    digit = [];
  }

}

function drawScore() {
  push();
  translate(3 * w / 4, h / 8);
  textSize(35);
  text('501', 0, 0);
  let pos = 0;
  let temp = 501;
  let yo = 0;
  for (var i = 0; i < throws.length; i++) {
    pos += 34;
    if(pos + 90 > h){
      pos = 0;
      yo += w/8;
    }
    text(str(temp - throws[i]), yo, pos);
    temp = temp - throws[i];
    //print('ok');
  }
  fill(255, 0, 0);
  translate(-w / 4, 0);
  text(str(average), 0, 0);
  for (var i = 0; i < legavg.length; i++) {
    textSize(30);
    fill(0, 0, 255);
    text(str(legavg[i][0]), 0, 30 + 28 * i);
    
  }
  pop();
}

function createButtons() {
  let xOff = w / 2 - 3 * buttonSize / 2 - w / 4;
  let yOff = h / 2 - 2 * buttonSize;
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 3; i++) {
      let index = i + j * 3;
      let num;
      if (index < 9) {
        num = str(index + 1);
      }
      if (index == 9) {
        num = 'C';
      }
      if (index == 10) {
        num = '0';
      }
      if (index == 11) {
        num = 'E';
      }
      Buttons.push([i * buttonSize + xOff, j * buttonSize + yOff, buttonSize, buttonSize, num]);
    }
  }
}

function showButtons() {
  let xOff = buttonSize / 2 - 10;
  let yOff = buttonSize / 2 + 10;
  for (var i = 0; i < Buttons.length; i++) {
    let b = Buttons[i];
    if (i == 0) {
      fill(255);
      rect(b[0] + b[2] / 2, b[1] - b[3], b[2] * 2, 3 * b[3] / 4);
    }
    fill(200, 255, 255);
    rect(b[0], b[1], b[2], b[3]);
    fill(0);
    text(b[4], b[0] + xOff, b[1] + yOff);
  }
}

function touchEnded() {
  //score = 999;
  let x = mouseX;
  let y = mouseY;
  push();
  for (var i = 0; i < Buttons.length; i++) {
    let b = Buttons[i];
    if (x < b[0] + b[2] && x > b[0] && y < b[1] + b[3] && y > b[1]) {
      Touch(b[4]);
    }
  }
  pop();
}

function Touch(n) {
  if (n == 'C') {
    digit = [];
  } else if (n == 'E') {
    scoreUpdate();

  } else {
    if (digit.length < 3) {
      digit.push(int(n));
    }
  }
}

function digitUpdate() {
  push();
  translate(Buttons[0][0] + 3 * buttonSize / 2, Buttons[0][1] - 4 * buttonSize / 8);
  textAlign(CENTER);
  if (digit.length == 0) {
    text('0', 0, 0);
  } else {
    let num = join(digit, '');
    text(num, 0, 0);
  }
  pop();
}

function updateAverage(n) {
  let a = 0;
  let d = 0;
  if (legavg.length != 0) {
    for (var i = 0; i < legavg.length; i++) {
      d += int(legavg[i][0]);
      a += 501;
    }
  }
  let legd = 0
  for (var i = 0; i < throws.length; i++) {
    d += 3;
    legd += 3;
    a += int(throws[i]);
  }
  if (finish) {
    a += score;
    d -= 3 - n;
    legd -= 3 - n;
    d += 3;
    legd += 3;
  }
  average = 3 * a / d;
  average = floor(average * 100) / 100;
  if (finish) {
    legavg.push([legd, 3 * 501 / legd])
    //console.log([legd, a, 3 * 501 / legd, average,d]);
    throws = [];
    score = 501;
    finish = false;
  }

}

function full() {
  fs = !fs;
  fullscreen(fs);
}
