
var game = new Phaser.Game(544,716 , Phaser.AUTO, '', { preload: preload, create: create, update: update });

function crearBomba(x,y){
    var nuevaBomba = new bomba(game, [x,y],jugadores[0].rango);
    game.add.existing(nuevaBomba);
}

var jugador = function(game, x, y){
    
    Phaser.Sprite.call(this, game, x , y, 'prota1');
    this.rango= 1;

    this.getPos= function (){ //Devuelve la posición parametrizada para la matriz.
        var pos= [];
        pos[0]= Math.floor((this.position.x+19)/32) ;
        pos[1]= Math.floor(((this.position.y-12)+51)/32);  

        //console.log("X:"+ pos[0] + "Y:"+ pos[1] + " pox= "+ this.position.x + "posy "+ this.position.y);
        return pos;
    }


    this.ponerBomba = function(){
        mapa[this.getPos()[1]] [this.getPos()[0]] = 4;
        crearBomba(this.getPos()[1],this.getPos()[0]);
    }

}

    
    jugador.prototype = Object.create(Phaser.Sprite.prototype);
    jugador.prototype.constructor = jugador;


    var bomba = function(game, pos, rango){
        console.log("Peneeee");
        Phaser.Sprite.call(this, game,pos[0]*32, pos[1]*32+12, 'bombas');
        this.rango= rango;
    
        

        this.temporizador=3;

    }

    bomba.prototype = Object.create(Phaser.Sprite.prototype);
    bomba.prototype.constructor = bomba;



var mapa = [
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],

                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
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

var mapaLadrillos = [
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
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 
            ];


            var cursors;

function preload() {

  
    
    var ladrillos; //Para el grupo
    var piedras;
    var piedrasBordes;
    var muroInferior;

    game.load.spritesheet('prota1', 'Sprites/Sprites_prota_1.png', 38, 64);
    game.load.spritesheet('prota2', 'Sprites/Sprites_prota_2.png', 38, 64);

    game.load.spritesheet('bombas','Sprites/Sprites_bombas.png', 40, 40);

    game.load.image('fondo', 'Sprites/fondo.png');
    game.load.image('piedra', 'Sprites/Sprites_bloque_piedra.png');
    game.load.image('ladrillo', 'Sprites/Sprites_bloque_ladrillo.png');
    game.load.image('piedra2', 'Sprites/Sprites_bloque_piedra2.png');
    game.load.image('ladrillo2', 'Sprites/Sprites_bloque_ladrillo2.png');

    game.load.image('tubos', 'Sprites/tubos.png');
    game.load.image('tubo', 'Sprites/tubo.png');
    game.load.image('arbol2', 'Sprites/arbol2.png');
    game.load.image('muroInferior','Sprites/Muro_inferior.png');
 
   
}




var bomba = function(posx, posy, rango){
    var pos = [posx,posy];
    this.getPos = function(){
        return pos;
    }
    var rango=1;
    var tiempo= 3; 
}
var jugadores = [];
var numJugadores = 2;
//TODO Meter dentro de create despues de preguntar el número de jugadores.
// for(var i = 0;i<numJugadores;i++){
//     var nuevoJugador = new jugador(20*i,85*i);
//     jugadores.push(nuevoJugador);
// }

var bombas= [];


var score = 0;
var scoreText;


function moverJugadores(){
    // Controles del jugador 1: ASDW
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        //Izquierda
        jugadores[0].body.velocity.x = -150;
        jugadores[0].animations.play('left');

    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //Derecha
        jugadores[0].body.velocity.x = 150;
        jugadores[0].animations.play('right');

    }else if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        //Arriba
        jugadores[0].body.velocity.y = -150;
        jugadores[0].animations.play('up');

    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        //Abajo
        jugadores[0].body.velocity.y = 150;
        jugadores[0].animations.play('down');

    }else if(game.input.keyboard.isDown(Phaser.Keyboard.Q)){
        jugadores[0].ponerBomba();
    }
    else
    {
        //Quieto
        jugadores[0].animations.stop();
        jugadores[0].frame = 11;
    }
    



    //Controles del jugador 2: flechas
    if (cursors.left.isDown)
    {
        //Izquierda
        jugadores[1].body.velocity.x = -150;

        jugadores[1].animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //Derecha
        jugadores[1].body.velocity.x = 150;

        jugadores[1].animations.play('right');
    }else if (cursors.up.isDown)
    {
        //Arriba
        jugadores[1].body.velocity.y = -150;
        jugadores[1].animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        //Abajo
        jugadores[1].body.velocity.y = 150;
        jugadores[1].animations.play('down');
    }
    else
    {
        //Quieto
        jugadores[1].animations.stop();

        jugadores[1].frame = 11;
    }
}
function destruirLadrillo(jug, ladrillo){
    ladrillo.kill();
}
function colYResetVel(){
    for(var i = 0; i<jugadores.length;i++){
        //  Se resetea la velocidad de los jugadores
        jugadores[i].body.velocity.x = 0;
        jugadores[i].body.velocity.y = 0;

        //Collision
        game.physics.arcade.collide(jugadores[0], ladrillos); //TODO poner i
        game.physics.arcade.collide(jugadores[i], piedras);
        game.physics.arcade.collide(jugadores[i], piedrasBordes);
        game.physics.arcade.collide(jugadores[i], muroInferior);

        game.physics.arcade.overlap(jugadores[1],ladrillos, destruirLadrillo, null, this); //TODO Quitar
        game.physics.arcade.collide(jugadores[i], piedras);    

                
    }
}

function create() {

    ladrillos = game.add.group();
    piedras = game.add.group();
    piedrasBordes = game.add.group();

    ladrillos.enableBody = true;
    piedras.enableBody = true;
    piedrasBordes.enableBody = true;


    fondo = game.add.sprite(0,0,'fondo');
    fondo.sendToBack();
    var anchura = 32;
    for (var j = 0; j < mapa[0].length; j++) {
        //game.add.sprite(j*anchura,0,'piedra');
        var piedraBorde = piedrasBordes.create(j*anchura, 0, 'piedra');
        piedraBorde.body.immovable = true;
    };

    var contador =0;
    var altura = 32;
    for (var i = 1; i <mapa.length; i++) {
        fila = mapa[i];
        for (var j = 0; j <fila.length ; j++) {
            if(Math.random() < 0.75 && fila[j] == 0){
                mapaLadrillos[i][j] = contador;
                contador++;
                var bloqueLadrillo = ladrillos.create(j*anchura, i*altura+12, 'ladrillo2'); //Los ladrillos se crean aleatoriamente con una probabilidad del 75%
                game.world.bringToTop(ladrillos);

                bloqueLadrillo.body.immovable = true;
            }else if(fila[j] == 3) {
                var bloquePiedra = piedras.create(j*anchura,i*altura+12,'piedra2');
                game.world.bringToTop(piedras);
                bloquePiedra.body.immovable = true;
            }else{
                if(fila[j]==4)
                {
                    
                }
            }
                       
        };
    };

    
    

    
    //ground.scale.setTo(2, 2);

    
    // Jugadores y sus configuraciones
    jugadores[0] = new jugador(game,30,game.world.height -108);
    jugadores[1] = new jugador(game,game.world.width - 68, game.world.height - 108);
    

    // jugadores[0] = game.add.sprite(30, game.world.height - 108, 'prota1');
    // jugadores[1] = game.add.sprite(game.world.width - 68, game.world.height - 108, 'prota2');
    game.add.existing(jugadores[0]);
    game.add.existing(jugadores[1]);

    // Se activan las físicas de los jugadores
    game.physics.arcade.enable(jugadores[0] );
    game.physics.arcade.enable(jugadores[1] );


    jugadores[0].body.collideWorldBounds = true;
    jugadores[1].body.collideWorldBounds = true;


    jugadores[0].body.setSize(20, 14, 10, 44); //Caja de colisiones del personaje. Se puede modificar más detalladamente. No poner más abajo que peta.
    jugadores[1].body.setSize(20, 14, 10, 44);

    

    
    jugadores[0].animations.add('right', [0, 1, 2, 3, 4], 10, true); //Se crea una animación "right" con los primeros cinco sprites, a 10 fps y con loop (true)
    jugadores[0].animations.add('left', [5, 6, 7, 8, 9], 10, true);
    jugadores[0].animations.add('down', [10, 11, 12, 13, 14], 15, true);
    jugadores[0].animations.add('up', [15, 16, 17, 18, 19], 15, true);

    jugadores[1].animations.add('right', [0, 1, 2, 3, 4], 10, true);
    jugadores[1].animations.add('left', [5, 6, 7, 8, 9], 10, true);
    jugadores[1].animations.add('down', [10, 11, 12, 13, 14], 15, true);
    jugadores[1].animations.add('up', [15, 16, 17, 18, 19], 15, true);


    for(var i = 0; i<6 ;i++){
        game.add.sprite(80+i*64,316,'tubo');
    };
    game.add.sprite(32,316,'arbol2');
    game.add.sprite(game.world.width - 80,316,'arbol2');

    
   for (var i = 1; i < mapa.length-1; i++) {
        fila = mapa[i];
        for (var j = 0; j <fila.length ; j++) {
            if (fila[j] == 2) {
                //game.add.sprite(j*anchura,i*altura,'piedra');
                var piedraBorde = piedrasBordes.create(j*anchura, i*altura, 'piedra');
                piedraBorde.body.immovable = true;
                piedraBorde.body.setSize(32, 32, 0, 12);
            };
    
        }
    };
    
    muroInferior = game.add.sprite(0,672,'muroInferior');
    
    game.physics.arcade.enable(muroInferior);
            muroInferior.body.immovable = true;
    muroInferior.body.setSize(544,32,0,12);

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Para los controles por teclado

    
    cursors = game.input.keyboard.createCursorKeys();
    
}



function update() {

    
    colYResetVel();

    moverJugadores();    
}

