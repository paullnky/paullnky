cnv.position(200, 200);

var fichier;

var fft;

var ligneCourante = 0;

function preload() {
 
  fichier = loadSound("bones.mp3");
  
}

function setup() {
  createCanvas(1200, 500);

  var smoothing = 0.01;
  var bins = 1024;
  fft = new p5.FFT(smoothing, bins);
  fft.setInput(fichier);
  
  fichier.loop();
  
  background(0);
}

function draw() {
  
  

  var spectrum = fft.analyze();

  // iterate thru current freq spectrum
  for (var i = 0; i < spectrum.length; i++) {
    var value = spectrum[i];
    
    var c = value;
    fill(c);
    noStroke();
    
    var hauteurDuRectangle = height / (spectrum.length);
    var y = map(i,0,spectrum.length, height-hauteurDuRectangle, 0) ;
    rect(ligneCourante, y, 4, hauteurDuRectangle);
  }
  
  ligneCourante = ligneCourante + 4;
  if ( ligneCourante > width ) ligneCourante = 0;

}


function logScale(index, total, opt_base) {
  var base = opt_base || 2;
  var logmax = logBase(total + 1, base);
  var exp = logmax * index / total;
  return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
  return Math.log(val) / Math.log(base);
}
