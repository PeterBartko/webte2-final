<?php
session_start();
$_SESSION['i'] = 0;
?>

<!doctype html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"
            integrity="sha512-GMGzUEevhWh8Tc/njS0bDpwgxdCJLQBWG3Z2Ct+JGOpVnEmjvNx6ts4v6A2XJf1HOrtOsfhv3hBKpK9kE5z8AQ=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
            integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/1.1.1/chartjs-plugin-zoom.min.js"
            integrity="sha512-NxlWEbNbTV6acWnTsWRLIiwzOw0IwHQOYUCKBiu/NqZ+5jSy7gjMbpYI+/4KvaNuZ1qolbw+Vnd76pbIUYEG8g=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/konva@8/konva.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Webte-final</title>
</head>
<body>
<h1>Final Zadanie</h1>
<div id="div-menu">
    <button>API docs</button>
    <button id="send">Send logs</button>
    <label>En/SK</label>
</div>
<div id="div-screen">
    <div id="input-anime">
        <input id="r-input" type="text" name="r" placeholder="r: " value="0.1">
        <div>
            <button id="r-button" type="submit" value="Submit">Submit</button>
        </div>
    </div>
    <div id="div-checkbox">
        <input type="checkbox" id="check-anime" checked="checked" name="anim" value="yes">
        <label>ANIME</label>
        <input type="checkbox" id="check-graph" checked="checked" name="graf" value="yes">
        <label>GRAPH</label>
    </div>
    <div id="div-animations">
        <div id="harmon" class="HarmonicOscillator" style="visibility: visible">
            <canvas class="HarmonicOscillator-canvas"></canvas>
        </div>
        <div id="graph-div" style="visibility: visible">
            <canvas id="myChart" width="400" height="400" style="max-height: 300px"></canvas>
        </div>
    </div>
    <div id="input-calculate">
        <textarea>...</textarea>
        <button>Calculate</button>
        <textarea>...</textarea>
    </div>
</div>
<div>
    <label>Names</label>
</div>

<script>
    document.querySelector("#send").onclick = () => document.location.href = "send.php"
</script>



<!--<input type="text" name="r" placeholder="r: " value="0.1">
<div>
    <button type="submit" value="Submit">Submit</button>
</div>
<div class="HarmonicOscillator">
    <canvas class="HarmonicOscillator-canvas"></canvas>
</div>

<div id="graph-div">
    <canvas id="myChart" width="400" height="400" style="max-height: 300px"></canvas>
</div>-->

     <script src="script.js"></script>
</body>
</html>
