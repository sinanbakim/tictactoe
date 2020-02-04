class FizzyText {
    constructor() {
        this.message = 'dat.gui';
        this.speed = 0.8;
        this.displayOutline = false;
        this.explode = function () { };
        // Define render logic ...
    }
}

var d1, d2, d3, d4, d5, d6, d7, d8, d9;
var intervalHandler;
var clockTicking = false;
var timer = 0;
var curPlayer = 1;


function resizeGrid() {
    var l = $("#ttt-game")[0].offsetWidth / 3;
    $("td")
        .attr("width", l)
        .attr("height", l);
}

function events() {
    $(window).on("resize", function() {
        var l = $("#ttt-game")[0].offsetWidth / 3;
        $("td")
            .attr("width", l)
            .attr("height", l);
    });

    $("#ttt-start").on("click", function(){
        if(timer == 0 && clockTicking == false) {
            clockTicking = true;
            timer = 120;
            intervalHandler = window.setInterval(idle, 1000);
            $("#ttt-game").removeClass("hide");
            $("#ttt-start").html("Spiel pausieren");
            showClock();
        }
        else if(timer > 0 && clockTicking == true) {
            window.clearInterval(intervalHandler);
            $("#ttt-start").html("Spiel fortsetzen");
            clockTicking = false;
        }
        else if(timer > 0 && clockTicking == false) {
            intervalHandler = window.setInterval(idle, 1000);
            $("#ttt-start").html("Spiel pausieren");
            clockTicking = true;
        }
    });

    $("#ttt-stop").on("click", function(){
        timer = 0;
        clockTicking = false;
        window.clearInterval(intervalHandler);
        $("#ttt-start").html("Spiel starten")
        showClock();
    });

    $("td").on("click", function() {
        if($(this).attr("class") == undefined) {
            switch(curPlayer) {
                case 1: 
                    $(this).attr("class", "x");
                    curPlayer = 2;
                    break;
                case 2:
                    $(this).attr("class", "o");
                    curPlayer = 1;
                    break;
            }
        }
    });
}

function getFieldPlayer(field) {
    if($("td").eq(field).attr("class") == "x") {
        return 1;
    }
    if($("td").eq(field).attr("class") == "o") {
        return 2;
    }
}

function checkTriple() {
    var fields = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var pMap = fields.map(getFieldPlayer);
    if(pMap[0] == pMap[1] == pMap[2])
        return pMap[0];
    else if(pMap[3] == pMap[4] == pMap[5])
        return pMap[3];
    else if(pMap[6] == pMap[7] == pMap[8])
        return pMap[6];
    else if(pMap[0] == pMap[3] == pMap[6])
        return pMap[0];
    else if(pMap[1] == pMap[4] == pMap[7])
        return pMap[1];
    else if(pMap[2] == pMap[5] == pMap[8])
        return pMap[2];
    else if(pMap[0] == pMap[4] == pMap[8])
        return pMap[0];
    else if(pMap[2] == pMap[4] == pMap[6])
        return pMap[2];
    else
        return 0;
}

function showGUI() {
    var text = new FizzyText();
    var gui = new dat.GUI();
    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    gui.add(text, 'displayOutline');
    gui.add(text, 'explode');
}

function showClock() {
    $("#ttt-info").html(timer);
}

function selectPrompt(i) {
    switch(i) {
        case 0: $("#ttt-info").html("Spiel vorbei!"); break;
        case 1: $("#ttt-info").html("Spieler 1 gewinnt!"); break;
        case 2: $("#ttt-info").html("Spieler 2 gewinnt!"); break;
    }
    
}

function countdown() {
    showClock();
    if(timer == 0) {
        window.clearInterval(clock);
        clockTicking = false;
    }
    if(timer > 0) {
        timer --;
    }
}

function idle() {
    countdown();
    if(checkTriple() == 0 && timer == 0) {
        window.clearInterval(intervalHandler);
        selectPrompt(0);
    }
    if(checkTriple() == 1) {
        window.clearInterval(intervalHandler);
        selectPrompt(1);
    }
    if(checkTriple() == 2) {
        window.clearInterval(intervalHandler);
        selectPrompt(2);
    }
}

function init() {
    showGUI();
    resizeGrid();
    events();
}

function main() {
    init();
}



