//https://evgenii.com/blog/programming-harmonic-oscillator/
let checkanime = document.getElementById('check-anime');
let harmon = document.getElementById('harmon');
document.querySelector("#send").addEventListener('click', () => {
    fetch(`send.php`).then(res => res.json()).then(text=> {
        if(text === "ok"){
            alert(document.querySelector("h1").innerText === "Final assignment" ? "Mail has been sent" : "Mail bol odoslaný")
        }else{
            alert(document.querySelector("h1").innerText === "Final assignment" ? "Mail has not been sent" : "Mail nebol odoslaný")
        }
    })
})

slider = document.getElementById("slider")
submit = document.getElementById('r-button')
let r = 0,
 arrayR = [0],
 dataJson,
 i = -1,
 chart,
 spomalenie = 0,
 canvas = null,
 context = null,
 canvasHeight = 600,
 skok,
 vyska,
 dolnaCast,
 hornacast,
 modifyR

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

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function kontrolaVstupu(){
    if(document.getElementById('r-input').value > 0.4 || document.getElementById('r-input').value < -0.4){
        alert(document.querySelector("h1").innerText === "Final assignment" ? "Value has to be in the range -0.4 to 0.4" : "Zadaná hodnota musí byť v rozsahu od -0.4 do 0.4")
        return false
    }
    return true
}


submit.onclick = () => {
    if(kontrolaVstupu()){
    // Ak animaciu uz neprebieha
        if(i == -1 || slider.value == 500){
            arrayR.push(document.getElementById('r-input').value)
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
                fetch(`spomalenie.php`).then(res => res.json()).then(jsondata => {
                    spomalenie = parseFloat(jsondata)
                })
            })
        }else {
            console.log(document.querySelector("h1").innerText)
            alert(document.querySelector("h1").innerText === "Final assignment" ? "Animation is not finished yet." : "Animácia ešte neskončila.")
        }
    }
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
                label: document.querySelector("h1").innerText === "Final assignment" ? "wheel" : "koleso",
                data: [],
                pointRadius: 0,
                hidden: false,
                fill: false,
                borderColor: 'blue',
                tension: 0,
                showLine: true
            },
            {
                label: document.querySelector("h1").innerText === "Final assignment" ? "car" : "auto",
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
}

var physics = (function() {
    var initialConditions = {
        position:       0.8,
        positionCar:    0.7,
    };

    var state = {
        position: 0.0,
        positionCar:    0.0,
    };

    function resetStateToInitialConditions() {
        state.positionCar = initialConditions.positionCar;
        state.position = initialConditions.position;
    }

    function updatePosition() {
        i++;
        state.positionCar =((state.position + parseFloat(dataJson[i].y)*(-1)) + r - 0.1);
        state.position =  (((parseFloat(dataJson[i].x1))*(-1)+0.1) + r + 0.7) + parseFloat(arrayR[arrayR.length-2]);
        chart.data.labels.push(dataJson[i].t);
        chart.data.datasets[0].data.push(dataJson[i].x1);
        chart.data.datasets[1].data.push(dataJson[i].y);
        chart.update();
        slider.value = i;
    }

    function lastPosition(){
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
    var wheelSize = 100

    function wheelMiddleX(position) {
        var boxSpaceWidth = canvasHeight - wheelSize;
        return boxSpaceWidth * (position + 1) / 2 + wheelSize / 2;
    }

    function drawWheel(position) {
        var boxTopY = wheelMiddleX(position) - canvasHeight/2 + wheelSize/2.5;
        var startX = Math.floor((canvas.width - wheelSize) / 2);

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

    function drawCar(position) {
        var boxTopY = wheelMiddleX(position) - canvasHeight/2 + wheelSize/2.5;
        var startX = Math.floor((canvas.width - wheelSize) / 2);
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 30;
        context.arc(startX+50, boxTopY+50, 80, 2*Math.PI, Math.PI, true);
        context.stroke();
        context.beginPath();
        context.lineWidth = 30;
        context.strokeStyle = 'black'
        context.moveTo(startX-15, boxTopY+50);
        context.lineTo(startX-100, boxTopY+50);
        context.moveTo(startX+115, boxTopY+50);
        context.lineTo(startX+200, boxTopY+50);
        context.stroke();
    }

    function drawScene(position, positionCar) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel(position);
        drawCar(positionCar)
        context.beginPath();
        context.lineWidth = 2
        skok -= 2

        context.moveTo(skok, dolnaCast)
        context.lineTo(skok, hornacast);

        context.moveTo(skok, hornacast);
        context.lineTo( canvas.width, hornacast)

        context.moveTo(skok, dolnaCast)
        context.lineTo( 0, dolnaCast)


        context.stroke();
    }

    function fitToContainer(){
        canvas.style.width='100%';
        canvas.style.height= canvasHeight + 'px';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        skok = canvas.width
    }

    return {
        fitToContainer: fitToContainer,
        drawScene: drawScene,
        init: init
    };
})();

function init() {
    canvas = document.querySelector(".HarmonicOscillator-canvas");
    context = canvas.getContext("2d");

    modifyR = (arrayR[arrayR.length-1] - arrayR[arrayR.length-2])*170
    vyska = canvasHeight/2
    dolnaCast = canvasHeight/2 + 45;
    hornacast = dolnaCast - modifyR - modifyR/2
    graphics.fitToContainer();
}

var simulation = (function() {
    async function animate() {
        await sleep(spomalenie)
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

        dlzka = skok
        startAnimation()

        async function startAnimation() {
            let skokAleboDiera = 0
            if(document.getElementById('r-input').value > 0){
                skokAleboDiera = 50;
            }else{
                skokAleboDiera = 0
            }
            while(skok > dlzka/2+skokAleboDiera){
                context.clearRect(0, 0, canvas.width, canvas.height);
                graphics.drawScene(physics.state.position, physics.state.positionCar);
                context.beginPath();
                context.lineWidth = 2
                skok -= 4

                context.moveTo(skok, dolnaCast)
                context.lineTo(skok, hornacast);

                context.moveTo(skok, hornacast);
                context.lineTo( canvas.width, hornacast)

                context.moveTo(skok, dolnaCast)
                context.lineTo( 0, dolnaCast)

                context.stroke();
                await sleep(40)
            }

            if (i > -1) {
                animate();
            }
        }
    }
    return {
        start: start
    };
})();