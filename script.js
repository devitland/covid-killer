let ctx = myCanvas.getContext("2d");

let men_x = 0;
let men_y = 0;
let menImg = new Image();
menImg.src = "img/3.png";

let mask_x = 0;
let mask_y = 0;
let maskImg = new Image();
maskImg.src = "img/4.png";

let score = 0;
let time_remaining = 20;
let mask_speed = 3;
let FPS = 40;

function Start(){

	document.getElementById('buttonStart').hidden = true;
	function restart_game() {    
		time_remaining = 20;
		score = 0;
		mask_speed = 3;
	}

	function ImagesTouching(x1, y1, img1, x2, y2, img2) {
		if (x1 >= x2+img2.width || x1+img1.width <= x2) return false;   // too far to the side
		if (y1 >= y2+img2.height || y1+img1.height <= y2) return false; // too far above/below
		return true;                                                    // otherwise, overlap   
	}

	function Do_a_Frame () {
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
		ctx.fillStyle= "red";
		ctx.font = "20px Arial";
		ctx.fillText("Время: " + Math.round(time_remaining), 0, 45);
		ctx.fillText("Защищен на " + score + "%", 0, 20);


		men_y = myCanvas.height - menImg.height;    	
		ctx.drawImage(menImg, men_x, men_y);
		ctx.drawImage(maskImg, mask_x, mask_y);

		if (time_remaining <= 0) { 
			ctx.fillStyle= "red";
			ctx.font = "bold 20px Arial";	          	         	
			ctx.fillText("КОНЕЦ ИГРЫ!",10,100);
			ctx.fillText("возобновить - ПРОБЕЛ", 10,150);

		}
		else {
			time_remaining = time_remaining - 1/FPS;
			mask_y = mask_y + mask_speed;
			if (mask_y > myCanvas.height){
				mask_y= 0;
				mask_x= Math.random() * (myCanvas.width - maskImg.width);
			}
		} 

		if (ImagesTouching(men_x, men_y, menImg, mask_x, mask_y, maskImg)){
			++score;
			++mask_speed;
			mask_x= -maskImg.width;
		}      
	}

	setInterval(Do_a_Frame, 1000/FPS);

	function MyKeyDownHandler (MyEvent) { 
		if (MyEvent.keyCode == 37 && men_x > 0) {men_x = men_x - 10;}   // left
		if (MyEvent.keyCode == 39 && men_x + menImg.width < myCanvas.width) {men_x = men_x + 10;}   // right
		if (MyEvent.keyCode == 32) restart_game();                   
			MyEvent.preventDefault();
	}
	addEventListener("keydown", MyKeyDownHandler);
}
buttonStart.addEventListener("click", Start);