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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="inputs.js" defer></script>
    <link rel="stylesheet" href="style.css">
    <title>Webte-final</title>
</head>
<body>
    <header>
        <h1 data-translate="h1"></h1>
        <div id="div-menu">
            <a class="a" href="techdocs.html" data-translate="tech"></a>
            <a class="a" href="documentation.html" data-translate="b1"></a>
            <button id="send" data-translate="b2"></button>
            <div id="lang">
                <img src="images/flag_gb.png" onclick="change_lang_en()" height="20px" width="30px" alt="flag_gb">
                <img src="images/flag_sk.png" onclick="change_lang_sk()" height="20px" width="30px" alt="flag_sk">
            </div>
        </div>
    </header>
        <div class="inp-wrap">
            <div id="input-anime">
                <input id="r-input" type="text" name="r" placeholder="r: " value="0.1">
                <button id="r-button" class="btn" type="submit" value="Submit" data-translate="butsub"></button>
            </div>
            <div id="div-checkbox">
                <div class="cb-wrap">
                    <input type="checkbox" id="check-anime" checked="checked" name="anim" value="yes">
                    <label data-translate="lab2" for="check-anime"></label>
                </div>
                <div class="cb-wrap">
                    <input type="checkbox" id="check-graph" checked="checked" name="graf" value="yes">
                    <label data-translate="lab3" for="check-graph"></label>
                </div>
            </div>
        </div>
<div id="div-screen">
    <div>
        <div id="div-animations">
            <div id="graph-div" style="visibility: visible">
                <canvas id="myChart" width="400" height="400" style="max-height: 300px"></canvas>
            </div>
            <div id="harmon" class="animation-div"  style="visibility: visible">
                <canvas class="HarmonicOscillator-canvas"></canvas>
            </div>
        </div>
    </div>
    <input type="range" id="slider" step="1.0" min="0" max="500" value="0" aria-orientation="horizontal">

</div>
    <div id="calculate-div">
        <div>
            <h2 data-translate="h2"></h2>
        </div>
        <div id="input-calculate">
            <textarea id="input" placeholder="1+1"></textarea>
            <button data-translate="but"></button>
            <textarea id="answer" placeholder="ans =  2"></textarea>
        </div>
    </div>

<footer>
    <h3 data-translate="names"></h3>
    <p>Damián Topoli, Peter Bartko, Martin Šefčík &#169;2022</p>
</footer>

<script src="script2.js"></script> <script src="languages.js"></script>

</body>
</html>
