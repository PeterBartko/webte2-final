let checkanime = document.getElementById('check-anime');
let harmon = document.getElementById('harmon');
document.querySelector("#send").onclick = () => document.location.href = "send.php"


checkanime.addEventListener("click", () => {
    if(checkanime.checked == true){
        harmon.style.visibility = "visible";
    } else {
        harmon.style.visibility = "hidden";
    }
})
let checkgraph = document.getElementById('check-graph');
let graph = document.getElementById('graph-div');
checkgraph.addEventListener("click", () => {
    if(checkgraph.checked == true){
        graph.style.visibility = "visible";
    } else {
        graph.style.visibility = "hidden";
    }
})
slider = document.getElementById("slider")
var r = 0;
var dataJson;
var i = -1;
let chart;
let degrees = 1
let lastR;

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

document.getElementById('r-button').onclick = () => {
    fetch(`api.php?apikey=1234567890&r=${document.getElementById('r-input').value}`).then(res => res.json()).then(jsondata => {
        i = 0
        dataJson = jsondata
        if(dataJson.length === 0){
            return
        }
        console.log(dataJson)
        fun();
        simulation.start();
        if(i !== 0){
            r = document.getElementById('r-input').value
        }
    })
}

async function fun() {
    document.getElementById('myChart').remove();
    let canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.maxHeight = '800px';
    document.getElementById('graph-div').append(canvas);

    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: [],
        datasets: [
            {
                label: 'auto',
                data: [],
                pointRadius: 0,
                hidden: false,
                fill: false,
                borderColor: 'blue',
                tension: 0,
                showLine: true
            },
            {
                label: 'koleso',
                data: [],
                hidden: false,
                fill: false,
                borderColor: 'red',
                tension: 0,
                showLine: true
            }
        ]
    }

    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });

    chart = myChart


    // for (let i = 0; i < dataJson.length; i++) {
    //     myChart.data.labels.push(dataJson[i].t);
    //     myChart.data.datasets[0].data.push(dataJson[i].x1);
    //     myChart.data.datasets[1].data.push(dataJson[i].y);
    //     await sleep(100);
    //     myChart.update();
    // }
}

// async function fun() {
//     document.getElementById('myChart').remove();
//     let canvas = document.createElement('canvas');
//     canvas.id = 'myChart';
//     canvas.style.maxHeight = '800px';
//     document.getElementById('graph-div').append(canvas);
//     const data = {
//         labels: [],
//         datasets: [
//             {
//                 label: 'auto',
//                 data: [],
//                 pointRadius: 0,
//                 hidden: false,
//                 fill: false,
//                 borderColor: 'blue',
//                 tension: 0,
//                 showLine: true
//             },
//             {
//                 label: 'koleso',
//                 data: [],
//                 hidden: false,
//                 fill: false,
//                 borderColor: 'red',
//                 tension: 0,
//                 showLine: true
//             }
//         ]
//     }
//     const ctx = document.getElementById('myChart').getContext('2d');
//     const myChart = new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: {
//             elements: {
//                 point: {
//                     radius: 0
//                 }
//             }
//         }
//     });
//     for (let i = 0; i < dataJson.length; i++) {
//         myChart.data.labels.push(dataJson[i].t);
//         myChart.data.datasets[0].data.push(dataJson[i].x1);
//         myChart.data.datasets[1].data.push(dataJson[i].y);
//         await sleep(100);
//         myChart.update();
//     }
// }

var physics = (function() {
    var initialConditions = {
        position:       0.1,
        positionCar:    -0.1,
        springConstant: 100.0
    };

    var state = {
        position: 0.0,
        positionCar:    0.0,
        velocity: 0,
        springConstant: 0,
        mass: 0
    };

    function resetStateToInitialConditions() {
        state.positionCar = initialConditions.positionCar;
        state.position = initialConditions.position;
    }

    function updatePosition() {
        i++;
        // console.log()
        // console.log(dataJson[i].x1)
        state.positionCar =(state.position + parseFloat(dataJson[i].y)*(-1)) + r - 0.2;
        state.position = ((parseFloat(dataJson[i].x1))*(-1)+0.1) + r;

        // for (let i = 0; i < dataJson.length; i++) {
        //     myChart.data.labels.push(dataJson[i].t);
        //     myChart.data.datasets[0].data.push(dataJson[i].x1);
        //     myChart.data.datasets[1].data.push(dataJson[i].y);
        //     await sleep(100);
        //     myChart.update();
        // }
        chart.data.labels.push(dataJson[i].t);
        chart.data.datasets[0].data.push(dataJson[i].x1);
        chart.data.datasets[1].data.push(dataJson[i].y);
        chart.update();

        slider.value = i;
        // if (state.position > 1) { state.position = 1; }
        // if (state.position < -1) { state.position = -1; }
    }

    function lastPosition(){
        // state.positionCar = parseFloat(dataJson[i].y)*(-1);
        state.position = 0.1;
    }

    return {
        resetStateToInitialConditions: resetStateToInitialConditions,
        updatePosition: updatePosition,
        lastPosition: lastPosition(),
        initialConditions: initialConditions,
        state: state,
    };
})();

var canvas = null,
    context = null
var   canvasHeight = 500

var graphics = (function() {
    // var canvas = null,
    //     context = null,
    //     canvasHeight = 400,
     var boxSize = 100,
        springInfo = {
            height: 30,
            numberOfSegments: 20
        },
        colors = {
            shade30: "#a66000",
            shade40: "#ff6c00",
            shade50: "#ffb100",
            shade60: "#48380c"
        };

    function boxMiddleX(position) {
        var boxSpaceWidth = canvas.width - boxSize;
        return boxSpaceWidth * (position + 1) / 2 + boxSize / 2;
    }

    function boxCarMiddleX(position){
        var boxSpaceWidth = canvas.width - boxSize;
        return boxSpaceWidth * (position + 1) / 2 + boxSize / 2;
    }

    function drawSpring(position) {
        var springEndX = boxMiddleX(position),
            springTopY = (canvasHeight - springInfo.height) / 2,
            springEndY = canvasHeight / 2,
            canvasMiddleX = canvas.width / 2,
            singleSegmentWidth = (canvasMiddleX - springEndX) / (springInfo.numberOfSegments - 1),
            springGoesUp = true;

        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = colors.shade40;
        context.moveTo(springEndX, springEndY);

        for (var i = 0; i < springInfo.numberOfSegments; i++) {
            var currentSegmentWidth = singleSegmentWidth;
            if (i === 0 || i === springInfo.numberOfSegments - 1) { currentSegmentWidth /= 2; }

            springEndX += currentSegmentWidth;
            springEndY = springTopY;
            if (!springGoesUp) { springEndY += springInfo.height; }
            if (i === springInfo.numberOfSegments - 1) { springEndY = canvasHeight / 2; }

            context.lineTo(springEndX, springEndY);
            springGoesUp = !springGoesUp;
        }

        context.stroke();
    }

    function drawBox(position) {
        var boxTopY = Math.floor((canvasHeight - boxSize) / 2);
        var startX = boxMiddleX(position) - boxSize / 2;

        context.beginPath();
        context.fillStyle = "#222";

        context.arc(startX+50, boxTopY+50, 50, 0, 2 * Math.PI);
        context.strokeStyle = "black";
        context.lineWidth = 10;
        context.fill();
        context.stroke();

        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = 'white'
        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+95, boxTopY+50);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+50, boxTopY+95);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+5, boxTopY+50);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+50, boxTopY+5);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+18, boxTopY+18);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+82, boxTopY+18);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+18, boxTopY+82);

        context.moveTo(startX+50, boxTopY+50);
        context.lineTo(startX+82, boxTopY+82);
        context.stroke();

        context.beginPath();
        context.fillStyle = "blue";
        context.arc(startX+50, boxTopY+50, 5, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }

    function drawBoxCar(position) {
        var boxTopY = Math.floor((canvasHeight - boxSize) / 2);
        var startX = boxMiddleX(position) - boxSize / 2;

        // context.beginPath();
        // context.fillStyle = colors.shade60;
        // context.fillRect(startX, boxTopY, boxSize, boxSize);

        // context.beginPath();
        // context.lineWidth = 1;
        // context.strokeStyle = colors.shade30;
        // context.strokeRect(startX + 0.5, boxTopY + 0.5, boxSize - 1, boxSize - 1);

        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 30;
        context.arc(startX+50, boxTopY+50, 80, 1.5*Math.PI, 0.5*Math.PI, true);
        context.stroke();

        context.beginPath();
        context.lineWidth = 30;
        context.strokeStyle = 'black'
        context.moveTo(startX+50, boxTopY-15);
        context.lineTo(startX+50, boxTopY-80);

        context.moveTo(startX+50, boxTopY+115);
        context.lineTo(startX+50, boxTopY+180);
        context.stroke();

    }

    // function drawMiddleLine() {
    //     var middleX = Math.floor(canvas.width / 2);
    //
    //     context.beginPath();
    //     context.moveTo(middleX, 0);
    //     context.lineTo(middleX, canvas.height);
    //     context.lineWidth = 2;
    //     context.strokeStyle = colors.shade40;
    //     context.setLineDash([2,3]);
    //     context.stroke();
    //     context.setLineDash([1,0]);
    // }

    function drawScene(position, positionCar) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // drawMiddleLine();
        // drawSpring(position);

        drawBox(position);
        drawBoxCar(positionCar)

        modifyR = document.getElementById('r-input').value*100*1.6

        context.beginPath();
        context.lineWidth = 2
        context.moveTo(canvas.width/2 + 80, 10);
        context.lineTo(canvas.width/2 + 80 - modifyR, 10);

        context.moveTo(canvas.width/2 + 80 - modifyR, 10);
        context.lineTo(canvas.width/2 + 80 - modifyR, 0)

        context.moveTo(canvas.width/2 + 80, 10);
        context.lineTo(canvas.width/2 + 80, canvasHeight)

        context.stroke();
    }

    function fitToContainer(){
        canvas.style.width='100%';
        // canvas.style.height= '100%';
        canvas.style.height= canvasHeight + 'px';
        // canvas.style.height= '100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // function init(success) {
    //     canvas = document.querySelector(".HarmonicOscillator-canvas");
    //     context = canvas.getContext("2d");
    //     fitToContainer();
    //     success();
    // }

    return {
        fitToContainer: fitToContainer,
        drawScene: drawScene,
        init: init
    };
})();

function init() {
    canvas = document.querySelector(".HarmonicOscillator-canvas");
    context = canvas.getContext("2d");
    context.rotate(20 * Math.PI / 180);
    graphics.fitToContainer();
}


var simulation = (function() {


    async function animate() {
        await sleep(20)
        physics.updatePosition();
        graphics.drawScene(physics.state.position, physics.state.positionCar);
        if(i < 500){
            window.requestAnimationFrame(animate);
        }
    }

    async function start() {
            init()
            physics.resetStateToInitialConditions();
            graphics.drawScene(physics.state.position, physics.state.positionCar);
            window.addEventListener('resize', function (event) {
                graphics.fitToContainer();
                graphics.drawScene(physics.state.position, physics.state.positionCar);
            });

            // var startX = boxMiddleX(position) - boxSize / 2;

            // context.beginPath();
            // context.lineWidth = 2
            // context.moveTo(canvas.width/2 + 80, 10);
            // context.lineTo(canvas.width/2 + 80 - document.getElementById('r-input').value*100*4, 10);
            //
            // context.moveTo(canvas.width/2 + 80 - document.getElementById('r-input').value*100*4, 10);
            // context.lineTo(canvas.width/2 + 80 - document.getElementById('r-input').value*100*4, 400)
            // context.stroke();


            if (i > -1) {
                lastR = document.getElementById('r-input').value
                console.log(lastR)
                document.getElementById('r-input').value
                for (let j = 0; j < 500; j++) {

                }

                await sleep(1000)
                {
                    animate();
                }
            }
        // });
    }

    return {
        start: start
    };
})();




// simulation.start();
// graphics.drawScene(physics.state.position, physics.state.positionCar);

