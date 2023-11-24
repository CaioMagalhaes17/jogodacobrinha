
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

var cobraX = blockSize * 5;
var cobraY = blockSize * 5;

var velocidadeX = 0;
var velocidadeY = 0;

var corpoCobra = [];

var comidaX;
var comidaY;

var fimDeJogo = false;

window.onload = function() {
    document.getElementById("reload").addEventListener("click", (e) => {
        location.reload();
    });
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}

function update() {
    if (fimDeJogo) {
        return;
    }
    var img = new Image();
        img.src = "./selva.jpg";
        img.onload = function() {
            context.drawImage(img, 0, 0, board.width, board.height);
            context.fillStyle="orange";
            context.fillRect(comidaX, comidaY, blockSize, blockSize);

            if (cobraX == comidaX && cobraY == comidaY) {
                corpoCobra.push([1]);
                placeFood();
            }
        
            for (let i = corpoCobra.length-1; i > 0; i--) {
                corpoCobra[i] = corpoCobra[i-1];
            }
            if (corpoCobra.length) {
                corpoCobra[0] = [cobraX, cobraY];
            }
        
            context.fillStyle="green";
            cobraX += velocidadeX * blockSize;
            cobraY += velocidadeY * blockSize;
            context.fillRect(cobraX, cobraY, blockSize, blockSize);
            for (let i = 0; i < corpoCobra.length; i++) {
                context.fillRect(corpoCobra[i][0], corpoCobra[i][1], blockSize, blockSize);
            }
        
            if (cobraX < 0 || cobraX > cols*blockSize || cobraY < 0 || cobraY > rows*blockSize) {
                fimDeJogo = true;
                alert("Fim de Jogo");
            }
        
            for (let i = 0; i < corpoCobra.length; i++) {
                if (cobraX == corpoCobra[i][0] && cobraY == corpoCobra[i][1]) {
                    fimDeJogo = true;
                    alert("Fim de Jogo");
                }
            }
        };


    
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}


function placeFood() {
    comidaX = Math.floor(Math.random() * cols) * blockSize;
    comidaY = Math.floor(Math.random() * rows) * blockSize;
}
