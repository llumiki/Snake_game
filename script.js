const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');

const posicao = {
    x : 200,
    y : 400
}
const maca = {
    x: Math.floor(Math.random() * 17) * 50,
    y: Math.floor(Math.random() * 17) * 50
}
let acaoAtual
let start

function square(color, x, y){
    ctx.fillStyle = color
    ctx.fillRect(x, y, 50, 50);
    
}
function checkers(){
    let x = 0;
    for(j = 0; j < 850; j+= 50){
        for(i = 0; i < 850; i+= 50){
            if(x % 2 == 0){
                square("#8de0be", j , i);
            }else{
                square("#4bc9b9", j , i);
            }
            x++
        }
    }
    
}
function snake(){
    ctx.fillStyle = "black";
    ctx.fillRect(posicao.x, posicao.y, 50, 50);
}
    


function moverDireita(){
    acaoAtual = () => posicao.x += 50
}
function moverEsquerda(){
    acaoAtual = () => posicao.x -= 50
}
function moverCima(){
    acaoAtual = () => posicao.y -= 50
}
function moverBaixo(){
    acaoAtual = () => posicao.y += 50
}

function gameOver(){
    if(posicao.x >= 850 || posicao.x < 0 || posicao.y >= 850 || posicao.y < 0){
        alert("Game Over");
    }
}
function createApple(x, y){
    ctx.beginPath()
    ctx.fillStyle = "#f54266";
    ctx.arc(x+25, y+25, 25, 0, 2 * Math.PI)
    ctx.fill();
    ctx.closePath()
}
function genApple(){
    maca.x = Math.floor(Math.random() * 17) * 50
    maca.y = Math.floor(Math.random() * 17) * 50
}

function comeu(){
    if(maca.x == posicao.x && maca.y == posicao.y){
        genApple()
    }
}
const handleKeys = {
    KeyS() {
        moverBaixo();
    },
    KeyW() {
        moverCima();
    },
    KeyD() {
        moverDireita();
    },
    KeyA() {
        moverEsquerda();
    }
}

document.addEventListener('keydown', ({code}) => {
    if (handleKeys[code]) {
        handleKeys[code]()
        if(!start){
            start = setInterval(()=>{
                checkers()
                comeu()
                acaoAtual()
                createApple(maca.x, maca.y)
                snake()
                gameOver()
            }, 200)
        }
    }
})

checkers()
snake()
