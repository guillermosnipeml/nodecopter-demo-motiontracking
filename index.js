var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var RollingSpider = require('rolling-spider');
var rollingSpider = new RollingSpider();


//Connecting to the rolling spider
rollingSpider.connect(function () {
  rollingSpider.setup(function () {
    
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

  });
});

//Setting the static assets directory
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//Socket.io config
io.on('connection', function(socket) {
    console.log("A user connected");

        socket.on('takeoff', function(socket) {
            console.log("Taking off...");
            rollingSpider.takeOff();
        });

        socket.on('land', function(socket) {
              console.log("landing...");
              rollingSpider.down();
              rollingSpider.down();
        });

        socket.on('left', function(socket) {
              console.log("left turn");
              rollingSpider.counterClockwise();
        });

        socket.on('right', function(socket) {
              console.log("right turn");
              rollingSpider.clockwise();
        });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});