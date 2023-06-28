const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');

const posicao = [
    {
        x : 200,
        y : 400
    },
    {
        x : 150,
        y : 400
    },
    {
        x : 100,
        y : 400
    }
]


const maca = {
    x: Math.floor(Math.random() * 15) * 50,
    y: Math.floor(Math.random() * 15) * 50
}

let acaoAtual
let perdeu = false
let start
let direcao
let pontos = 0

function square(color, x, y){
    ctx.fillStyle = color
    ctx.fillRect(x, y, 50, 50);
    
}
function checkers(){
    let x = 0;
    for(j = 0; j < 750; j+= 50){
        for(i = 0; i < 750; i+= 50){
            if(x % 2 == 0){
                square("#8de0be", j , i);
            }else{
                square("#57d4bb", j , i);
            }
            x++
        }
    }
    
}
function snake(){
    ctx.fillStyle = "rgb(100, 130, 200)";
    ctx.fillRect(posicao[0].x, posicao[0].y, 50, 50);
    ctx.fillStyle = "rgb(80, 110, 180)";
    for(i = 1; i < posicao.length; i++){
        ctx.fillRect(posicao[i].x, posicao[i].y, 50, 50);
    }
}
function reorganizar(){
    for(i = posicao.length-1; i > 0; i--){
        posicao[i].x = posicao[i-1].x
        posicao[i].y = posicao[i-1].y
    }
}


function moverDireita(){
    acaoAtual = () => posicao[0].x += 50
    direcao = "direita"
}
function moverEsquerda(){
    acaoAtual = () => posicao[0].x -= 50
    direcao = "esquerda"
}
function moverCima(){
    acaoAtual = () => posicao[0].y -= 50
    direcao = "cima"
}
function moverBaixo(){
    acaoAtual = () => posicao[0].y += 50
    direcao = "baixo"
}

function gameOver(){
    bateuParede()
    seBateu()
    if(perdeu){
        alert("Game Over")
    }
}
function bateuParede(){
    if(posicao[0].x >= 750 || posicao[0].x < 0 || posicao[0].y >= 750 || posicao[0].y < 0){
        perdeu = true;
    }
}
function seBateu(){
    for(i = 1; i < posicao.length; i++){
        if(posicao[0].x == posicao[i].x && posicao[0].y == posicao[i].y){
            perdeu = true;
        }
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
    maca.x = Math.floor(Math.random() * 15) * 50
    maca.y = Math.floor(Math.random() * 15) * 50
}

function comeu(){
    if(maca.x == posicao[0].x && maca.y == posicao[0].y){
        genApple()
        posicao.push({
            x:(posicao[posicao.length-1].x),
            y:(posicao[posicao.length-1].y)
        })
        pontos++
        document.getElementById("pontuacao").innerHTML = pontos
    }
}
const handleKeys = {
    KeyS() {
        if(direcao != "cima")
        moverBaixo();
    },
    KeyW() {
        if(direcao != "baixo")
        moverCima();
    },
    KeyD() {
        if(direcao != "esquerda")
        moverDireita();
    },
    KeyA() {
        if(direcao != "esquerda")
        moverEsquerda();
    }
}

document.getElementById("pontuacao").innerHTML = pontos

document.addEventListener('keydown', ({code}) => {
    if (handleKeys[code]) {
        handleKeys[code]()
        if(!start){
            start = setInterval(()=>{
                checkers()
                comeu()
                reorganizar()
                acaoAtual()
                createApple(maca.x, maca.y)
                snake()
                gameOver()
            }, 100)
        }
    }
})

checkers()
snake()
