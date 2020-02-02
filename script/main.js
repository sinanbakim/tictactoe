var d1, d2, d3, d4, d5, d6, d7, d8, d9;
var clock = window.setInterval(idle, 1000);
var timer = 120;
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

    $("td").on("click", function() {
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
    });
}

function countdown() {
    $("#ttt-info").html(timer);
    if(timer == 0) {
        window.clearInterval(clock);
        alert("Spiel vorbei!");
    }
    timer --;
}

function idle() {
    countdown();
    
}

function init() {
    resizeGrid();
    events();
}

function main() {
    init();
}



