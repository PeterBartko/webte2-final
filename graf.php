<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Zadanie 6</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"
            integrity="sha512-GMGzUEevhWh8Tc/njS0bDpwgxdCJLQBWG3Z2Ct+JGOpVnEmjvNx6ts4v6A2XJf1HOrtOsfhv3hBKpK9kE5z8AQ=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
            integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/1.1.1/chartjs-plugin-zoom.min.js"
            integrity="sha512-NxlWEbNbTV6acWnTsWRLIiwzOw0IwHQOYUCKBiu/NqZ+5jSy7gjMbpYI+/4KvaNuZ1qolbw+Vnd76pbIUYEG8g=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body>
<h1>Graf</h1>
<div id="graph-div">
    <canvas id="myChart" width="400" height="400" style="max-height: 300px"></canvas>
</div>
<input type="text" name="r" placeholder="r: ">
<button type="submit" value="Submit">Submit</button>

<script>
    let dataJson;
    document.querySelector('button').onclick = () => {
        fetch(`api.php?apikey=1234567890&r=${document.querySelector('input').value}`)
            .then(res => res.json())
            .then(jsondata => {
                dataJson = jsondata;
                console.log(dataJson);
                fun();
            })
    }

    console.log(dataJson);

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async function fun() {
        document.getElementById('myChart').remove();
        let canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        canvas.style.maxHeight = '400px';
        document.getElementById('graph-div').append(canvas);
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
        const ctx = document.getElementById('myChart').getContext('2d');
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
        for (let i = 0; i < dataJson.length; i++) {
            myChart.data.labels.push(dataJson[i].t);
            myChart.data.datasets[0].data.push(dataJson[i].x1);
            myChart.data.datasets[1].data.push(dataJson[i].y);
            await sleep(50);
            myChart.update();
        }
    }
</script>
</body>
</html>
