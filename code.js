
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


    game.load.spritesheet('prota', 'Sprites/Sprites_prota_1.png', 38, 64);
    game.load.image('fondo', 'Sprites/fondo.png');
    game.load.image('piedra', 'Sprites/Sprites_bloque_piedra.png');
    game.load.image('ladrillo', 'Sprites/Sprites_bloque_ladrillo.png');
    game.load.image('piedra2', 'Sprites/Sprites_bloque_piedra2.png');
    game.load.image('ladrillo2', 'Sprites/Sprites_bloque_ladrillo2.png');
    game.load.image('cesped1', 'Sprites/Sprites_cesped1.png');
    game.load.image('cesped2', 'Sprites/Sprites_cesped2.png');
   
}

var player;
var cursors;


var ladrillos; //Para el grupo
var piedras;
var piedrasBordes;


var score = 0;
var scoreText;

function create() {

    
    //  A simple background for our game
    game.add.sprite(0,0,'fondo');
    var anchura = 32;
    for (var j = 0; j <mapa[0].length ; j++) {
        game.add.sprite(j*anchura,0,'piedra');
    };

    var altura = 32;
    for (var i = 1; i <mapa.length; i++) {
        fila = mapa[i];
        for (var j = 0; j <fila.length ; j++) {
            if (fila[j] == 0 || fila[j] == 1) {
                if(Math.random() < 0.75 && fila[j] == 0){
                      game.add.sprite(j*anchura,i*altura+12,'ladrillo2');
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

    //  The platforms group contains the ground and the 2 ledges we can jump on
    
    ladrillos = game.add.group();
    piedras = game.add.group();
    piedrasBordes = game.add.group();
    

    //  We will enable physics for any object that is created in this group
    ladrillos.enableBody = true;
    piedras.enableBody = true;
    piedrasBordes.enableBody = true;

    
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(2, 2);

    
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'prota');
  
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);


    player.body.collideWorldBounds = true;
    player.body.setSize(16, 20, 8, 38); //Caja de colisiones del personaje. Se puede modificar más detalladamente. No poner más abajo que peta. 

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3,4], 10, true); //Se crea una animación "left" con los primeros cuatro sprites de "dude", a 10 fps y con loop (true)
    player.animations.add('right',  [0, 1, 2, 3,4],10, true);

   
  
    


    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {



    game.physics.arcade.collide(player, ladrillos);
    game.physics.arcade.collide(player, piedras);


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        //Move up
        player.body.velocity.y = -150;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        //Move down
        player.body.velocity.y = 150;
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    

}

