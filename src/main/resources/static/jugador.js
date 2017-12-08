//Array:

var tecla;


    /*$.ajax({
    type: 'GET',
    url:"/login/" + i,
    headers: {
        "Content-type": "application/json"
    }
    }).done(function(dato) {
        nombres[i] = dato;
    });*/




var jugador = function(id){
    // id: Identificador del jugador (empezando en 0)
    /*
        -A / J =0 -> Jugador a la izquierda
        -W / I =1 -> Jugador hacia arriba
        -S / K =2 -> Jugador hacia abajo
        -D / L =3 -> Jugador a la derecha
        -Q / U = 5 -> Colocar bomba
        -  = (4) -> Jugador Quieto
    */
    this.bools = [false,false,false,false,true,false];
    
    var id = id;
    var nombre = nombres[id];
    var sprite;
    this.rng; //Rango de sus bombas
    this.vel; //Velocidad
    this.nBombas; //Número de bombas


            //Cuando solo se juegue con un jugador, aquí habrá que hacer un POST que suba el nombre al servidor para que este administre los 8 nombres
            //Cuando acabe la partida, en CantarVictoria se pide al servidor el nombre del ganador (no se ocupa el cliente de almacenarlos)
    this.init = function(){
        switch(id){
            case 0:
                sprite = game.add.sprite(30, 12, 'prota1');
                break;
            case 1:
                sprite = game.add.sprite(game.world.width - 68, 12, 'prota2');
                break;
            case 2:
                sprite = game.add.sprite(30, 268, 'prota3');
                break;
            case 3:
                sprite = game.add.sprite(game.world.width - 68, 268, 'prota4');
                break;
            case 4:
                sprite = game.add.sprite(30, 396, 'prota5');
                break;
            case 5:
                sprite = game.add.sprite(game.world.width - 68, 396, 'prota6');
                break;
            case 6:
                sprite = game.add.sprite(30, 620, 'prota7');
                break;
            case 7:
                //nombre = "M. Rajoy";
                sprite = game.add.sprite(game.world.width - 68, 620, 'prota8');
                break;
        }

        game.physics.arcade.enable(sprite); // Se activan las físicas de los jugadores
        sprite.body.collideWorldBounds = true;
        sprite.body.setSize(16, 14, 12, 44);

        // Animaciones:
        sprite.animations.add('right', [0, 1, 2, 3, 4], 10, true); //Se crea una animación "right" con los primeros cinco sprites, a 10 fps y con loop (true)
        sprite.animations.add('left', [5, 6, 7, 8, 9], 10, true);
        sprite.animations.add('down', [10, 11, 12, 13, 14], 15, true);
        sprite.animations.add('up', [15, 16, 17, 18, 19], 15, true);
        this.rng = 1;

        this.vel = 75;
        this.nBombas = 1;
    }

    this.getNombre = function(){
        return nombre;
    }

    this.action = function (n){
/*
        //Mandar al server this.id y action(n)
        
*/
        switch(n){
            case 0:
	            sprite.body.velocity.x = -this.vel;
	            sprite.animations.play('left');
	            break;

            case 1:
	            sprite.body.velocity.y = -this.vel;
	            sprite.animations.play('up');
	            break;

            case 2:
	            sprite.body.velocity.y = this.vel;
	            sprite.animations.play('down');
	            break;

            case 3:
            	sprite.body.velocity.x = this.vel;
            	sprite.animations.play('right');
            	break;

            case 4:
                sprite.animations.stop();
                sprite.frame = 11;
            	break;

            case 5:
                if(mapa[this.getPos()[1]] [this.getPos()[0]] != 4 && this.nBombas>0 && mapa[this.getPos()[1]][this.getPos()[0]] != -13){
                	this.ponerBomba();
                	popBomba.play();
                };
            	break;
        }
    }

    this.cogerBoni = function(jug, boni){
        boni.kill();
        powerUp.play(); 
        var k = mapa[this.getPos()[1]][this.getPos()[0]];
        mapa[this.getPos()[1]][this.getPos()[0]] = 0;

        //B1: más velocidad
        //B2: más bombas
        //B3: más rango

        //B4: menos velocidad
        //B5: menos bombas
        //B6: menos rango

        switch(k){
            case -1:
                this.vel += 30;
                break;
            case -2:
                this.nBombas += 1
                break;
            case -3:
                this.rng += 1;
                break;

            case -4:
                 if(this.vel > 104){this.vel -= 30;};
                break;
            case -5:
                if(this.nBombas > 1){this.nBombas -= 1;};
                break;
            case -6:
                if(this.rng > 1){this.rng -= 1;};
                break;
            default:
                break;
        }
    }

    this.matar = function(){ // El personaje muere
        morir.play(); 
        sprite.kill();
        nJugadores--;
        
        delete jugadores[id];
        if(nJugadores == 1){ cantarVictoria(); };  
    }

    this.colYResetVel = function(){
        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;

        //Colisiones
        game.physics.arcade.collide(sprite, piedrasBordes);
        game.physics.arcade.collide(sprite, gMuroInferior);
        game.physics.arcade.collide(sprite, ladrillos);
        game.physics.arcade.collide(sprite, piedras);
        game.physics.arcade.collide(sprite, gBombas);

        game.physics.arcade.collide(sprite, gArbolInf);
        game.physics.arcade.collide(sprite, gTuboInfIzq);
        game.physics.arcade.collide(sprite, gTuboInfDcha);
        game.physics.arcade.collide(sprite, gTuboSupIzq);
        game.physics.arcade.collide(sprite, gTuboSupDcha);

        game.physics.arcade.overlap(sprite, gBonificadores, this.cogerBoni, null, this);
    }

    this.getPos= function (){ // Devuelve la posición parametrizada para la matriz
        var pos= [];
        pos[0]= Math.floor((sprite.position.x+19)/32);
        pos[1]= Math.floor(((sprite.position.y-12)+51)/32); 
        return pos;
    }

    this.ponerBomba = function(){
        this.nBombas--;
        indexBomba--;
        mapa[this.getPos()[1]] [this.getPos()[0]] = 4;
        mapaLadrillos[this.getPos()[1]] [this.getPos()[0]] = indexBomba;
        
        var nuevaBomba = new bomba(this.rng,this.getPos()[0],this.getPos()[1], id, indexBomba);
        nuevaBomba.init();
        for(var k = 0; k <= bombas.length; k++){ //Guarda la bomba en la primera posición vacía del array, y si no hay ninguna, se amplía este.
            if (bombas[k] == undefined){
                bombas[k] = nuevaBomba;
                break;
            }
        }
    }
}

function pillarInput(){
     /*
        -A / J =0 -> Jugador a la izquierda
        -W / I =1 -> Jugador hacia arriba
        -S / K =2 -> Jugador hacia abajo
        -D / L =3 -> Jugador a la derecha
        -Q / U = 5 -> Colocar bomba
        -  = (4) -> Jugador Quieto
    */
    
    

    if(jugadores[myLocalId] != undefined){
        // Controles del jugador 1: ASDW

        teclaQ = game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add
       

        if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            if(!jugadores[myLocalId].bools[0]){
                var arr = [String(1),String(1)];
                var acti = "[";
                acti += String([myLocalId,0]);
                acti += "]";
                arr[1]= acti;
                connection.send(JSON.stringify(arr));
                jugadores[myLocalId].bools[0] = true;
            }
            
            
            
            
            //jugadores[myLocalId].action(0);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[myLocalId].action(5);}
        } // Izquierda
        else if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            if(!jugadores[myLocalId].bools[1]){
                var arr = [String(1),String(1)];
                var acti = "[";
                acti += String([myLocalId,1]);
                acti += "]";
                arr[1]= acti;
                connection.send(JSON.stringify(arr));
                jugadores[myLocalId].bools[1] = true;
            };
            
            //jugadores[myLocalId].action(1);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[myLocalId].action(5);}
        } // Arriba
        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            if(!jugadores[myLocalId].bools[2]){
                var arr = [String(1),String(1)];
                var acti = "[";
                acti += String([myLocalId,2]);
                acti += "]";
                arr[1]= acti;
                connection.send(JSON.stringify(arr));
                jugadores[myLocalId].bools[2] = true;
            }
            
            //jugadores[myLocalId].action(2);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[myLocalId].action(5);}
        } // Abajo
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
            if(!jugadores[myLocalId].bools[3]){
                var arr = [String(1),String(1)];
                var acti = "[";
                acti += String([myLocalId,3]);
                acti += "]";
                arr[1]= acti;
                connection.send(JSON.stringify(arr));
                jugadores[myLocalId].bools[3] = true;
            }
            
            //jugadores[myLocalId].action(3);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[myLocalId].action(5);}
        } // Derecha
        else if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){
            if(!jugadores[myLocalId].bools[5]){
                var arr = [String(1),String(1)];
                var acti = "[";
                acti += String([myLocalId,5]);
                acti += "]";
                arr[1]= acti;
                connection.send(JSON.stringify(arr));
                jugadores[myLocalId].bools[5] = true;
            }
            
            //jugadores[myLocalId].action(5);
        } // PonerBomba
        else {
            if(!jugadores[myLocalId].bools[4]){
                var arr = [String(1),String(1)];
                var acti = "[";
                acti += String([myLocalId,4]);
                acti += "]";
                arr[1]= acti;
                connection.send(JSON.stringify(arr));
                jugadores[myLocalId].bools[4] = true;
            }
            
           
            //jugadores[myLocalId].action(4);
        } // Quieto

    }
    
}

function moverJugadores(){
    for(var i =0;i<jugadores.length;i++){
        if(jugadores[i]!= undefined){
            for(var j = 0; j < jugadores[i].bools.length; j++){
                if(jugadores[i].bools[j]){
                    jugadores[i].action(j);
                }
            }
        }
    }
}

function moverJugadores2(id, act){
     
    if(jugadores[id] != undefined){
        for(var i = 0; i<jugadores[id].bools.length; i++){
            jugadores[id].bools[i]=false
        }
        jugadores[id].bools[act] = true;
    }
    
}