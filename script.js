var dataJson;
var i = -1;


document.querySelector('button').onclick = () => {
    fetch(`api.php?apikey=1234567890&r=${document.querySelector('input').value}`).then(res => res.json()).then(jsondata => {
        i = 0
        dataJson = jsondata
        simulation.start();
    })
}

var physics = (function() {
    var initialConditions = {
        position:       0.15,
        positionCar:    0.0,
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
        // console.log(dataJson[i].y)
        state.positionCar =(state.position + parseFloat(dataJson[i].y)*(-1));
        state.position = ((parseFloat(dataJson[i].x1))*(-1)+0.1);


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

var graphics = (function() {
    var canvas = null,
        context = null,
        canvasHeight = 400,
        boxSize = 100,
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

        context.beginPath();
        context.fillStyle = colors.shade60;
        context.fillRect(startX, boxTopY, boxSize, boxSize);

        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = colors.shade30;
        context.strokeRect(startX + 0.5, boxTopY + 0.5, boxSize - 1, boxSize - 1);

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
    }

    function fitToContainer(){
        canvas.style.width='100%';
        canvas.style.height= canvasHeight + 'px';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function init(success) {
        canvas = document.querySelector(".HarmonicOscillator-canvas");
        context = canvas.getContext("2d");
        fitToContainer();
        success();
    }

    return {
        fitToContainer: fitToContainer,
        drawScene: drawScene,
        init: init
    };
})();

var simulation = (function() {
    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async function animate() {
        await sleep(100)
        physics.updatePosition();
        graphics.drawScene(physics.state.position, physics.state.positionCar);
        if(i < 500){
            window.requestAnimationFrame(animate);
        }
    }

    function start() {
        graphics.init(function() {
            physics.resetStateToInitialConditions();
            // graphics.drawScene(physics.state.position, physics.state.positionCar);
            window.addEventListener('resize', function(event){
                graphics.fitToContainer();
                graphics.drawScene(physics.state.position);
            });
            if(i > -1){
                animate();
            }
        });
    }

    return {
        start: start
    };
})();

simulation.start();
graphics.drawScene(physics.state.position, physics.state.positionCar);

