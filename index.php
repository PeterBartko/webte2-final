<?php
echo "hello world!";

$cmd = 1 + 1;
$output = '';
exec('octave-cli --eval "pkg load control;
m1 = 2500; m2 = 320;
k1 = 80000; k2 = 500000;
b1 = 350; b2 = 15020;
A=[0 1 0 0;-(b1*b2)/(m1*m2) 0 ((b1/m1)*((b1/m1)+(b1/m2)+(b2/m2)))-(k1/m1) -(b1/m1);b2/m2 0 -((b1/m1)+(b1/m2)+(b2/m2)) 1;k2/m2 0 -((k1/m1)+(k1/m2)+(k2/m2)) 0];
B=[0 0;1/m1 (b1*b2)/(m1*m2);0 -(b2/m2);(1/m1)+(1/m2) -(k2/m2)];
C=[0 0 1 0]; D=[0 0];
Aa = [[A,[0 0 0 0]\'];[C, 0]];
Ba = [B;[0 0]];
Ca = [C,0]; Da = D;
K = [0 2.3e6 5e8 0 8e6];
sys = ss(Aa-Ba(:,1)*K,Ba,Ca,Da);

t = 0:0.01:5;
r =0.1;
initX1=0;
initX1d=0;
initX2=0;
initX2d=0;
[y,t,x]=lsim(sys*[0;1],r*ones(size(t)),t,[initX1;initX1d;initX2;initX2d;0]);y"', $output);

'<pre>';
var_dump($output);
'</pre>';
?>

<!doctype html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Webte-final</title>
</head>
<body>
    <form action="" method="get">
        <textarea name="command" id="command" cols="30" rows="10"></textarea>
<!--        -->
<!--        <div>-->
<!--            <label for="m1">m1: </label><input id="m1" type="text" name="m1">-->
<!--            <label for="m2">m2: </label><input id="m2" type="text" name="m2">-->
<!--        </div>-->
<!--        <div>-->
<!--            <label for="k1">k1: </label><input id="k1" type="text" name="k1">-->
<!--            <label for="k2">k2: </label><input id="k2" type="text" name="k2">-->
<!--        </div>-->
<!--        <div>-->
<!--            <label for="b1">b1: </label><input id="b1" type="text" name="b1">-->
<!--            <label for="b2">b2: </label><input id="b2" type="text" name="b2">-->
<!--        </div>-->
        <div>
            <button type="submit" value="Submit">Submit</button>
        </div>
    </form>
</body>
</html>
