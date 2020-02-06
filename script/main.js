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
    var l = $("#ttt-game")[0].offsetWidth;
    $("td")
        .css("width", l / 3)
        .css("height", l / 3);

    $("#ttt-game").css("height", l);
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
            showGrid();
            resizeGrid();
            clockTicking = true;
            timer = 120;
            intervalHandler = window.setInterval(idle, 1000);
            $("#ttt-game tbody").removeClass("hide");
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
        $("#ttt-start").html("Spiel starten");
        $("#ttt-game tbody").addClass("hide");
        $("td").removeAttr("class");
        showClock();
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

function compareAll() {
    if(arguments.length > 1) {
        var i;
        var last = arguments[0];
        for (i = 1; i < arguments.length; i++) {
            if(last == arguments[i]) {
                last = arguments[i];
            } else {
                return false;
            }
        }
        return true;
    } else {
        console.log("Not enough arguments! Expected more than 1.")
    }
}

function checkTriple() {
    var fields = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var pMap = fields.map(getFieldPlayer);
    if(compareAll(pMap[0], pMap[1], pMap[2], 1))
        return 1;
    if(compareAll(pMap[3], pMap[4], pMap[5], 1))
        return 1;
    if(compareAll(pMap[6], pMap[7], pMap[8], 1))
        return 1;
    if(compareAll(pMap[0], pMap[3], pMap[6], 1))
        return 1;
    if(compareAll(pMap[1], pMap[4], pMap[7], 1))
        return 1;
    if(compareAll(pMap[2], pMap[5], pMap[8], 1))
        return 1;
    if(compareAll(pMap[0], pMap[4], pMap[8], 1))
        return 1;
    if(compareAll(pMap[2], pMap[4], pMap[6], 1))
        return 1;
    if(compareAll(pMap[0], pMap[1], pMap[2], 2))
        return 2;
    if(compareAll(pMap[3], pMap[4], pMap[5], 2))
        return 2;
    if(compareAll(pMap[6], pMap[7], pMap[8], 2))
        return 2;
    if(compareAll(pMap[0], pMap[3], pMap[6], 2))
        return 2;
    if(compareAll(pMap[1], pMap[4], pMap[7], 2))
        return 2;
    if(compareAll(pMap[2], pMap[5], pMap[8], 2))
        return 2;
    if(compareAll(pMap[0], pMap[4], pMap[8], 2))
        return 2;
    if(compareAll(pMap[2], pMap[4], pMap[6], 2))
        return 2;
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
    $("#ttt-info p").html(timer);
}

function showPrompt(i) {
    switch(i) {
        case 0: $("#ttt-game").html('<span class="center"><p>Spiel vorbei!</p></span>'); break;
        case 1: $("#ttt-game").html('<span class="center"><p>Spieler X gewinnt!</p></span>'); break;
        case 2: $("#ttt-game").html('<span class="center"><p>Spieler O gewinnt!</p></span>'); break;
        default: $("#ttt-game").html('<span class="center"><p></p></span>'); break;
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

}

function showGrid() {
    $("#ttt-game").html('<table><tbody><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>');
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
        var ttt = checkTriple();
        if(ttt == 0 && timer == 0) {
            window.clearInterval(intervalHandler);
            showPrompt(0);
        }
        if(ttt == 1) {
            window.clearInterval(intervalHandler);
            showPrompt(1);
        }
        if(ttt == 2) {
            window.clearInterval(intervalHandler);
            showPrompt(2);
        }
    });
}

function init() {
    showGUI();
    showPrompt();
    resizeGrid();
    events();
}

function main() {
    init();
}