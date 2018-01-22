var colors = generateColors(6);
var h1 = document.querySelector("h1")
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", function(){
	resetButton.textContent = "New Colors"
	h1.style.backgroundColor = "#234234";
	colors = generateColors(6);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
})

colorDisplay.textContent = pickedColor;

//Color Squares
for(var i = 0; i < squares.length; i++){
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	// click listeners
	squares[i].addEventListener("click", function(){
		//get color of picked square
		var clickedColor = this.style.backgroundColor;
		//compare to answer
		if(clickedColor === pickedColor){
			message.textContent="You Win"
			changeColors(pickedColor);
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again"
		}
		else{
			this.style.backgroundColor = "#234234";
			message.textContent="Try Again"
		}
	})
}

// changes all squares to 
function changeColors(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

// pick randcom color
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColors(howMany){
	var arr = [];
	for(var i = 0; i<howMany; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var c1 = Math.floor(Math.random()*256);
	var c2 = Math.floor(Math.random()*256);
	var c3 = Math.floor(Math.random()*256);
	return "rgb(" + c1 + ", " + c2 + ", " + c3 + ")";
}















