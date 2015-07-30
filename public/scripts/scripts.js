var socket = io();

/* add gest.js controls */        
document.addEventListener('gest', function(gesture) {
    if (gesture.up) {
        console.log("Takeoff!");
        socket.emit('takeoff');
    } else if (gesture.down) {
        console.log("Land!");
        socket.emit('land');
    } else if (gesture.right) {
        console.log("Right!");
        socket.emit('right');
    } else {
        console.log("Left!");
        socket.emit('left');
    }

}, false);

gest.start();



