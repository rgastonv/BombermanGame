var game = new Phaser.Game(544, 712, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var mapa = [                                                    // Mapa de tiles
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],            // 0: Césped
                                                                // 1: Césped forzado
                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],            // 2: Muro exterior
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],            // 3: Bloque de piedra
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],            // 4: Bomba
                [2,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],
                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],

                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],

                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],
                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],

                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
     ];


var mapaLadrillos = [                                           // Mapa de ladrillos
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],            // 0: Vacío
                                                                // Otro: índice del bloque de ladrillos
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ];


var cursors;

//Arrays de objetos:
var jugadores = [];
var bombas = [];

//Grupos de Phaser:
var ladrillos;
var piedras;
var piedrasBordes;

//////////////
var score = 0;
var scoreText;



function preload() {

    game.load.spritesheet('prota1', 'Sprites/Sprites_prota_1.png', 38, 64);
    game.load.spritesheet('prota2', 'Sprites/Sprites_prota_2.png', 38, 64);
    game.load.spritesheet('prota3', 'Sprites/Sprites_prota_3.png', 38, 64);
    game.load.spritesheet('prota4', 'Sprites/Sprites_prota_4.png', 38, 64);
    game.load.spritesheet('prota5', 'Sprites/Sprites_prota_5.png', 38, 64);
    game.load.spritesheet('prota6', 'Sprites/Sprites_prota_6.png', 38, 64);
    game.load.spritesheet('prota7', 'Sprites/Sprites_prota_7.png', 38, 64);
    game.load.spritesheet('prota8', 'Sprites/Sprites_prota_8.png', 38, 64);

    game.load.spritesheet('bombas','Sprites/Sprites_bombas.png', 40, 40);

    game.load.image('fondo', 'Sprites/fondo.png');
    game.load.image('rojo','Sprites/red.png'); // TODO cambiar por sprite de explosión
    game.load.image('piedra', 'Sprites/Sprites_bloque_piedra.png');
    //game.load.image('ladrillo', 'Sprites/Sprites_bloque_ladrillo.png');
    game.load.image('piedra2', 'Sprites/Sprites_bloque_piedra2.png');
    game.load.image('ladrillo2', 'Sprites/Sprites_bloque_ladrillo2.png');

    game.load.image('tubos', 'Sprites/tubos.png');
    game.load.image('tubo', 'Sprites/tubo.png');
    game.load.image('arbol2', 'Sprites/arbol2.png');
    game.load.image('muroInferior','Sprites/Muro_inferior.png');

}


var jugador = function(id){ // Objeto Jugador
    // id: Identificador del jugador (empezando en 0)

    var id = id;
    var sprite;
    this.rng; //Rango de sus bombas
    var vel; // Velocidad
    this.nBombas; // Número de bombas


    this.init = function(){ // Inicializa al personaje
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
                sprite = game.add.sprite(game.world.width - 68, 620, 'prota8');
                break;
        }

        game.physics.arcade.enable(sprite); // Se activan las físicas de los jugadores
        sprite.body.collideWorldBounds = true;
        sprite.body.setSize(20, 14, 10, 44);

        // Animaciones:
        sprite.animations.add('right', [0, 1, 2, 3, 4], 10, true); //Se crea una animación "right" con los primeros cinco sprites, a 10 fps y con loop (true)
        sprite.animations.add('left', [5, 6, 7, 8, 9], 10, true);
        sprite.animations.add('down', [10, 11, 12, 13, 14], 15, true);
        sprite.animations.add('up', [15, 16, 17, 18, 19], 15, true);
        this.rng = 1;

        vel = 200;// TODO más baja
        nBombas = 1;
    }

    this.action = function (n){
        switch(n){
            case 0:
            sprite.body.velocity.x = -vel;
            sprite.animations.play('left');
            break;

            case 1:
            sprite.body.velocity.y = -vel;
            sprite.animations.play('up');
            break;

            case 2:
            sprite.body.velocity.y = vel;
            sprite.animations.play('down');
            break;

            case 3:
            sprite.body.velocity.x = vel;
            sprite.animations.play('right');
            break;

            case -1:
                sprite.animations.stop();
                sprite.frame = 11;
            break;

            case 5:
                if(mapa[this.getPos()[1]] [this.getPos()[0]] != 4){this.ponerBomba();};
                
            break;
        }
    }

    this.matar = function(){ // El personaje muere
        sprite.kill();
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
        
    }

    this.getPos= function (){ // Devuelve la posición parametrizada para la matriz
        var pos= [];
        pos[0]= Math.floor((sprite.position.x+19)/32) ;
        pos[1]= Math.floor(((sprite.position.y-12)+51)/32);
        return pos;
    }

    this.ponerBomba = function(){
        mapa[this.getPos()[1]] [this.getPos()[0]] = 4;
        
        var nuevaBomba = new bomba(this.rng,this.getPos()[0],this.getPos()[1]);
        nuevaBomba.init();
        bombas.push(nuevaBomba);
    }
}


var tiempo; // TODO esta variable no se está usando
var bombasCont = 0;

var bomba = function(rng,x,y){
    this.rn = rng;
    this.x = x;
    this.y = y;
    this.t;
    this.idBomba = bombasCont;
    bombasCont++;
    this.sprite;

    this.init= function(){
        game.time.events.add(Phaser.Timer.SECOND * 1, this.borrarBomba, this); // TODO modificar número de segundos
        idBomba = bombasCont;        
        sprite = gBombas.create(x*32-4,y*32+8, 'bombas');        
        //game.world.bringToTop(gBombas);
        sprite.body.immovable = true;
        sprite.body.setSize(32, 32, 4,4);
    }
    

    this.borrarBomba = function(){
        gBombas.children[this.idBomba].kill()
        mapa[this.y] [this.x] = 0;

        var contExp = 0; // TODO esta variable no se está usando
        var explosiones = new Array();
        var red2;

        var bArriba = true; // true = camino despejado
        var bAbajo = true;
        var bDerecha = true;
        var bIzquierda = true;
        
        
        red2 = game.add.sprite(x*32,y*32+12,'rojo'); // Sprite de explosión en la casilla de la bomba
        explosiones.push(red2);
        cArr = 0; // TODO esta variable no se está usando
        
        for(var g = 0; g < jugadores.length; g++){ // Elimina al jugador si su posición coincide con la de una bomba
            if(jugadores[g].getPos()[0] == this.x && jugadores[g].getPos()[1]==(this.y)){
                jugadores[g].matar();
            }
        }

        for(var i = 1; i <= this.rn; i++){ // Expande el fuego hacia los lados comprobando si hay una piedra o un jugador. 
            
            if(this.y+i>0 && this.y+i<22 && this.x>0 && this.x<17 && // Condiciones para que la comprobación no se salga del array
                mapa[this.y+i][this.x]!=3 && mapa[this.y+i][this.x]!=2 && bAbajo) // Hacia abajo
            {
                red2=game.add.sprite(this.x*32,(this.y+i)*32+12,'rojo'); //Se dibuja la explosión
                explosiones.push(red2);

                if(mapaLadrillos[this.y+i][this.x]!=0){ // Se destruye el ladrillo
                    ladrillos.children[(mapaLadrillos[this.y+i][this.x])-1].kill();
                    mapaLadrillos[this.y+i][this.x]=0;
                }

                for(var g = 0; g < jugadores.length; g++){ // Se mata al jugador
                    if(jugadores[g].getPos()[0] == this.x && jugadores[g].getPos()[1]==(this.y+i)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bAbajo = false; //Alcanzado un obstáculo, el fuego deja de expandirse en esa dirección
            }

            if(this.y-i>0 && this.y-i<22 && this.x>0 && this.x<17 &&
                mapa[this.y-i][this.x]!=3 && mapa[this.y-i][this.x]!=2 && bArriba) // Hacia arriba
            {
                red2=game.add.sprite(this.x*32,(this.y-i)*32+12,'rojo');
                explosiones.push(red2);

                if(mapaLadrillos[this.y-i][this.x]!=0){
                    ladrillos.children[(mapaLadrillos[this.y-i][this.x])-1].kill();
                    mapaLadrillos[this.y-i][this.x]=0;
                }

                for(var g = 0; g < jugadores.length; g++){
                    if(jugadores[g].getPos()[0] == this.x && jugadores[g].getPos()[1]==(this.y-i)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bArriba = false;
            }

            if(this.y>0 && this.y<22 && this.x+i>0 && this.x+i<17 &&
                mapa[this.y][this.x+i]!=3 && mapa[this.y][this.x+i]!=2 && bDerecha) // Hacia la derecha
            {
                red2=game.add.sprite((this.x+i)*32,this.y*32+12,'rojo');
                explosiones.push(red2);

                if(mapaLadrillos[this.y][this.x+i]!=0){
                    ladrillos.children[(mapaLadrillos[this.y][this.x+i])-1].kill();
                    mapaLadrillos[this.y][this.x+i]=0;
                }

                for(var g = 0; g < jugadores.length; g++){
                    if(jugadores[g].getPos()[0] == this.x+i && jugadores[g].getPos()[1]==(this.y)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bDerecha = false;
            }

            if(this.y>0 && this.y<22 && this.x-i>0 && this.x-i<17 &&
                mapa[this.y][this.x-i]!=3 && mapa[this.y][this.x-i]!=2 && bIzquierda) // Hacia la izquierda
            {
                red2=game.add.sprite((this.x-i)*32,this.y*32+12,'rojo');
                explosiones.push(red2);

                if(mapaLadrillos[this.y][this.x-i]!=0){
                    ladrillos.children[(mapaLadrillos[this.y][this.x-i])-1].kill();
                    mapaLadrillos[this.y][this.x-i]=0;
                }

                for(var g = 0; g<jugadores.length; g++){
                    if(jugadores[g].getPos()[0] == this.x-i && jugadores[g].getPos()[1]==(this.y)){
                        jugadores[g].matar();
                    }
                }
            }else{
                bIzquierda = false;
            }

        }


        setTimeout(function(){ // La explosión desaparece al cabo de 1 segundo
            for(var iable = 0; iable < explosiones.length; iable++){
                explosiones[iable].kill();
            }
        }, 1000);
        
    }   
}

function render() {
    game.debug.text("Time until event: " + game.time.events.duration, 32, 32);
}

function moverJugadores(){
     /*
        -A / ← =0 -> Jugador a la izquierda
        -W / ↑ =1 -> Jugador hacia arriba
        -S / ↓ =2 -> Jugador hacia abajo
        -D / → =3 -> Jugador a la derecha
        -Q = 5 -> Colocar bomba
        -  = (-1) -> Jugador Quieto
    */

    // Controles del jugador 1: ASDW
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)){jugadores[0].action(0);} // Izquierda
    else if (game.input.keyboard.isDown(Phaser.Keyboard.W)){jugadores[0].action(1);} // Arriba
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {jugadores[0].action(2);} // Abajo
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){jugadores[0].action(3);} // Derecha
    else if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){jugadores[0].action(5);} // PonerBomba
    else {jugadores[0].action(-1);} // Quieto

    //Controles del jugador 2: flechas
    if (game.input.keyboard.isDown(Phaser.Keyboard.J)){jugadores[1].action(0);} // Izquierda
    else if (game.input.keyboard.isDown(Phaser.Keyboard.I)){jugadores[1].action(1)} // Arriba
    else if (game.input.keyboard.isDown(Phaser.Keyboard.K)){jugadores[1].action(2);} // Abajo
    else if (game.input.keyboard.isDown(Phaser.Keyboard.L)){jugadores[1].action(3);} // Derecha
    else if(game.input.keyboard.isDown(Phaser.Keyboard.U)){jugadores[1].action(5);} // PonerBomba
    else{jugadores[1].action(-1);} // Quieto

}

function colYResetVel(){
    for(var i = 0; i < jugadores.length; i++){
        // Se resetea la velocidad de los jugadores
        jugadores[i].colYResetVel();
    }
}

function destruirLadrillo(jug, ladrillo){
    ladrillo.kill();
}

function create() {

    ladrillos = game.add.group();
    piedras = game.add.group();
    piedrasBordes = game.add.group();
    gMuroInferior = game.add.group(); // Hecho aparte por las oclusiones entre los sprites

    ladrillos.enableBody = true;
    piedras.enableBody = true;
    piedrasBordes.enableBody = true;
    gMuroInferior.enableBody = true;

    gBombas = game.add.group();
    gBombas.enableBody = true;

    var fondo = game.add.sprite(0, 0, 'fondo');
    fondo.sendToBack();

    // Piedras de arriba:
    for (var j = 0; j < mapa[0].length; j++) {
        var piedraBorde = piedrasBordes.create(j*32, 0, 'piedra');
        piedraBorde.body.immovable = true;
    }

    var contador = 1; // Índice de bloque de ladrillo

    for (var i = 1; i < mapa.length; i++) {
        fila = mapa[i];
        for (var j = 0; j < fila.length ; j++) {
            if (fila[j] == 0) {
                if(Math.random() < 0.75 && fila[j] == 0){   // En casillas con césped los ladrillos se crean aleatoriamente con una probabilidad del 75%
                    mapaLadrillos[i][j] = contador;
                    contador++;
                    var bloqueLadrillo = ladrillos.create(j*32, i*32+12, 'ladrillo2');
                    game.world.bringToTop(ladrillos);
                    bloqueLadrillo.body.immovable = true;
                };

            }else if(fila[j] == 3){         // Bloques de piedra
                var bloquePiedra = piedras.create(j*32,i*32+12,'piedra2');
                game.world.bringToTop(piedras);
                bloquePiedra.body.immovable = true;
            };
        };
    };


    // Jugadores y sus configuraciones:
    for (var i = 0; i < 8; i++){
        jugadores[i] = new jugador(i);
        jugadores[i].init();
    }
    

    // Tubos y árboles:
    for(var i = 0; i < 6 ;i++){
        game.add.sprite(80+i*64, 316, 'tubo'); // TODO Oclusiones, colisiones
    }
    game.add.sprite(32,316,'arbol2');
    game.add.sprite(game.world.width - 80,316,'arbol2'); // TODO Oclusiones, colisiones

    
    // Muros laterales:
    for (var i = 1; i < mapa.length-1; i++) {
        fila = mapa[i];
        for (var j = 0; j < fila.length; j++) {
            if (fila[j] == 2) {
                var piedraBorde = piedrasBordes.create(j*32, i*32, 'piedra');
                piedraBorde.body.immovable = true;
                piedraBorde.body.setSize(32, 32, 0, 12);
            }
        }
    }

    // Muro inferior:
    var muroInferior = gMuroInferior.create(0,672,'muroInferior');
    muroInferior.body.immovable = true;
    muroInferior.body.setSize(544, 32, 0, 12);
    game.world.bringToTop(gMuroInferior);

    //  The score // TODO sistema de partida
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Para los controles por teclado
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    colYResetVel();
    moverJugadores();
}