cell = new Class({
    initialize: function(row,coll) {
        this.x = coll * width + 5 * (coll +1);
        this.y = row * width + 5 * (row + 1);
    },
    value:0,
    x:0,
    y:0

});

var canvas, ctx;
var scoreLabel = document.getElementById("score");
var cells = [];
var score = 0;
var name;
var fontsize;
var width;
var loose = false;
var check_show_table = false;

function new_sesion(){
    check_name();
    startgame();
}

function check_name() {
    firstName = prompt('How are you name?');
    if (Boolean(firstName)) {
        name = firstName;
        alert("Good game, " + firstName)
    } else
    check_name();
}


function startgame(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    width = canvas.width / 4 - 5;
    create_cells();
    draw_all_cells();
    paste_new_ceil();
}

function create_cells(){
    for (var i = 0; i < 4; i++){
        cells[i] = [];
        for (var j = 0; j < 4; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
}

function draw_cell(cell){
    ctx.beginPath();
  
    ctx.rect(cell.x, cell.y, width, width);
    switch(cell.value) {
        case 0: ctx.fillStyle = "#FAE9C0"; break;
        case 2: ctx.fillStyle = "#F35837"; break;
        case 4: ctx.fillStyle = "#B03920"; break;
        case 8: ctx.fillStyle = "#FF0000"; break;
        case 16: ctx.fillStyle = "#C100FF"; break;
        case 32: ctx.fillStyle = "#6100FF"; break;
        case 64: ctx.fillStyle = "#0013FF"; break;
        case 128: ctx.fillStyle = "#0093FF"; break;
        case 256: ctx.fillStyle = "#00FBFF"; break;
        case 512: ctx.fillStyle = "#00FF3E"; break;
        case 1024: ctx.fillStyle = "#E41DFF"; break;
        case 2048: ctx.fillStyle = "#E8FF00"; break;
        default: ctx.fillStyle = "#E8FF00"; break;
    }
    ctx.fill();
    if(cell.value){
        fontsize = width / 2;
        ctx.font = fontsize + "px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2);
    }
}

function draw_all_cells() {
    for( var i = 0; i < 4; i++) {
         for( var j = 0; j < 4; j++) {
            draw_cell(cells[i][j]);
         }
    }
}

function paste_new_ceil(){
    var check_free = false;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(!cells[i][j].value)
                check_free = true;
        }
    }

    if(!check_free) {
        endgame();
        return;
    }

    while(true){
        var row  = Math.floor(Math.random() * 4);
        var coll  = Math.floor(Math.random() * 4);
        if(!cells[row][coll].value){
            cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
            draw_all_cells();
            return;
        }
    }
}

document.onkeydown = function(event) {
    if(loose)
        return;
    if(event.keyCode == 38 || event.keyCode == 87 ) moveUp();
    else if(event.keyCode == 39 || event.keyCode == 68 ) moveRight();
    else if(event.keyCode == 40 || event.keyCode == 83 ) moveDown();
    else if(event.keyCode == 37 || event.keyCode == 65 ) moveLeft();
    scoreLabel.innerHTML = "Score = " + score;
}

function moveUp() {
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(cells[i][j].value){
                var row = i;
                while(row > 0){
                    if(!cells[row-1][j].value){
                        cells[row-1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row--;
                    }
                    else if(cells[row-1][j].value == cells[row][j].value) {
                        cells[row-1][j].value *= 2;
                        cells[row][j].value = 0;
                        score += cells[row-1][j].value;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    paste_new_ceil();
}

function moveDown() {
    for(var i = 3; i >= 0; i--){
        for(var j = 0; j < 4; j++){
            if(cells[i][j].value){
                var row = i;
                while(row < 3){
                    if(!cells[row+1][j].value){
                        cells[row+1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row++;
                    }
                    else if(cells[row+1][j].value == cells[row][j].value) {
                        cells[row+1][j].value *= 2;
                        cells[row][j].value = 0;
                        score += cells[row+1][j].value;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    paste_new_ceil();
}

function moveRight() {
    for(var i = 0; i < 4; i++){
        for(var j = 3; j >= 0; j--){
            if(cells[i][j].value){
                var coll = j;
                while(coll < 3){
                    if(!cells[i][coll + 1].value){
                        cells[i][coll + 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll++;
                    }
                    else if(cells[i][coll].value == cells[i][coll + 1].value) {
                        cells[i][coll + 1].value *= 2;
                        cells[i][coll].value = 0;
                        score += cells[i][coll + 1].value;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    paste_new_ceil();

}

function moveLeft() {
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(cells[i][j].value){
                var coll = j;
                while(coll > 0){
                    if(!cells[i][coll - 1].value){
                        cells[i][coll - 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll--;
                    }
                    else if(cells[i][coll].value == cells[i][coll - 1].value) {
                        cells[i][coll - 1].value *= 2;
                        cells[i][coll].value = 0;
                        score += cells[i][coll - 1].value;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    paste_new_ceil();
}

function endgame() {
    canvas.style.opacity = "0.5";
    loose = true;
    if(localStorage.getItem(name) < score)
        localStorage.setItem(name, score);
    display_table();
    check_show_table = true;
    document.getElementById('top').hidden = false;
}

function restart() {
    canvas.style.opacity = "1";
    score = 0;
    scoreLabel.innerHTML = "Score = " + score;
    loose = false;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            cells[i][j].value = 0;
        }
    }
    document.getElementById('top').hidden = true;
    check_show_table = false;
    paste_new_ceil();
}

function display_table() {
    let html = "<table id=\"gen\"><th>NAME</th><th>POINTS</th>";
    for (let i = 0; i < localStorage.length && i < 20; i++) {
        html += "<tr aling=\"center\">";
        for (let j = 0; j < 1; j++) {
            let key = localStorage.key(i)
            html += "<td>" + localStorage.key(i) + "</td>";
            html += "<td>" + localStorage.getItem(key) + "</td>"
        }	
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("top").innerHTML = html;
}

function showTable() {
    if(check_show_table){
        document.getElementById('top').hidden = true;
        check_show_table = false;
    }
    else{
        document.getElementById('top').hidden = false;
        display_table();
        check_show_table = true;
    }
}