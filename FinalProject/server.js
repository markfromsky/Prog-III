grassArr = [];
EaterArr = [];
predArr = [];
matrix = [];

var random = require('./modules/random');

function matrixgen(size,grass,eater,pred){
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let o = 0; o < size; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let X = Math.floor(random(size)); // 0 - 39
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
}
matrixgen(30,10,5,2);

var grass = require('./modules/grass');
var eater = require('./modules/grasseater');


var Liveform = require('./modules/Liveform.js');
var grass = require('./modules/grass.js');
var eater = require('./modules/grasseater.js');
var pred = require('./modules/pred.js');

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
            } else if (matrix[y][x] == 1) {
                var grassobj = new grass(x, y);
                grassArr.push(grassobj);
            }
            else if (matrix[y][x] == 2){
                var predator = new pred(x,y);
                predArr.push(predator);
            }

        }
    }
}
creatingObjects();