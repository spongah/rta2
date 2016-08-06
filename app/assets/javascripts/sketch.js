var mic;
var fft;
var maxLevel= 0;

function setup() {
	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT();
}

function draw() {
	fft.setInput(mic);
	spectrum = fft.analyze();
	micLevel = mic.getLevel();
	intLevel = parseInt(micLevel * 400);
	if (intLevel > maxLevel) { maxLevel = intLevel };
	oneBitLevel = parseInt(micLevel * 600);
	if (oneBitLevel <= 255) { vuColor = "#" + oneBitLevel.toString(16) + "0000" };
	document.getElementById("level").innerHTML = intLevel;
	document.getElementById("maxlevel").innerHTML = maxLevel;
	document.getElementById("vu").style.width = (intLevel * 2) + "px";
	document.getElementById("vumax").style.backgroundColor = vuColor;
	document.getElementById("vumax").style.width = (maxLevel * 2) + "px";
	document.getElementById("bgcolor").innerHTML = oneBitLevel + "   " + vuColor;
	document.getElementById("bass").style.width = parseInt(fft.getEnergy(40,80) / 2.5) + "%";
	document.getElementById("treble").style.width = parseInt(fft.getEnergy(5000,20000) / 1.5) + "%";
	document.getElementById("bass").innerHTML = parseInt(fft.getEnergy(40,80) / 2.5) + "%";
	document.getElementById("treble").innerHTML = parseInt(fft.getEnergy(5000,20000) / 1.5) + "%";
	document.getElementById("bass").style.backgroundColor =  "#" + (fft.getEnergy(40,80)).toString(16) + "0000";
	document.getElementById("treble").style.backgroundColor = "#0000" + (fft.getEnergy(5000,20000)).toString(16) + "";
	
}