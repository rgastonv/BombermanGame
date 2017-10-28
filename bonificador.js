//Array:
var bonificadores = [];
bonificadores[0] = undefined;

//Grupo de Phaser:
var gBonificadores;


var bonificador = function(x, y){
    this.tipo;
    var sprite;

    this.init = function(){
        this.tipo = Math.floor(Math.random()*6+1)*(-1);

        //B1: más velocidad
        //B2: más bombas
        //B3: más rango

        //B4: menos velocidad
        //B5: menos bombas
        //B6: menos rango

        switch(this.tipo){
            case -1:
                sprite = gBonificadores.create(x*32,y*32+12, 'b1');
                break;
            case -2:
                sprite = gBonificadores.create(x*32,y*32+12, 'b2');
                break;
            case -3:
                sprite = gBonificadores.create(x*32,y*32+12, 'b3');
                break;

            case -4:
                sprite = gBonificadores.create(x*32,y*32+12, 'b4');
                break;
            case -5:
                sprite = gBonificadores.create(x*32,y*32+12, 'b5');
                break;
            case -6:
                sprite = gBonificadores.create(x*32,y*32+12, 'b6');
                break;
            default:
                break;
        }
        
        sprite.body.setSize(2, 10, 15,11);

        mapa[y][x] = this.tipo;
    }
}


function destruirBoni(x, y){
    gBonificadores.children[(mapaBonificadores[y][x])-1].kill();
    mapaBonificadores[y][x] = 0;
    mapa[y][x] =0;

}
