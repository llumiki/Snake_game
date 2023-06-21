function square(color, x, y){
    const canvas = document.getElementById('mapa');
    const ctx = canvas.getContext('2d');

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
checkers();