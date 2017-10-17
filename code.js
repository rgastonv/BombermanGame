
var game = new Phaser.Game(544,728 , Phaser.AUTO, '', { preload: preload, create: create, update: update });


var mapa = [
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],

                [3,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,3],
                [3,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,3],
                [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                [3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3],
                [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                [3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3],
                [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                [3,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,3],
                [3,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,3],

                [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
                [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],

                [3,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,3],
                [3,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,3],
                [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                [3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3],
                [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                [3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3],
                [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                [3,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,3],
                [3,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,3],

                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
 
            ];



function preload() {

    game.load.spritesheet('prota1', 'Sprites/Sprites_prota_1.png', 38, 64);
    game.load.spritesheet('prota2', 'Sprites/Sprites_prota_2.png', 38, 64);
    game.load.image('fondo', 'Sprites/fondo.png');
    game.load.image('piedra', 'Sprites/Sprites_bloque_piedra.png');
    game.load.image('ladrillo', 'Sprites/Sprites_bloque_ladrillo.png');
    game.load.image('piedra2', 'Sprites/Sprites_bloque_piedra2.png');
    game.load.image('ladrillo2', 'Sprites/Sprites_bloque_ladrillo2.png');
    game.load.image('cesped1', 'Sprites/Sprites_cesped1.png');
    game.load.image('cesped2', 'Sprites/Sprites_cesped2.png');
   
}

var player = function(posx, posy){
    var pos = [posx,posy];

    this.getPos = function(){
        return pos;
    }

}
var jugadores = [];

var numJugadores = 2;
//TODO Meter dentro de create despues de preguntar el número de jugadores.
for(var i = 0;i<numJugadores;i++){
    var nuevoJugador = new player(20*i,85*i);
    jugadores.push(nuevoJugador);
}

var cursors;
var ladrillos; //Para el grupo
var piedras;
var piedrasBordes;

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
function colYResetVel(){
    for(var i = 0; i<jugadores.length;i++){
        //  Se resetea la velocidad de los jugadores
        jugadores[i].body.velocity.x = 0;
        jugadores[i].body.velocity.y = 0;

        //Collision
        game.physics.arcade.collide(jugadores[i], ladrillos);
        game.physics.arcade.collide(jugadores[i], piedras);    

                
    }
}

function create() {

    game.add.sprite(0,0,'fondo');
    var anchura = 32;
    for (var j = 0; j < mapa[0].length; j++) {
        game.add.sprite(j*anchura,0,'piedra');
    };

    var altura = 32;
    for (var i = 1; i <mapa.length; i++) {
        fila = mapa[i];
        for (var j = 0; j <fila.length ; j++) {
            if (fila[j] == 0 || fila[j] == 1) {
                if(Math.random() < 0.75 && fila[j] == 0){
                      game.add.sprite(j*anchura,i*altura+12,'ladrillo2'); //Los ladrillos se crean aleatoriamente con una probabilidad del 75%
                }else{
                    if ((j+i) %2 ==0) {
                        game.add.sprite(j*anchura,i*altura+12,'cesped2');
                    }else{
                        game.add.sprite(j*anchura,i*altura+12,'cesped1');
                    };
                }
            };
            if (fila[j] == 2) {
                game.add.sprite(j*anchura,i*altura+12,'piedra');
            };
            if (fila[j] == 3) {
                game.add.sprite(j*anchura,i*altura+12,'piedra2');
            };
            if (fila[j] == 5) {
                game.add.sprite(j*anchura,i*altura+12,'ladrillo2');
            };

            
        };
    };

    
    ladrillos = game.add.group();
    piedras = game.add.group();
    piedrasBordes = game.add.group();
    

    ladrillos.enableBody = true;
    piedras.enableBody = true;
    piedrasBordes.enableBody = true;

    
    //ground.scale.setTo(2, 2);

    
    // Jugadores y sus configuraciones
    jugadores[0] = game.add.sprite(30, game.world.height - 108, 'prota1');
    jugadores[1] = game.add.sprite(game.world.width - 68, game.world.height - 108, 'prota2');
  

    // Se activan las físicas de los jugadores
    game.physics.arcade.enable(jugadores[0] );
    game.physics.arcade.enable(jugadores[1] );


    jugadores[0].body.collideWorldBounds = true;
    jugadores[1].body.collideWorldBounds = true;


    jugadores[0].body.setSize(24, 18, 8, 36); //Caja de colisiones del personaje. Se puede modificar más detalladamente. No poner más abajo que peta.
    jugadores[1].body.setSize(24, 18, 8, 36);

    
    jugadores[0].animations.add('right', [0, 1, 2, 3, 4], 10, true); //Se crea una animación "right" con los primeros cinco sprites, a 10 fps y con loop (true)
    jugadores[0].animations.add('left', [5, 6, 7, 8, 9], 10, true);
    jugadores[0].animations.add('down', [10, 11, 12, 13, 14], 15, true);
    jugadores[0].animations.add('up', [15, 16, 17, 18, 19], 15, true);

    jugadores[1].animations.add('right', [0, 1, 2, 3, 4], 10, true);
    jugadores[1].animations.add('left', [5, 6, 7, 8, 9], 10, true);
    jugadores[1].animations.add('down', [10, 11, 12, 13, 14], 15, true);
    jugadores[1].animations.add('up', [15, 16, 17, 18, 19], 15, true);

   
  
    


    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Para los controles por teclado
    cursors = game.input.keyboard.createCursorKeys();
    
}



function update() {

    
    colYResetVel();

    moverJugadores();    

}

