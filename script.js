let posicao = {
    x : 200,
    y : 400
}
let acaoAtual
let start

function square(color, x, y){
    const canvas = document.getElementById('mapa');
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation='source-over';
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
    const canvas = document.getElementById('mapa');
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation='source-over';
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
                acaoAtual()
                snake()
            }, 500)
        }
    }
})

checkers()
snake()
