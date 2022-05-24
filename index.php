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
    <link rel="stylesheet" href="style.css">
    <title>Webte-final</title>
</head>
<body>
<h1 data-translate="h1"></h1>
<div id="div-menu">
    <button data-translate="b1"></button>
    <button id="send" data-translate="b2"></button>
    <div>
        <img src="images/flag_gb.png" onclick="change_lang_en()" height="20px" width="30px" alt="flag_gb">
        <img src="images/flag_sk.png" onclick="change_lang_sk()" height="20px" width="30px" alt="flag_sk">
    </div>
</div>
<div id="div-screen">
    <div id="input-anime">
        <input id="r-input" type="text" name="r" placeholder="r: " value="0.1">
        <div>
            <button id="r-button" type="submit" value="Submit" data-translate="butsub"></button>
        </div>
    </div>
    <div id="div-checkbox">
        <input type="checkbox" id="check-anime" checked="checked" name="anim" value="yes">
        <label data-translate="lab2"></label>
        <input type="checkbox" id="check-graph" checked="checked" name="graf" value="yes">
        <label data-translate="lab3"></label>
    </div>
    <div id="div-animations">
        <div id="harmon" class="HarmonicOscillator" style="visibility: visible">
            <canvas class="HarmonicOscillator-canvas"></canvas>
        </div>
        <div id="graph-div" style="visibility: visible">
            <canvas id="myChart" width="400" height="400" style="max-height: 300px"></canvas>
        </div>
    </div>

    <input type="range" id="slider" step="1.0" min="0" max="500" value="0" aria-orientation="horizontal">

    <div id="input-calculate">
        <textarea>...</textarea>
        <button data-translate="but"></button>
        <textarea>...</textarea>
    </div>
</div>
<div>
    <label data-translate="names"></label>
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
<script>
    var dictionary = {
        'h1': {
            'en': 'Final assignment',
            'sk': 'Finálne zadanie'
        },
        'b1': {
            'en': 'API docs',
            'sk': 'API dokumentácia'
        },
        'b2': {
            'en': 'Send logs',
            'sk': 'Pošli logy'
        },
        'lab2': {
            'en': 'ANIMATION',
            'sk': 'animácia'
        },
        'lab3': {
            'en': 'GRAPH',
            'sk': 'GRAF'
        },
        'but': {
            'en': 'Calculate',
            'sk': 'Vypočítaj'
        },
        'butsub': {
            'en': 'Submit',
            'sk': 'Potvrď'
        },
        'names': {
            'en': 'Names',
            'sk': 'Mená'
        }
    };
    var langs = ['en', 'sk'];
    var current_lang_index = 0;
    var current_lang = langs[current_lang_index];

    window.change_lang_en = function() {
        current_lang_index = 0;
        current_lang = langs[current_lang_index];
        translate();
    }
    window.change_lang_sk = function() {
        current_lang_index = 1;
        current_lang = langs[current_lang_index];
        translate();
    }

    function translate() {
        $("[data-translate]").each(function(){
            var key = $(this).data('translate');
            $(this).html(dictionary[key][current_lang] || "N/A");
        });
    }

    translate();
</script>
</body>
</html>
