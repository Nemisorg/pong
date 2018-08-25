// variabelen
var ScreenHeight        = $(window).innerHeight();                           // Hoogte van het scherm
var ScreenWidth         = $(window).innerWidth();                            // Breedte van het scherm
var screentotal         = ScreenWidth + ScreenHeight;                        // Hoogte + breedte van het scherm
var batheightleft       = ScreenHeight / 6;                                  // Hoogte van het linker bedje
var batheightright      = ScreenHeight / 6;                                  // Hoogte van het rechter bedje
var batwidthleft        = ScreenWidth / 100;                                 // Breedte van het linker bedje
var batwidthright       = ScreenWidth / 100;                                 // Breedte van het rechter bedje
var batleftpositionx    = ScreenWidth / 40 - batwidthleft;                   // X positie van het linker bedje
var batleftpositiony    = ScreenHeight / 2 - (batheightleft / 2);            // Y positie van het linker bedje
var batrightpositionx   = ScreenWidth - (ScreenWidth / 40);                  // X positie van het rechter bedje
var batrightpositiony   = ScreenHeight / 2 - (batheightright / 2);           // Y positie van het rechter bedje
var batspeedx           = ScreenWidth / 250;                                 // Snelheid van de bedjes op de X as
var batspeedy           = ScreenHeight / 50;                                 // Snelheid van de bedjes op de Y as
var balwidth            = ScreenWidth / 75;                                  // Breedte van de bal
var balheight           = ScreenWidth / 75;                                  // Hoogte van de bal
var balpositionx        = ScreenWidth / 2;                                   // X positie van de bal
var balpositiony        = ScreenHeight / 2;                                  // Y positie van de bal
var multiplier          = 1.001;                                             // Waarde waarmee de X en Y snelheden van de bal elk frame worden gemultiplied
var batmultiplier       = 1.0002;                                            // waarde waarmee de Y snelheid van beide bedjes wordt gemultiplied
var midlinepartheight   = ScreenHeight / 15                                  // Hoogte van één gedeelte van de middellijn
var midlinepartwidth    = ScreenWidth / 100;                                 // Breedte van één gedeelte van de middellijn
var midlinepositionx    = ScreenWidth / 2 - midlinepartwidth / 2;            // X positie van de middellijn
var midlinepositiony    = 0;                                                 // De Y positie beginwaarde van het eerste gedeelte (rect) van de middellijn
var standardbalspeedx   = ScreenWidth / 250;                                 // Y positie van de middellijn
var linksrechts         = Math.random();                                     // \/
linksrechts             = Math.round(linksrechts);                           // Random variabele (0/1) voor bepaling of bal naar links of rechts moet gaan
var omhoogomlaag        = Math.random();                                     // \/
omhoogomlaag            = Math.round(omhoogomlaag);                          // Random variable (0/1) voor bepaling of bal omhoog of omlaag moet gaan
var randomspeedchange   = Math.random();                                     // \/
randomspeedchange       = randomspeedchange * (ScreenWidth / 312.5);         // \/
var standardbalspeedy   = randomspeedchange;                                 // Berekening van een realistische random waarde voor de Y snelheid van de bal
standardbalspeedx       = standardbalspeedx - randomspeedchange;             // Berekening van een realistische X snelheid van de bal op basis van de Y snelheid
var stopmultiplier      = 0;                                                 // Startwaarde multiply stopper
var score_afstand       = ScreenWidth / 50;                                  // Afstand tussen de scores en de middellijn
var scoregrootte        = score_afstand * 3;                                 // Extra compensatie voor score posities
var scorelinks          = 0;                                                 // Beginwaarde van de score van de linkerspeler
var scorerechts         = 0;                                                 // Beginwaarde van de score van de rechterspeler
var scorepositiony      = ScreenHeight / 7;                                  // De Y positie van bijde scores
var scorepositionxleft  = midlinepositionx - (scoregrootte + score_afstand); // De X positie van de score van de linkerspeler
var scorepositionxright = midlinepositionx + scoregrootte;                   // De X positie van de score van de rechterspeler
var eindepositionx      = ScreenWidth / 7;                                   // De X positie van de eindmelding
var eindepositiony      = ScreenHeight / 2;                                  // De Y positie van de eindmelding
var w                   = 87;                                                // De keycode van "w"
var s                   = 83;                                                // De keycode van "s"
var a                   = 65;                                                // De keycode van "a"
var d                   = 68;                                                // De keycode van "d"

// Functie voor het herinstellen van de variabelen naar de oorspronkelijke waarde als de vorige game is afgelopen, zie alle variabelen hierboven voor de functie
function varchange() {
  batleftpositionx  = ScreenWidth / 40 - batwidthleft;
  batleftpositiony  = ScreenHeight / 2 - (batheightleft / 2);
  batrightpositionx = ScreenWidth - (ScreenWidth / 40);
  batrightpositiony = ScreenHeight / 2 - (batheightright / 2);
  balpositionx      = ScreenWidth / 2;
  balpositiony      = ScreenHeight / 2;
  standardbalspeedx = ScreenWidth / 250;
  randomspeedchange = Math.random();
  randomspeedchange = randomspeedchange * (ScreenWidth / 312.5);
  standardbalspeedy = randomspeedchange;
  linksrechts       = Math.random();
  linksrechts       = Math.round(linksrechts);
  omhoogomlaag      = Math.random();
  standardbalspeedx = standardbalspeedx - randomspeedchange;
  omhoogomlaag      = Math.round(omhoogomlaag);
  scorelinks        = 0;
  scorerechts       = 0;
  if (linksrechts == 0) {
    standardbalspeedx = -standardbalspeedx;
  } else if (omhoogomlaag == 0) {
    standardbalspeedy = -standardbalspeedy;
  }
}

// Setup functie
function setup() {
  createCanvas(ScreenWidth - 6,ScreenHeight - 6); // Maak het canvas
}

// Achtergrond functie
function achtergrond() {
  background(0,0,0);                                    // Maak de achtergrond zwart en clear objecten van het vorige frame
  noStroke();                                           // Geen borders
  fill(255);                                            // Maak objecten wit

  textSize(scoregrootte);
  text(scorelinks,scorepositionxleft,scorepositiony);   // Print linkerscore
  text(scorerechts,scorepositionxright,scorepositiony); // Print rechterscore
}

// Check of iemand gewonnen heeft
function gewonnen() {
  if (scorelinks == 10 || scorerechts == 10) {                         // || = or
    if (keyIsPressed == false) {                                       // Als er geen toets is ingedrukt
      text("Press any key to continue",eindepositionx,eindepositiony);
      balpositionx = ScreenWidth / 2;                                  // \/
      balpositiony = ScreenHeight / 2;                                 // Zet bal in het midden
    } else {
      varchange();                                                     // Zie functieverklaring voor informatie
    }
  }
}

// Functie checkt of de multiplier gestopt moet worden
function checkstopmultiplier() {
  if (stopmultiplier != 1) {                            // Als bal niet te snel gaat (Als bal niet te snel gaat is false wordt er niet gemultiplied)
    standardbalspeedx = standardbalspeedx * multiplier; // \/
    standardbalspeedy = standardbalspeedy * multiplier; // Multiply de snelheid van de bal met de multiplier
    batspeedy         = batspeedy * batmultiplier;      // Multiply de Y snelheid van het bedje met de batmultiplier
  }
}

// Functie drawt de bedjes
function bedjes() {
  rect(batleftpositionx,batleftpositiony,batwidthleft,batheightleft);     // Draw linker bedje
  rect(batrightpositionx,batrightpositiony,batwidthright,batheightright); // Draw rechter bedje
}

// Functie multiplied de snelheid van de bal
function randmultiplier() {
  if (balpositiony > ScreenHeight || balpositiony < 0) { // Bij collision van bal met onderkant of bovenkant scherm
    standardbalspeedy = standardbalspeedy * multiplier;  // \/
    standardbalspeedx = standardbalspeedx * multiplier;  // Multiply de snelheid van de bal met de multiplier
    standardbalspeedy = -standardbalspeedy;              // Bal stuitert terug op de y axis
  }
}

// check of er gescoort is
function gescoord() {
  if (balpositionx > ScreenWidth) {                                // Als er collision is tussen de bal en de rechter schermrand
    balpositionx      = ScreenWidth - 1;
    scorelinks        = scorelinks + 1;                            // Verhoog de score van de linkerspeler met 1
    standardbalspeedx = ScreenWidth / 250;                         // zet de x bal snelheid naar oorspronkelijke waarde
    randomspeedchange = Math.random();                             // \/
    randomspeedchange = randomspeedchange * (ScreenWidth / 312.5); // \/
    standardbalspeedy = randomspeedchange;                         // Bereken een random waarde voor de y snelheid van de bal
    omhoogomlaag      = Math.random();                             // \/
    omhoogomlaag      = Math.round(omhoogomlaag);                  // \/
    if (omhoogomlaag == 0) {                                       // \/
      standardbalspeedy = -standardbalspeedy;                      // Bereken random of de bal omhoog of omlaag moet gaan
    }
    standardbalspeedx = standardbalspeedx - randomspeedchange;     // Pas de x snelheid aan afhankelijk van de y snelheid
    standardbalspeedx = -standardbalspeedx;                        // Laat de bal stuiteren tegen de rechter schermrand
    batspeedy         = ScreenHeight / 50;                         // Herstel de verticale snelheid van het bedje
  } else if (balpositionx < 0) {                                   // Als er collision is tussen de bal en de linkerschermrand
    balpositionx      = 1;
    scorerechts       = scorerechts + 1;                           // Verhoog de score van de rechterspeler met 1
    standardbalspeedx = ScreenWidth / 250;                         // zet de x bal snelheid naar oorspronkelijke waarde
    randomspeedchange = Math.random();                             // \/
    randomspeedchange = randomspeedchange * (ScreenWidth / 312.5); // \/
    standardbalspeedy = randomspeedchange;                         // Bereken een random waarde voor de y snelheid van de bal
    omhoogomlaag      = Math.random();                             // \/
    omhoogomlaag      = Math.round(omhoogomlaag);                  // \/
    if (omhoogomlaag == 0) {                                       // \/
      standardbalspeedy = -standardbalspeedy;                      // bereken random of de bal omhoog of omlaag moet gaan
    }
    standardbalspeedx = standardbalspeedx - randomspeedchange;     // Pas de x snelheid aan afhankelijk van de y snelheid
    batspeedy         = ScreenHeight / 50;                         // Herstel de verticale snelheid van het bedje
  }
}

function tegengehouwen() {
  if (standardbalspeedx > 0) {                                            // Als de bal naar rechts gaat
    if (                                                                  // Als ...
      balpositionx - standardbalspeedx < batrightpositionx + batspeedx && // \/
      balpositionx + standardbalspeedx > batrightpositionx + batspeedx && // ... de X positie van de bal bij het rechter bedje is, en ...
      balpositiony < batrightpositiony + batheightright &&                // \/
      balpositiony > batrightpositiony) {                                 // ... de Y positie van de bal bij het rechter bedje is

      verschil = batrightpositiony - balpositiony;                        // \/
      verschil =  -verschil;                                              // \/
      verschil = verschil - (batheightright / 2);                         // Y positie van de bal ten opzichte van het bedje op punt van collision
                                                                          // als waarde tussen -grootteVanBedje/2 en grootteVanBedje/2
      console.log(verschil);                                              // Print de waarde
      standardbalspeedxtemp = standardbalspeedx;                          // Maak temporary variabele aan voor de X snelheid van de bal
      if (standardbalspeedy < 0) {                                        // \/
        standardbalspeedytemp = -standardbalspeedy;                       // \/
      } else {                                                            // \/
        standardbalspeedytemp = standardbalspeedy;                        // Maak temporary variabele aan voor de Y snelheid van de bal (altijd positief)
      }
      standardbalspeedtemp = standardbalspeedxtemp + standardbalspeedytemp; // Maak temporary variabele aan voor de totale snelheid van de bal aan de
                                                                            // hand van standardbalspeedytemp en standardbalspeedxtemp (altijd positief)
      verschilmultiplier = standardbalspeedtemp / batheightright;           // \/
      verschil = verschil * verschilmultiplier;                             // Zet de veel te grote waardes van verschil om in bruikbare waardes
                                                                            // geschikt voor de stuiter-onder-hoek berekening van de bal
      if (verschil < 0) {                                                   // \/
        verschiltemp = -verschil;                                           // \/
      } else {                                                              // \/
        verschiltemp = verschil;                                            // Maak een andere variabele aan met de waarde van verschil (altijd positief)
      }
      standardbalspeedx = standardbalspeedtemp - verschiltemp;              // Pas de X snelheid van de bal aan aan de berekende y snelheid (verschil hoek)
      standardbalspeedy = verschil;                                         // De Y snelheid is de berekende snelheid (verschil hoek)

      if (standardbalspeedtemp > screentotal / 71.1333333333333333333333333) { // \/
        stopmultiplier = 1;                                                    // \/
      } else {                                                                 // \/
        stopmultiplier = 0;                                                    // Check of de bal te snel gaat. Wanneer true word een variabele
      }                                                                        // veranderd die later gecheckt word of multiplien nodig is

      console.log(standardbalspeedtemp);                                       // Print de waarde van standardbalspeedtemp naar de console

      standardbalspeedx = -standardbalspeedx;                                  // Laat de bal stuiteren
    }
  } else if (standardbalspeedx < 0) {                                          // Als de bal naar rechts gaat
    if (                                                                       // Als ...
      balpositionx + standardbalspeedx < batleftpositionx + batspeedx &&       // \/
      balpositionx - standardbalspeedx > batleftpositionx + batspeedx &&       // ... de X positie van de bal bij het linker bedje is, en ...
      balpositiony < batleftpositiony + batheightleft &&                       // \/
      balpositiony > batleftpositiony) {                                       // ... de Y positie van de bal bij het rechter bedje is

      verschil = batleftpositiony - balpositiony;                              // \/
      verschil =  -verschil;                                                   // \/
      verschil = verschil - (batheightleft / 2);                               // Y positie van de bal ten opzichte van het bedje op punt van collision
                                                                               // als waarde tussen -grootteVanBedje/2 en grootteVanBedje/2
      console.log(verschil);                                                   // Print de waarde
      standardbalspeedxtemp = -standardbalspeedx;                              // Maak temporary variabele aan voor de X snelheid van de bal (positief gemaakt voor berekening)
      if (standardbalspeedy < 0) {                                             // \/
        standardbalspeedytemp = -standardbalspeedy;                            // \/
      } else {                                                                 // \/
        standardbalspeedytemp = standardbalspeedy;                             // Maak temporary variabele aan voor de Y snelheid van de bal (altijd positief)
      }
      standardbalspeedtemp = standardbalspeedxtemp + standardbalspeedytemp;    // Maak temporary variabele aan voor de totale snelheid van de bal aan de
                                                                               // hand van standardbalspeedytemp en standardbalspeedxtemp (altijd positief)
      verschilmultiplier = standardbalspeedtemp / batheightleft;               // \/
      verschil = verschil * verschilmultiplier;                                // Zet de veel te grote waardes van verschil om in bruikbare waardes
                                                                               // geschikt voor de stuiter-onder-hoek berekening van de bal
      if (verschil < 0) {                                                      // \/
        verschiltemp = -verschil;                                              // \/
      } else {                                                                 // \/
        verschiltemp = verschil;                                               // Maak een andere variabele aan met de waarde van verschil (altijd positief)
      }
      standardbalspeedx = standardbalspeedtemp - verschiltemp;                 // Pas de X snelheid van de bal aan aan de berekende y snelheid (verschil hoek)
      standardbalspeedy = verschil;                                            // De Y snelheid is de berekende snelheid (verschil hoek)

      if (standardbalspeedtemp > screentotal / 71.1333333333333333333333333) { // \/
        stopmultiplier = 1;                                                    // \/
      } else {                                                                 // \/
        stopmultiplier = 0;                                                    // Check of de bal te snel gaat. Wanneer true word een variabele
      }                                                                        // veranderd die later gecheckt word of multiplien nodig is
      console.log(standardbalspeedtemp);                                       // Print de waarde van standardbalspeedtemp naar de console
    }
  }
}

// Draw de bal
function bal() {
  balpositionx = balpositionx + standardbalspeedx;       // Verplaats de bal op de X-axis met standardbalspeedx (frame)
  balpositiony = balpositiony + standardbalspeedy;       // Verplaats de bal op de Y-axis met standardbalspeedy (frame)
  ellipse(balpositionx,balpositiony,balwidth,balheight); // Draw de bal
}

// Draw de middellijn (bestaat uit verschillende blokjes)
function midline() {
  midlinepositiony = 0;                                                         // Zet de Y positie van het beginblokje van de middellijn terug naar 0
  for(i = 0; i < Math.ceil(ScreenHeight / midlinepartheight); i++){             // Run loop voor elke keer dat er nog een midline blokje op het scherm past en verhoog i met een
    rect(midlinepositionx,midlinepositiony,midlinepartwidth,midlinepartheight); // Draw een midline blokje
    midlinepositiony = midlinepositiony + midlinepartheight * 1.75;             // Verander de positie variabele voor het volgende midline blokje
  }
}

// Keybindings
function keybinding() {
  if (keyIsDown(w)) { // Als "w" ingedrukt is gaat het linker bedje omhoog tenzij die al helemaal boven is
    if (batleftpositiony - batspeedy < 0) {
      batleftpositiony = 0;
    } else {
      batleftpositiony = batleftpositiony - batspeedy;
    }
  }
  if (keyIsDown(s)) { // Als "s" ingedrukt is gaat het linker bedje omlaag tenzij die al helemaal beneden is
    if (batleftpositiony + batheightleft + batspeedy > ScreenHeight) {
      batleftpositiony = ScreenHeight - batheightleft;
    } else {
      batleftpositiony = batleftpositiony + batspeedy;
    }
  }
  if (keyIsDown(a)) { // Als "a" ingedrukt is gaat het linker bedje naar links tenzij die al helemaal links is
    if (batleftpositionx - batspeedx < 0) {
      batleftpositionx = 0;
    } else {
      batleftpositionx = batleftpositionx - batspeedx;
    }
  }
  if (keyIsDown(d)) { // Als "d" ingedrukt is gaat het linker bedje naar rechts tenzij die al helemaal tegen de middellijn aan zit
    if (batleftpositionx + batwidthleft + batspeedx > midlinepositionx) {
      batleftpositionx = midlinepositionx - batwidthleft;
    } else {
      batleftpositionx = batleftpositionx + batspeedx;
    }
  }
  if (keyIsDown(UP_ARROW)) { // Als "pijltje omhoog" ingedrukt is gaat het rechter bedje omhoog tenzij die al helemaal omhoog is
    if (batrightpositiony - batspeedy < 0) {
      batrightpositiony = 0;
    } else {
      batrightpositiony = batrightpositiony - batspeedy;
    }
  }
  if (keyIsDown(DOWN_ARROW)) { // Als "pijltje omlaag" ingedrukt is gaat het rechter bedje omlaag tenzij die al helemaal omlaag is
    if (batrightpositiony + batheightright + batspeedy > ScreenHeight) {
      batrightpositiony = ScreenHeight - batheightright;
    } else {
      batrightpositiony = batrightpositiony + batspeedy;
    }
  }
  if (keyIsDown(LEFT_ARROW)) { // Als "pijltje naar links" ingedrukt is gaat het rechter bedje naar links tenzij die al helemaal tegen de middellijn aan zit
    if (batrightpositionx - batspeedx < midlinepositionx + midlinepartwidth) {
      batrightpositionx = midlinepositionx + midlinepartwidth;
    } else {
      batrightpositionx = batrightpositionx - batspeedx;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) { // Als "pijltje naar rechts" ingedrukt is gaat het rechter bedje naar rechts tenzij die al helemaal rechts is
    if (batrightpositionx + batwidthright + batspeedx > ScreenWidth) {
      batrightpositionx = ScreenWidth - batwidthright;
    } else {
      batrightpositionx = batrightpositionx + batspeedx;
    }
  }
}

// draw functie
function draw() {
  achtergrond();

  gewonnen();

  checkstopmultiplier();

  bedjes();

  randmultiplier();

  gescoord();

  tegengehouwen();

  bal();

  midline();

  keybinding();
}
