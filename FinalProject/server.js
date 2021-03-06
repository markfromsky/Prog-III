grassArr = [];
EaterArr = [];
predArr = [];
matrix = [];
demonArr = [];
pitArr = []; 
VirusArr = [];
grasscounter = 0;
eatercounter = 0;
predcounter = 0;
season = 0;
seasonchange = 0;

var random = require('./modules/random');

function matrixgen(size,grass,eater,pred,demon,Virus){
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let o = 0; o < size; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let X = Math.floor(random(size));
        let Y = Math.floor(random(size));
        matrix[Y][X] = 1;
    }
    for (let i = 0; i < eater; i++) {
        let X = Math.floor(random(size));
        let Y = Math.floor(random(size));
        matrix[Y][X] = 2;
    }
    for (let i = 0; i < pred; i++) {
        let X = Math.floor(random(size));
        let Y = Math.floor(random(size));
        matrix[Y][X] = 3;
    }
    for (let i = 0; i < demon; i++) {
        let X = Math.floor(random(size));
        let Y = Math.floor(random(size));
        matrix[Y][X] = 5;
    }
    for (let i = 0; i < Virus; i++) {
        let X = Math.floor(random(size));
        let Y = Math.floor(random(size));
        matrix[Y][X] = 4;
    }
}
matrixgen(15,10,4,2,1,6)

var Liveform = require('./modules/Liveform.js');
var grass = require('./modules/grass.js');
var eater = require('./modules/grasseater.js');
var pred = require('./modules/pred.js');
var demon = require('./modules/demon.js');
var Virus = require('./modules/Virus');


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3003);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var Eater = new eater(x, y);
                EaterArr.push(Eater);
                eatercounter++;
            } else if (matrix[y][x] == 1) {
                var grassobj = new grass(x, y);
                grassArr.push(grassobj);
                grasscounter++;
            }
            else if (matrix[y][x] == 3){
                var predator = new pred(x,y);
                predArr.push(predator);
                predcounter++;
            }
            else if (matrix[y][x] == 4){
                var vr  = new Virus(x,y);
                VirusArr.push(vr);
            }
            else if(matrix[y][x] == 5){
                var dmn = new demon(x,y);
                demonArr.push(dmn);
            }
        }
    }
}
creatingObjects();

function game(){
    if(grassArr[0] !== undefined ){
        for( var i in grassArr){
            grassArr[i].mul();
        }
    }
    if(EaterArr[0] !== undefined){
        for(var i in EaterArr){
            EaterArr[i].eat();
        }
    }
    if(predArr[0] !== undefined){
        for(var i in predArr){
            predArr[i].eat();
        }
    }
    if(demonArr[0] !== undefined && season != 3){
        for(var i in demonArr){
            demonArr[i].destroy();
        }
    }
    if(VirusArr[0] !== undefined){
        for(var i in VirusArr){
            VirusArr[i].move();
        }
    }
    if(pitArr[0] !== undefined){
        for(var i in pitArr){
            pitArr[i].burn();
        }
    }
    seasonchange++;
    if(seasonchange >= 10){
        season++;
        seasonchange = 0;
    }
    if(season >= 4){
        season = 0;
        seasonchange = 0;
    }

    if(season == 0){
		seasonname = 'ամառ';
	}
	else if(season == 1){
		seasonname = 'աշուն';
	}
	else if(season == 2){
		seasonname = 'ձմեռ';
	}
	else if(season == 3){
		seasonname = 'գարուն';
	}
    var sendData = {
        matrix: matrix,
        xotcount: grasscounter,
        eatcount: eatercounter,
        prdcount: predcounter,
        season: season,
        seasonname: seasonname
    }

    io.sockets.emit('data',sendData);
}

setInterval(game,100);