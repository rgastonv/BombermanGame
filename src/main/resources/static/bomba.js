//Array:
var bombas = [];
bombas[0] = undefined;

//Grupo de Phaser:
var gBombas;

var bomba = function(rng, x, y, idJ, idB){
    this.idB = idB;
    this.rn = rng;
    this.idBomba = bombasCont;
    bombasCont++;
    this.sprite;
    this.idJ = idJ;

    this.init= function(){
        game.time.events.add(Phaser.Timer.SECOND * 3, this.borrarBomba, this);
        idBomba = bombasCont;        
        sprite = gBombas.create(x*32-4, y*32+8, 'bombas');
        sprite.body.immovable = true;
        sprite.body.setSize(32, 32, 4, 4);
    }
    
    this.borrarBomba = function(){
        for(var i = 0; i < bombas.length; i++){
            if(bombas[i] != undefined && bombas[i].idB == this.idB){
                this.explotaBomba();
                break;
            }
        }
    }

    this.explotaBomba = function(){
        gBombas.children[this.idBomba].kill();
        mapa[y][x] = 0;
        if(jugadores[idJ]!= undefined){jugadores[idJ].nBombas++;}; // Si el jugador no está eliminado, devolverle la bomba
        
        for(var i = 0; i < bombas.length; i++){ // Borrar la bomba que ha explotado del array bombas para que el array tenga menor longitud
            if(bombas[i] != undefined && bombas[i].idB == this.idB){
                delete bombas[i];
                break;
            }
        }

        mapaLadrillos[y][x] = 0; // Desaparece la bomba del mapa

        var explosiones = new Array();
        var red2;

        //Booleanos:
        var bArriba = true; // true = camino despejado
        var bAbajo = true;
        var bDerecha = true;
        var bIzquierda = true;
        
        
        red2 = game.add.sprite(x*32,y*32+12,'FC'); // Sprite de explosión en la casilla de la bomba
        explosiones.push(red2);
        
        
        for(var g = 0; g < jugadores.length; g++){ // Elimina al jugador si su posición coincide con la de una bomba
            if(jugadores[g] != undefined && jugadores[g].getPos()[0] == x && jugadores[g].getPos()[1]==(y)){
                jugadores[g].matar();
            }
        }


        for(var i = 1; i <= this.rn; i++){ // Expande el fuego hacia los lados comprobando si hay una piedra o un jugador. 
            
            ///////////////HACIA ABAJO:
            

            if(y+i>0 && y+i<22 && x>0 && x<17 && // Condiciones para que la comprobación no se salga del array
                mapa[y+i][x]!=3 && mapa[y+i][x]!=2 && bAbajo && mapa[y+i][x] !=-13)
            {
                             
                red2=game.add.sprite(x*32,(y+i)*32+12,'FB'); //Se dibuja la explosión intermedia.
                explosiones.push(red2);

                if(mapaBonificadores[y+i][x] >0){
                    destruirBoni(x,y+i);
                }else if(mapaLadrillos[y+i][x] > 0){ // Se destruye el ladrillo
                    destruirLadrillo(x, y+i);
                    bAbajo = false;
                }else if(mapaLadrillos[y+i][x] < 0){
                    for(var z = 0; z < bombas.length; z++){
                        if(bombas[z] != undefined && bombas[z].idB == mapaLadrillos[y+i][x]){
                            bombas[z].borrarBomba();
                            break;
                        }
                    }
                }

                for(var g = 0; g < jugadores.length; g++){ // Se mata al jugador
                    if(jugadores[g] != undefined && jugadores[g].getPos()[0] == x && jugadores[g].getPos()[1] == (y+i)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bAbajo = false; //Alcanzado un obstáculo, el fuego deja de expandirse en esa dirección
            }


            ///////////////HACIA ARRIBA:
            
            if(y-i>0 && y-i<22 && x>0 && x<17 &&
                mapa[y-i][x]!=3 && mapa[y-i][x]!=2 && bArriba && mapa[y-i][x] !=-13)
            {

                
                red2=game.add.sprite(x*32,(y-i)*32+12,'FT'); 
                explosiones.push(red2);
                if(mapaBonificadores[y-i][x] >0){
                    destruirBoni(x,y-i);
                }else if(mapaLadrillos[y-i][x] > 0){
                    destruirLadrillo(x, y-i);

                    bArriba = false;
                }else if(mapaLadrillos[y-i][x] < 0){
                    for(var z = 0; z < bombas.length; z++){
                        if(bombas[z] != undefined && bombas[z].idB == mapaLadrillos[y-i][x]){
                            bombas[z].borrarBomba();
                            break;
                        }
                    }
                }

                for(var g = 0; g < jugadores.length; g++){
                    if(jugadores[g] != undefined && jugadores[g] != undefined && jugadores[g].getPos()[0] == x && jugadores[g].getPos()[1]==(y-i)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bArriba = false;    
            }
            

            ///////////////HACIA LA DERECHA:
            
            if(y>0 && y<22 && x+i>0 && x+i<17 &&
                mapa[y][x+i]!=3 && mapa[y][x+i]!=2 && bDerecha  && mapa[y][x+i] !=-13)
            {
                
                red2=game.add.sprite((x+i)*32,y*32+12,'FR'); 
                explosiones.push(red2);
                
                if(mapaBonificadores[y][x+i] >0){
                    destruirBoni(x+i,y);
                }else if(mapaLadrillos[y][x+i] > 0){
                    destruirLadrillo(x+i, y);
                    bDerecha = false;
                }else if(mapaLadrillos[y][x+i] < 0){
                    for(var z = 0; z < bombas.length; z++){
                        if(bombas[z] != undefined && bombas[z].idB == mapaLadrillos[y][x+i]){
                            bombas[z].borrarBomba();
                            break;
                        }
                    }
                }

                for(var g = 0; g < jugadores.length; g++){
                    if(jugadores[g] != undefined && jugadores[g].getPos()[0] == x+i && jugadores[g].getPos()[1]==(y)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bDerecha = false;
            }


            ///////////////HACIA LA IZQUIERDA:
            
            if(y>0 && y<22 && x-i>0 && x-i<17 &&
                mapa[y][x-i]!=3 && mapa[y][x-i]!=2 && bIzquierda && mapa[y][x-i] !=-13)
            {
                
                red2=game.add.sprite((x-i)*32,y*32+12,'FL'); 
                explosiones.push(red2);

                if(mapaBonificadores[y][x-i] >0){
                    destruirBoni(x-i,y);
                }else if(mapaLadrillos[y][x-i] > 0){
                    destruirLadrillo(x-i, y);

                    bIzquierda = false;
                }else if(mapaLadrillos[y][x-i] < 0){
                    for(var z = 0; z < bombas.length; z++){
                        if(bombas[z] != undefined && bombas[z].idB == mapaLadrillos[y][x-i]){
                            bombas[z].borrarBomba();
                            break;
                        }
                    }
                }

                for(var g = 0; g<jugadores.length; g++){
                    if(jugadores[g] != undefined && jugadores[g].getPos()[0] == x-i && jugadores[g].getPos()[1]==(y)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bIzquierda = false;
            }
        }

        boom.play(); 
        ordenarZ();
        setTimeout(function(){ // La explosión desaparece al cabo de 1 segundo
            for(var iable = 0; iable < explosiones.length; iable++){
                explosiones[iable].kill();
            }
        }, 1000);       
    }
}
