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
    <script src="https://unpkg.com/konva@8/konva.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Webte-final</title>
</head>
<body>
     <input type="text" name="r" placeholder="r: " value="0.1">
     <div>
        <button type="submit" value="Submit">Submit</button>
     </div>

     <div class="HarmonicOscillator">
         <canvas class="HarmonicOscillator-canvas"></canvas>
     </div>

<!--    <script>-->
<!--        document.querySelector('button').onclick = () => {-->
<!--            fetch(`api.php?apikey=1234567890&r=${document.querySelector('input').value}`).then(res => res.json()).then(console.log)-->
<!--        }-->
<!--    </script>-->

     <script src="script.js"></script>
</body>
</html>
