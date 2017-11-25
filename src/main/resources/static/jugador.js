//Array:
var jugadores = [];
var tecla;

var nombre1;
var nombre2;

$.ajax({
    type: 'GET',
    url:"http://localhost:8080/login/1",
    headers: {
        "Content-type": "application/json"
    }
}).done(function(dato) {
    nombre1 = dato;
});

$.ajax({
    type: 'GET',
    url:"http://localhost:8080/login/2",
    headers: {
        "Content-type": "application/json"
    }
}).done(function(dato) {
    nombre2 = dato;
});


var jugador = function(id){
    // id: Identificador del jugador (empezando en 0)
    var nombre;
    var id = id;
    var sprite;
    this.rng; //Rango de sus bombas
    this.vel; //Velocidad
    this.nBombas; //Número de bombas


            //Cuando solo se juegue con un jugador, aquí habrá que hacer un POST que suba el nombre al servidor para que este administre los 8 nombres
            //Cuando acabe la partida, en CantarVictoria se pide al servidor el nombre del ganador (no se ocupa el cliente de almacenarlos)
    this.init = function(){
        switch(id){
            case 0:
                nombre = nombre1;
                sprite = game.add.sprite(30, 12, 'prota1');
                break;
            case 1:
                nombre = nombre2;
                sprite = game.add.sprite(game.world.width - 68, 12, 'prota2');
                break;
            case 2:
                nombre = "Andrés";
                sprite = game.add.sprite(30, 268, 'prota3');
                break;
            case 3:
                nombre = "Elena";
                sprite = game.add.sprite(game.world.width - 68, 268, 'prota4');
                break;
            case 4:
                nombre = "Felipe";
                sprite = game.add.sprite(30, 396, 'prota5');
                break;
            case 5:
                nombre = "Raquel";
                sprite = game.add.sprite(game.world.width - 68, 396, 'prota6');
                break;
            case 6:
                nombre = "Obama";
                sprite = game.add.sprite(30, 620, 'prota7');
                break;
            case 7:
                nombre = "M. Rajoy";
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

            case -1:
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


function moverJugadores(){
     /*
        -A / J =0 -> Jugador a la izquierda
        -W / I =1 -> Jugador hacia arriba
        -S / K =2 -> Jugador hacia abajo
        -D / L =3 -> Jugador a la derecha
        -Q / U = 5 -> Colocar bomba
        -  = (-1) -> Jugador Quieto
    */

    if(jugadores[0] != undefined){
        // Controles del jugador 1: ASDW

        teclaQ = game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add
       

        if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            jugadores[0].action(0);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[0].action(5);}
        } // Izquierda
        else if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            jugadores[0].action(1);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[0].action(5);}
        } // Arriba
        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            jugadores[0].action(2);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[0].action(5);}
        } // Abajo
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
            jugadores[0].action(3);
            if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[0].action(5);}
        } // Derecha
        else if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[0].action(5);} // PonerBomba
        else {jugadores[0].action(-1);} // Quieto
    }
    
    if(jugadores[1] != undefined){
        //Controles del jugador 2: flechas
        if (game.input.keyboard.isDown(Phaser.Keyboard.J)){
            jugadores[1].action(0);
            if(game.input.keyboard.isDown(Phaser.Keyboard.U)){jugadores[1].action(5);}
        } // Izquierda
        else if (game.input.keyboard.isDown(Phaser.Keyboard.I)){
            jugadores[1].action(1)
            if(game.input.keyboard.isDown(Phaser.Keyboard.U)){jugadores[1].action(5);}
        } // Arriba
        else if (game.input.keyboard.isDown(Phaser.Keyboard.K)){
            jugadores[1].action(2);
            if(game.input.keyboard.isDown(Phaser.Keyboard.U)){jugadores[1].action(5);}
        } // Abajo
        else if (game.input.keyboard.isDown(Phaser.Keyboard.L)){
            jugadores[1].action(3);
            if(game.input.keyboard.isDown(Phaser.Keyboard.U)){jugadores[1].action(5);}
        } // Derecha
        else if(game.input.keyboard.isDown(Phaser.Keyboard.U)){jugadores[1].action(5);} // PonerBomba
        else{jugadores[1].action(-1);} // Quieto
    }
}