
//Check if browser is Safari
// if('webkitAudioContext' in window){
// 	alert("is safari")
// 	const audioCtx = new window.webkitAudioContext();
// }
// else{
// 	console.log("is not safari");
// 	const audioCtx = new window.AudioContext();  	
// }



// Audio on off switch
var button = document.querySelector("#bumpButton");

// Audio source created in HTML
var audio = document.querySelector("#audio");

// To dynamically alter hr
var logoBar = document.querySelector("hr");

// Initial state of audio
var paused = true;

// Declaration of audio context for web audio api
const audioCtx = new (window.AudioContext || window.webAudioContext || window.webkitAudioContext)();

// Declare html audio as audio source
const audioSourceNode = audioCtx.createMediaElementSource(audio);

//-------------
// FILTER INIT
//-------------

// LPShelf Generation
var filterBPL = audioCtx.createBiquadFilter();
filterBPL.type = "peaking";  
filterBPL.frequency.value = 300;
filterBPL.Q.value = .5;
filterBPL.gain.value = 0;

// LPShelf Generation
var filterBPM = audioCtx.createBiquadFilter();
filterBPM.type = "peaking";  
filterBPM.frequency.value = 4000;
filterBPM.Q.value = .5;
filterBPM.gain.value = 0;

// LPShelf Generation
var filterBPH = audioCtx.createBiquadFilter();
filterBPH.type = "peaking";  
filterBPH.frequency.value = 10000;
filterBPH.Q.value = .5;
filterBPH.gain.value = 0;


//Create analyser node
const analyserNode = audioCtx.createAnalyser();
analyserNode.fftSize = 2048;
const bufferLength = analyserNode.frequencyBinCount;
const dataArray = new Float32Array(bufferLength);

//Set up audio node network
audioSourceNode.connect(filterBPL);
audioSourceNode.connect(filterBPM);
audioSourceNode.connect(filterBPH);
filterBPL.connect(analyserNode);
filterBPM.connect(analyserNode);
filterBPM.connect(analyserNode);
analyserNode.connect(audioCtx.destination);

//Create 2D canvas
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.bottom = 0;
canvas.style.left = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/4;
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext('2d');
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);


button.addEventListener("click", function(){
	if(paused){
		audio.play();
		paused=false;
		//console.log(paused);
		button.innerHTML = "<i class=\"fa fa-volume-off\" aria-hidden=\"true\"></i> DEBUMP"
		logoBar.style.width="200px"
	}
	else{
		audio.pause();
		paused=true;
		//console.log(paused);
		button.innerHTML = "<i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i> BUMP"
		setTimeout(1000);
	}
})



	function draw() {
		//Schedule next redraw
		requestAnimationFrame(draw);

		//Get spectrum data
		analyserNode.getFloatFrequencyData(dataArray);

		//Clear canvas for redraw
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		
		//Draw black background
		canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
		canvasCtx.fillRect(0, 0, canvas.width, canvas.height);


		logoBar.style.width=2

		//Draw spectrum
		const barWidth = (canvas.width / bufferLength) * 2.5;
		let posX = 0;
		var sum = 0
		for (let i = 0; i < bufferLength; i++) {
			const barHeight = (dataArray[i]+70) * window.innerHeight/120;
			canvasCtx.fillStyle = "white";//'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
			canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
	 		posX += barWidth + 1;
	 		sum += dataArray[i];
		}	

		//Make hr dance
		var average = Math.floor(-1*(sum/dataArray.length));
		if((Math.floor(average*10)) < 1000 ){
			logoBar.style.width=1000-average*10 + "px";
			console.log(average)
		}
		else{
			logoBar.style.width=200 + "px";
			console.log(average);
		}

	};

	draw();
	button.style.margin="6";
	button.style.zIndex="1000";
	canvas.style.zIndex="-1";

