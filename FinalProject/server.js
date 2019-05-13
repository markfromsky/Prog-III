var arrays = require('./modules/arrays.js');
var Liveform = require('./modules/Liveform.js');
var grass = require('./modules/grass.js');
var eater = require('./modules/grasseater.js');
var pred = require('./modules/pred.js');
var matrix = require('/modules/matrix.js');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
 
app.use(express.static('.'));
app.get('/',function(req,res){
    res.redirect('index.html');
});
server.listen(3003);
