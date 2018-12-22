var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require("./grass");
var Xotaker = require("./xotaker");
var Gishatich = require("./gishatich");
var Mard = require("./mard");

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = [];
w = 30;
h = 30;
grassArr = [], xotakerArr = [], gishatichArr = [], mardArr = [];

var weather = "spring";
io.emit("send weather", weather);

global.cnvacXoteriQanak = 0;
global.cnvacMardkancQanak = 0;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 45) r = 1;
            else if (r < 60) r = 2;
            else if (r < 75) r = 3;
            else if (r < 100) r = 4;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = genMatrix(w, h);

for (var y in matrix) {
    for (var x in matrix[y]) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x * 1, y * 1, 1));
            cnvacXoteriQanak++;
        }
        else if (matrix[y][x] == 2) {
            xotakerArr.push(new Xotaker(x * 1, y * 1, 2));
        }
        else if (matrix[y][x] == 3) {
            gishatichArr.push(new Gishatich(x * 1, y * 1, 3))
        }
        else if (matrix[y][x] == 4) {
            gishatichArr.push(new Mard(x * 1, y * 1, 4))
            cnvacMardkancQanak++;
        }
    }
}

// io.on("connection", function (socket) {

//     setInterval(function () {

//         for (var i in grassArr) {
//             if (weather == "spring" || weather == "summer") {
//                 grassArr[i].multiply = 2*grassArr[i].multiply;
//             }
//             grassArr[i].mul();
//         }

//         for (var i in xotakerArr) {
//             if (weather == "spring" || weather == "summer") {
//                 xotakerArr[i].energy = 32;
//             }
//             else if (weather == "spring" || weather == "winter") {
//                 xotakerArr[i].speed = 4;
//             }
//             xotakerArr[i].bazmanal();
//             xotakerArr[i].utel();
//             xotakerArr[i].mahanal();
//         }


//         for (var i in gishatichArr) {
//             if (weather == "autumn" || weather == "winter") {
//                 gishatichArr[i].speed = 4;
//             }
//             gishatichArr[i].bazmanal();
//             gishatichArr[i].utel();
//             gishatichArr[i].mahanal();
//         }


//         for (var i in mardArr) {
//             if (weather == "autumn" || weather == "winter") {
//                 mardArr[i].speed = 16;
//                 //mardArr[i].utelXotaker();
//             }
//             else if (weather == "spring" || weather == "summer") {
//                 //mardArr[i].utelXot();
//             }
//             mardArr[i].bazmanal();
//             mardArr[i].mahanal();
//         }
//     }, 1000);
// });

setInterval(function () {
    if (weather == "autumn") {
        weather = "winter";
    }
    else if (weather == "winter") {
        weather = "spring";
    }
    else if (weather == "spring") {
        weather = "summer";
    }
    else if (weather == "summer") {
        weather = "autumn";
    }
    io.emit("send weather", weather);
}, 3000);







io.sockets.on("connection", function (socket) {

});
setInterval(function () {

    for (var i in grassArr) {
        if (weather == "spring" || weather == "summer") {
            grassArr[i].multiply = 2 * grassArr[i].multiply;
        }
        else if (weather == "autumn" || weather == "winter") {
            grassArr[i].multiply = 3 * grassArr[i].multiply;
        }
        grassArr[i].mul();
    }

    for (var i in xotakerArr) {
        if (weather == "spring" || weather == "summer") {
            xotakerArr[i].energy = 18;
        }
        else if (weather == "autumn" || weather == "winter") {
            xotakerArr[i].speed = 4;
        }
        xotakerArr[i].bazmanal();
        xotakerArr[i].utel();
        xotakerArr[i].mahanal();
    }


    for (var i in gishatichArr) {
        if (weather == "autumn" || weather == "winter") {
            gishatichArr[i].speed = 4;
        }
        else if (weather == "spring" || weather == "summer") {
            gishatichArr[i].speed = 6;
        }
        gishatichArr[i].bazmanal();
        gishatichArr[i].utel();
        gishatichArr[i].mahanal();
    }


    for (var i in mardArr) {
        if (weather == "autumn" || weather == "winter") {
            mardArr[i].speed = 16;
        }
        else if (weather == "spring" || weather == "summer") {
            mardArr[i].speed = 20;
        }
        mardArr[i].bazmanal();
        mardArr[i].mahanal();
    }
    io.sockets.emit("send matrix", matrix);
}, 300);

var statistics = { "a": [] };
setInterval(function () {
    statistics.a.push({
        "Grass_Born": cnvacXoteriQanak,
        "Mard_Born": cnvacMardkancQanak,
        "Gishatich_Qanak": gishatichArr.length,
        "Xotaker_Qanak": xotakerArr.length,
    });
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw err;
    })
}, 2000);

