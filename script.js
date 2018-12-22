socket = io();
var w = 30;
var h = 30;
var side = 24;
var weather = "winter";
var weatherP = document.getElementById("weather");
socket.on("send weather", function (data) {
    weather = data;
    document.getElementById("weather").innerHTML = "Weather:" + weather;
    weatherP.innerHTML = weather;
});

function drawmatrix(matrix) {
    background("#acacac");
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if (weather == "winter") {
                    fill("white");
                }
                if (weather == "spring") {
                    fill("green");
                }
                if (weather == "summer") {
                    fill("green");
                }
                if (weather == "autumn") {
                    fill("orange");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
    var rankill = Math.floor(Math.random() * 20 + 1);
    $("#button1").click(function () {
        for (i = 0; i < rankill; i++) {
            for (var y in matrix) {
                for (var x in matrix[y]) {
                    if (matrix[y][x] == 1) {
                        matrix[y][x] = 0;
                        $('body').empty();
                        document.write("GAME OVER");
                    }
                }
            }
        }
    });
    

            //GAME OVER//

    // if (grassArr.length == 900 || (grassArr.length == 0 && xotakerArr.length == 0 && gishatichArr.length == 0 && mardArr.length == 0)) {
    //     background("#acacac");
    //     textSize(60);
    //     fill(0);
    //     textAlign(CENTER);
    //     text("GAME OVER", 360, 370);
    // }
}
socket.on("send matrix", drawmatrix);


function setup(matrix) {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
    $("<div id='con'></div>").appendTo("body");
    $("<button id='button1'>-Grass</button>").appendTo("div");
    $("<button id='button2'>-Xotaker</button>").appendTo("div");
    $("<button id='button3'>-Gishatich</button>").appendTo("div");
    $("<button id='button4'>-Mard</button>").appendTo("div").css("margin-top", "-20px");
    // var rankill = Math.floor(Math.random() * 20 + 1);
    // $("#button1").click(function () {
    //     for (i = 0; i < rankill; i++) {
    //         for (var y in matrix) {
    //             for (var x in matrix[y]) {
    //                 if (matrix[y][x] == 1) {
    //                     matrix[y][x] = 0;
    //                 }
    //             }
    //         }
    //     }
    // });
    // var rankill2 = Math.floor(Math.random() * 20 + 1);
    // $("#button2").click(function () {
    //     for (i = 0; i < rankill2; i++) {
    //         for (var y in matrix) {
    //             for (var x in matrix[y]) {
    //                 if (matrix[y][x] == 2) {
    //                     matrix[y][x] = 0;
    //                 }
    //             }
    //         }
    //     }
    // });
    // var rankill3 = Math.floor(Math.random() * 20 + 1);
    // $("#button3").click(function () {
    //     for (i = 0; i < rankill3; i++) {
    //         for (var y in matrix) {
    //             for (var x in matrix[y]) {
    //                 if (matrix[y][x] == 3) {
    //                     matrix[y][x] = 0;
    //                 }
    //             }
    //         }
    //     }
    // });
}

