
function setup(){
	var socket = io();
	var side = 30;
	var matrix = [];
	var Grasscountelem = document.getElementById('grasscount');
	var Eatercountelem = document.getElementById('grasseatercount');
	var Predcountelem = document.getElementById('predcount');
	var seasonshower = document.getElementById('season');
	var seasoncolor = document.getElementById('grass')
	var demoncolor = document.getElementById('demon');
socket.on('data',drawCreatures);
function drawCreatures(data){
	

Grasscountelem.innerText = data.xotcount;
Eatercountelem.innerText = data.eatcount;
Predcountelem.innerText = data.prdcount;
seasonshower.innerText = 'հիմա ' +' '+data.seasonname +' '+'է';
console.log(data.season)
matrix = data.matrix;
season = data.season;

createCanvas(matrix[0].length * side,matrix.length * side);

background('gray');
for(var i = 0;i < matrix.length; i++){
	for(var j = 0; j <matrix[i].length;j++){
		if (matrix[i][j] == 1) {
			if(season == 0){
				fill('#6cf213');
				seasoncolor.style.backgroundColor = '#6cf213';
			}
			else if(season == 1){
				fill('#e08011');
				seasoncolor.style.backgroundColor = '#e08011';
			}
			else if(season == 2){
				fill('#06a885');
				seasoncolor.style.backgroundColor = '#06a885';
			}
			else if(season == 3){
				fill('green');
				seasoncolor.style.backgroundColor = 'green';
			}
			rect(j * side, i * side, side, side);
		} else if (matrix[i][j] == 2) {
			fill("yellow");
			rect(j * side, i * side, side, side);
		} else if (matrix[i][j] == 0) {
			fill('gray');
			rect(j * side, i * side, side, side);
		} else if (matrix[i][j] == 3) {
			fill('purple');
			rect(j * side, i * side, side, side);
		} else if (matrix[i][j] == 4) {
			fill('DeepPink');
			rect(j * side, i * side, side, side);
		} else if (matrix[i][j] == 5) {
			if(season != 3){
				fill('red');
				demoncolor.style.backgroundColor = 'red';
			}
			else{
				fill('lightblue');
				demoncolor.style.backgroundColor = 'lightblue';
			}
			rect(j * side, i * side, side, side);
		}
		else if(matrix[i][j] == 6){
			fill('orange');
			rect(j*side,i*side,side,side);
		}
	}
}
}
}
// function genetareMatrix(lengthY, lengthX, number) {

// let matrix = [];

// function getRandomInt(max) {
// return Math.floor(Math.random() * Math.floor(max));
// }

// for (let y = 0; y < lengthY; y++) {
// matrix.push([]);
// for (let x = 0; x < lengthX; x++) {
// let randomCount = getRandomInt(number);
// matrix[y].push(randomCount);
// }
// }
// return matrix;

// }

// let matrix = genetareMatrix(50,50,6);
// var side = 10;
// // let matrix=[[3,3,5]]
// var grassArr = [];
// var EaterArr = [];
// var predArr = [];
// var demonArr = [];
// var pitArr = [];
// var VirusArr = [];
// var inactivearr = [];
// function setup() {
// 	frameRate(3)
// 	createCanvas(matrix[0].length * side, matrix.length * side);
// 	background('gray');
// 	// // let grass = new Grass(1, 1);
// 	// var cells = grass.chooseCell();
// 	// console.log(cells);

// 	for (var i = 0; i < matrix.length; ++i) {
// 		for (var j = 0; j < matrix[i].length; ++j) {
// 			if (matrix[i][j] == 1) {
// 				var gr = new Grass(j, i);
// 				grassArr.push(gr);
// 			}
// 			else if (matrix[i][j] == 2) {
// 				var gr = new GrassEater(j, i);
// 				EaterArr.push(gr);
// 			}
// 			else if(matrix[i][j] == 3){
// 				var pr = new Predator(j,i);
// 				predArr.push(pr);
// 			}
// 			else if(matrix[i][j] == 5){
// 				var dm = new Demon(j,i);
// 				demonArr.push(dm);
// 			}
// 			else if(matrix[i][j] == 4){
// 				var vr = new Virus(j,i);
// 				VirusArr.push(vr);
// 			}
// 		}
// 	}

// }
// function draw() {
// 	// console.log(matrix);
// 	for (var i = 0; i < matrix.length; i++) {
// 		for (var j = 0; j < matrix[i].length; j++) {
// 			if (matrix[i][j] == 1) {
// 				fill('green');
// 			}
// 			else if (matrix[i][j] == 2) {
// 				fill('yellow');
// 			}
// 			else if(matrix[i][j] == 3){
// 				fill('purple');
// 			}
// 			else if (matrix[i][j] == 0) {
// 				fill('gray');
// 			}
// 			else if(matrix[i][j] == 5){
// 				fill('red');
// 			}
// 			else if(matrix[i][j] == 6){
// 				fill('orange');
// 			}
// 			else if(matrix[i][j] == 4){
// 				fill('DeepPink');
// 			}
// 			rect(j * side, i * side, side, side);
// 		}
// 	}
// 	for (var i in grassArr) {
// 		grassArr[i].mul();

// 	}
// 	for (var i in EaterArr) {
// 		EaterArr[i].eat();
// 	}
// 	for(var i in predArr){
// 		predArr[i].eat();
// 	}
// 	for(var i in demonArr){
// 		demonArr[i].destroy();
// 	}
// 	for(var i in pitArr){
// 		if(pitArr[i]){
// 		pitArr[i].burn();
// 		}
// 	}
// 	for(var i in VirusArr){
// 		VirusArr[i].move();
// 	}
// }
