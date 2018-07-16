// variabelen
var ScreenHeight      = $(window).innerHeight();                      // Hoogte van het scherm
var ScreenWidth       = $(window).innerWidth();                       // Breedte van het scherm
var screentotal       = ScreenWidth + ScreenHeight;
var batheightleft     = ScreenHeight / 6;                        // Hoogte van het linker bedje
var batheightright    = ScreenHeight / 6;                        // Hoogte van het rechter bedje
var batwidthleft      = ScreenWidth / 100;                        // Breedte van het linker bedje
var batwidthright     = ScreenWidth / 100;                        // Breedte van het rechter bedje
var batleftpositionx  = ScreenWidth / 40 - batwidthleft;                        // X positie van het linker bedje
var batleftpositiony  = ScreenHeight / 2 - (batheightleft / 2);  // Y positie van het linker bedje
var batrightpositionx = ScreenWidth - (ScreenWidth / 40);        // X positie van het rechter bedje
var batrightpositiony = ScreenHeight / 2 - (batheightright / 2); // Y positie van het rechter bedje
var batspeedx         = ScreenWidth / 250;
var batspeedy         = ScreenHeight / 50;
var balwidth          = ScreenWidth / 75;                        // Breedte van de bal
var balheight         = ScreenWidth / 75;                        // Hoogte van de bal
var balpositionx      = ScreenWidth / 2;
var balpositiony      = ScreenHeight / 2;
var multiplier        = 1.001;
var batmultiplier     = 1.0002;
var midlinepartheight = ScreenHeight / 15                        // Hoogte van één gedeelte van de middellijn
var midlinepartwidth  = ScreenWidth / 100;                        // Breedte van één gedeelte van de middellijn
var midlinepositionx  = ScreenWidth / 2 - midlinepartwidth / 2;                         // X positie van de middellijn
var midlinepositiony  = 0;
var standardbalspeedx = ScreenWidth / 250;                                 // Y positie van de middellijn
var randomspeedchange = Math.random();
randomspeedchange     = randomspeedchange * (ScreenWidth / 312.5);
var linksrechts       = Math.random();
var omhoogomlaag      = Math.random();
var standardbalspeedy = randomspeedchange;
standardbalspeedx     = standardbalspeedx - randomspeedchange;
linksrechts = Math.round(linksrechts);
omhoogomlaag = Math.round(omhoogomlaag);
var stopmultiplier = 0;
var score_afstand = ScreenWidth / 50;
var scoregrootte = score_afstand * 3;
var scorelinks = 0;
var scorerechts = 0;
var scorepositiony = ScreenHeight / 7;
var scorepositionxleft = midlinepositionx - (scoregrootte + score_afstand);
var scorepositionxright = midlinepositionx + scoregrootte;
var eindepositionx = ScreenWidth / 50;
var eindepositiony = ScreenHeight / 2;

function varchange() {
  batleftpositionx  = ScreenWidth / 40 - batwidthleft;                        // X positie van het linker bedje
  batleftpositiony  = ScreenHeight / 2 - (batheightleft / 2);  // Y positie van het linker bedje
  batrightpositionx = ScreenWidth - (ScreenWidth / 40);        // X positie van het rechter bedje
  batrightpositiony = ScreenHeight / 2 - (batheightright / 2); // Y positie van het rechter bedje
  balpositionx      = ScreenWidth / 2;
  balpositiony      = ScreenHeight / 2;
  standardbalspeedx = ScreenWidth / 250;                                 // Y positie van de middellijn
  randomspeedchange = Math.random();
  randomspeedchange     = randomspeedchange * (ScreenWidth / 312.5);
  linksrechts       = Math.random();
  omhoogomlaag      = Math.random();
  standardbalspeedy = randomspeedchange;
  standardbalspeedx     = standardbalspeedx - randomspeedchange;
  linksrechts = Math.round(linksrechts);
  omhoogomlaag = Math.round(omhoogomlaag);
  scorelinks = 0;
  scorerechts = 0;
  if (linksrechts == 0) {
    standardbalspeedx = -standardbalspeedx;
  }
  if (omhoogomlaag == 0) {
    standardbalspeedy = -standardbalspeedy;
  }
}

if (linksrechts == 0) {
  standardbalspeedx = -standardbalspeedx;
}
if (omhoogomlaag == 0) {
  standardbalspeedy = -standardbalspeedy;
}

// setup functie
function setup() {
  createCanvas(ScreenWidth - 6,ScreenHeight - 6); // Maak het canvas
}

// draw functie
function draw() {
  background(0,0,0);                                                      // Maak de achtergrond zwart
  noStroke();
  fill(255);

  textSize(scoregrootte);
  text(scorelinks,scorepositionxleft,scorepositiony);
  text(scorerechts,scorepositionxright,scorepositiony);
  if (scorelinks == 10) {
    if (keyIsPressed == false) {
      text("Press any key to continue",eindepositionx,eindepositiony);
      balpositionx = ScreenWidth / 2;
      balpositiony = ScreenHeight / 2;
    } else {
      varchange();
    }
  } else if (scorerechts == 10) {
    if (keyIsPressed == false) {
      text("Press any key to continue",eindepositionx,eindepositiony);
      balpositionx = ScreenWidth / 2;
      balpositiony = ScreenHeight / 2;
    } else {
      varchange();
    }
  }
  if (stopmultiplier != 1) {
    standardbalspeedx = standardbalspeedx * multiplier;
    standardbalspeedy = standardbalspeedy * multiplier;
    batspeedy = batspeedy * batmultiplier;
  }
  // console.log("iets");
  // console.log(standardbalspeedx);
  // console.log(standardbalspeedy);
  // console.log(omhoogomlaag + " " + linksrechts + " " + standardbalspeedx + " " + standardbalspeedy);
  rect(batleftpositionx,batleftpositiony,batwidthleft,batheightleft);     // Draw linker bedje
  rect(batrightpositionx,batrightpositiony,batwidthright,batheightright); // Draw rechter bedje
  if (balpositiony > ScreenHeight) {
    standardbalspeedy = standardbalspeedy * multiplier;
    standardbalspeedx = standardbalspeedx * multiplier;
    standardbalspeedy = -standardbalspeedy;
  } else if (balpositiony < 0) {
    standardbalspeedy = standardbalspeedy * multiplier;
    standardbalspeedx = standardbalspeedx * multiplier;
    standardbalspeedy = -standardbalspeedy;
  }
  if (balpositionx > ScreenWidth) {
    balpositionx = ScreenWidth - 1;
    scorelinks = scorelinks + 1;
    standardbalspeedx = ScreenWidth / 250;
    randomspeedchange = Math.random();
    randomspeedchange     = randomspeedchange * (ScreenWidth / 312.5);
    standardbalspeedy = randomspeedchange;
    omhoogomlaag      = Math.random();
    omhoogomlaag = Math.round(omhoogomlaag);
    if (omhoogomlaag == 0) {
      standardbalspeedy = -standardbalspeedy;
    }
    standardbalspeedx     = standardbalspeedx - randomspeedchange;
    standardbalspeedx = -standardbalspeedx;
    batspeedy         = ScreenHeight / 50;
  } else if (balpositionx < 0) {
    balpositionx = 1;
    scorerechts = scorerechts + 1;
    standardbalspeedx = ScreenWidth / 250;
    randomspeedchange = Math.random();
    randomspeedchange        = randomspeedchange * (ScreenWidth / 312.5);
    standardbalspeedy = randomspeedchange;
    omhoogomlaag      = Math.random();
    omhoogomlaag = Math.round(omhoogomlaag);
    if (omhoogomlaag == 0) {
      standardbalspeedy = -standardbalspeedy;
    }
    standardbalspeedx     = standardbalspeedx - randomspeedchange;
    batspeedy         = ScreenHeight / 50;
  }
  if (standardbalspeedx > 0) {
    if (
      balpositionx - standardbalspeedx < batrightpositionx + batspeedx && //right
      balpositionx + standardbalspeedx > batrightpositionx + batspeedx &&
      balpositiony < batrightpositiony + batheightright &&
      balpositiony > batrightpositiony) {

      verschil = batrightpositiony - balpositiony;
      verschil =  -verschil;
      verschil = verschil - (batheightright / 2);
      console.log(verschil);
      standardbalspeedxtemp = standardbalspeedx;
      if (standardbalspeedy < 0) {
        standardbalspeedytemp = -standardbalspeedy;
      } else {
        standardbalspeedytemp = standardbalspeedy;
      }
      standardbalspeedtemp = standardbalspeedxtemp + standardbalspeedytemp;
      verschilmultiplier = standardbalspeedtemp / batheightright;
      verschil = verschil * verschilmultiplier;
      if (verschil < 0) {
        verschiltemp = -verschil;
      } else {
        verschiltemp = verschil;
      }
      standardbalspeedx = standardbalspeedtemp - verschiltemp;
      standardbalspeedy = verschil;

      if (standardbalspeedtemp > screentotal / 71.1333333333333333333333333) {
        stopmultiplier = 1;
      } else {
        stopmultiplier = 0;
      }
      console.log(standardbalspeedtemp);

      standardbalspeedx = -standardbalspeedx;
    }
  } else if (standardbalspeedx < 0) {
    if (
      balpositionx + standardbalspeedx < batleftpositionx + batspeedx && //left
      balpositionx - standardbalspeedx > batleftpositionx + batspeedx &&
      balpositiony < batleftpositiony + batheightleft &&
      balpositiony > batleftpositiony) {

      verschil = batleftpositiony - balpositiony;
      verschil =  -verschil;
      verschil = verschil - (batheightleft / 2);
      console.log(verschil);
      standardbalspeedxtemp = -standardbalspeedx;
      if (standardbalspeedy < 0) {
        standardbalspeedytemp = -standardbalspeedy;
      } else {
        standardbalspeedytemp = standardbalspeedy;
      }
      standardbalspeedtemp = standardbalspeedxtemp + standardbalspeedytemp;
      verschilmultiplier = standardbalspeedtemp / batheightleft;
      verschil = verschil * verschilmultiplier;
      if (verschil < 0) {
        verschiltemp = -verschil;
      } else {
        verschiltemp = verschil;
      }
      standardbalspeedx = standardbalspeedtemp - verschiltemp;
      standardbalspeedy = verschil;

      if (standardbalspeedtemp > screentotal / 71.1333333333333333333333333) {
        stopmultiplier = 1;
      } else {
        stopmultiplier = 0;
      }
      console.log(standardbalspeedtemp);
    }
  }
  balpositionx = balpositionx + standardbalspeedx;
  balpositiony = balpositiony + standardbalspeedy;
  ellipse(balpositionx,balpositiony,balwidth,balheight);
  midlinepositiony = 0;
  for(i = 0; i < Math.ceil(ScreenHeight / midlinepartheight); i++){
    rect(midlinepositionx,midlinepositiony,midlinepartwidth,midlinepartheight);
    midlinepositiony = midlinepositiony + midlinepartheight * 1.75;
    // console.log("nu");
  }
  if (keyIsDown(87)) {
    if (batleftpositiony - batspeedy < 0) {
      batleftpositiony = 0;
    } else {
      batleftpositiony = batleftpositiony - batspeedy;
    }
  }
  if (keyIsDown(83)) {
    if (batleftpositiony + batheightleft + batspeedy > ScreenHeight) {
      batleftpositiony = ScreenHeight - batheightleft;
    } else {
      batleftpositiony = batleftpositiony + batspeedy;
    }
  }
  if (keyIsDown(65)) {
    if (batleftpositionx - batspeedx < 0) {
      batleftpositionx = 0;
    } else {
      batleftpositionx = batleftpositionx - batspeedx;
    }
  }
  if (keyIsDown(68)) {
    if (batleftpositionx + batwidthleft + batspeedx > midlinepositionx) {
      batleftpositionx = midlinepositionx - batwidthleft;
    } else {
      batleftpositionx = batleftpositionx + batspeedx;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    if (batrightpositiony - batspeedy < 0) {
      batrightpositiony = 0;
    } else {
      batrightpositiony = batrightpositiony - batspeedy;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (batrightpositiony + batheightright + batspeedy > ScreenHeight) {
      batrightpositiony = ScreenHeight - batheightright;
    } else {
      batrightpositiony = batrightpositiony + batspeedy;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (batrightpositionx - batspeedx < midlinepositionx + midlinepartwidth) {
      batrightpositionx = midlinepositionx + midlinepartwidth;
    } else {
      batrightpositionx = batrightpositionx - batspeedx;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (batrightpositionx + batwidthright + batspeedx > ScreenWidth) {
      batrightpositionx = ScreenWidth - batwidthright;
    } else {
      batrightpositionx = batrightpositionx + batspeedx;
    }
  }
}
