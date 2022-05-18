<?php
session_start();
include 'config.php';

    $_SESSION['i'] = $_SESSION['i'] + 1;
    $output = [];
    $red = '';
    $r = $_GET['r'];
    $octave = 'octave-cli --eval "pkg load control;
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
        initX1=0;
        initX1d=0;
        initX2=0;
        initX2d=0;';

    $redd = '';
    if ($_SESSION['i'] == 1) {
        $redd = '[initX1;initX1d;initX2;initX2d;0]';
    } else {
        $redd = $_SESSION['red'];
    }

    exec($octave . '
        r = '.$r.';
        [y,t,x]=lsim(sys*[0;1],r*ones(size(t)),t,'. $redd.');
        kkt = [t, y, x(:,1)];
        kkt
        "', $output);

        exec($octave . '
        r = '.$r.';
        [y,t,x]=lsim(sys*[0;1],r*ones(size(t)),t,'. $redd.');
        x(size(x,1),:)
        "', $red);
        $_SESSION['red'] = parseRed($red);

    function test_emt_str($var): bool {
        return ($var != '');
    }

    function parseRed($str): string {
        $parsed = array_filter(explode(" ", $str[2]),"test_emt_str");
        return '[' . array_shift($parsed) . ';' . array_shift($parsed) . ';' . array_shift($parsed) . ';' . array_shift($parsed) . ';' . array_shift($parsed) . ']';
    }