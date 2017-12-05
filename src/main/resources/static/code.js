var game = new Phaser.Game(544, 712, Phaser.AUTO, 'cajaGame', { preload: preload, create: create, update: update });

var mapa = [                                                    // Mapa de tiles
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],            // 0: Césped
                                                                // 1: Césped forzado
                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],            // 2: Muro exterior
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],            // 3: Bloque de piedra
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],            // 4: Bomba
                [2,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,2],            // -13: Colisión de túnel/árbol
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
                [2,1,3,0,3,0,3,0,3,0,3,0,3,0,3,1,2],
                [2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2],

                [2,1,-13,1,-13,1,-13,1,-13,1,-13,1,-13,1,-13,1,2],
                [2,-13,-13,1,-13,1,-13,1,-13,1,-13,1,-13,1,-13,-13,2],

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
                                                                // Positivos: índice de bloque de ladrillos
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],            // Negativos: índice de bomba
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


var mapaBonificadores = [
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
var nJugadores = 8;
var indexBomba = 0; // Índice de la bomba en el mapa
var bombasCont = 0; // Índice de la bomba en el grupo


//Grupos de Phaser:
var ladrillos;
var piedras;
var piedrasBordes;

var gArbolInf;
var gArbolSup;
var gTuboInfIzq;
var gTuboInfDcha;
var gTuboSupCentro;
var gTuboSupIzq;
var gTuboSupDcha;

//Sonidos:
var boom; 
var powerUp; 
var winner; 
var popBomba;
var morir; 

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
    game.load.image('rojo','Sprites/rojo.png');
    game.load.image('piedra', 'Sprites/Sprites_bloque_piedra.png');
    game.load.image('piedra2', 'Sprites/Sprites_bloque_piedra2.png');
    game.load.image('ladrillo2', 'Sprites/Sprites_bloque_ladrillo2.png');

    game.load.image('tubo_debajo_izq', 'Sprites/tubo_debajo2.png');
    game.load.image('tubo_debajo_dcha', 'Sprites/tubo_debajo3.png');
    game.load.image('tubo_encima_centro', 'Sprites/tubo_encima1.png');
    game.load.image('tubo_encima_izq', 'Sprites/tubo_encima2.png');
    game.load.image('tubo_encima_dcha', 'Sprites/tubo_encima3.png');
    
    game.load.image('arbol_encima', 'Sprites/arbol_encima.png');
    game.load.image('arbol_debajo', 'Sprites/arbol_debajo.png');

    game.load.image('muroInferior','Sprites/Muro_inferior.png');

    game.load.image('b1', 'Sprites/b1.png');
    game.load.image('b2', 'Sprites/b2.png');
    game.load.image('b3', 'Sprites/b3.png');
    game.load.image('b4', 'Sprites/b4.png');
    game.load.image('b5', 'Sprites/b5.png');
    game.load.image('b6', 'Sprites/b6.png');

    game.load.image('FC', 'Sprites/FC.png');
    game.load.image('FT', 'Sprites/FT.png');
    game.load.image('FR', 'Sprites/FR.png');
    game.load.image('FB', 'Sprites/FB.png');
    game.load.image('FL', 'Sprites/FL.png');





    game.load.audio('BOOM', 'SONIDOS/BOMBA.wav');
    game.load.audio('POWERUP', 'SONIDOS/POWERUP.wav');
    game.load.audio('WINNER', 'SONIDOS/WIN.wav');
    game.load.audio('PONERBOMBA', 'SONIDOS/PONERBOMBA.wav');
    game.load.audio('MORIR', 'SONIDOS/MORIR.wav');
}

function create() {
    var nuevaPartida = new partida();
    nuevaPartida.init();
    game.paused = true; //Comienza habiendo 3 segundos en pausa para prepararse (cuenta atrás)

    setTimeout(function(){
        game.paused = false;
        document.getElementById("musica").volume = 0.2;
        document.getElementById("musica").play();
    }, 2250);
}

function update() {
    colYResetVel();
    pillarInput();
    moverJugadores();
}

var cantarVictoria = function(){
    for(var i = 0; i < jugadores.length; i++){
        if(jugadores[i] != undefined){
            var bar = game.add.graphics();
            switch(i){  //El color del rectángulo depende del sprite del jugador que haya ganado la partida
                case 0:
                    bar.beginFill(0xf9006b,0.6);
                    break;
                case 1:
                    bar.beginFill(0x151515,0.6);
                    break;
                case 2:
                    bar.beginFill(0xe10000,0.6);
                    break;
                case 3:
                    bar.beginFill(0xdfdd00,0.6);
                    break;
                case 4:
                    bar.beginFill(0x2f00df,0.6);
                    break;
                case 5:
                    bar.beginFill(0x00e9ec,0.6);
                    break;
                case 6:
                    bar.beginFill(0x00f762,0.6);
                    break;
                case 7:
                    bar.beginFill(0x3c5451,0.6);
                    break;
                default:
                    break;
            }
            
            bar.drawRect(0,150,544,100);
           
            var style = {font: "bold 32px Arial", fill:"#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            var texto = game.add.text(0,0, '¡Gana '+ jugadores[i].getNombre() + '!', style);
            texto.setShadow(-4,3, 'rgba(0,0,0,0.8)', 1);
            texto.setTextBounds(0,150,544,100);
            document.getElementById("musica").pause();
            winner.play();

            //POST
            $.ajax({
                type: 'POST',
                url:"/actualizar",
                data: jugadores[i].getNombre(),
                headers:{
                    "Content-Type": "application/json",
                }
            });

        }
    }
   
   setTimeout(function(){
        game.paused = true;
   }, 2200);
}

var ordenarZ = function(){ //Función para ordenar los sprites (corrección de oclusiones)
    game.world.bringToTop(gMuroInferior);
    game.world.bringToTop(gTuboSupCentro);
    game.world.bringToTop(gArbolsup);
}

function colYResetVel(){
    for(var i = 0; i < jugadores.length; i++){
        if(jugadores[i] != undefined){
            jugadores[i].colYResetVel();
        }
    }
}

function destruirLadrillo(x, y){
    ladrillos.children[(mapaLadrillos[y][x])-1].kill();
    mapaLadrillos[y][x] = 0;

    var r = Math.random();
    if (r > 0.5){
        var nuevo = new bonificador(x, y);
        nuevo.init();
        for(var k = 0; k <= bonificadores.length; k++){
            if (bonificadores[k] == undefined){
                bonificadores[k] = nuevo;
                
                mapaBonificadores[y][x] = gBonificadores.children.length;
                break;
            }
        }
    }
}

var partida = function(){
    this.init = function(){

    document.getElementById("countdown").volume = 0.5;
        
    boom = game.add.audio('BOOM');
    boom.volume = 0.15;

    powerUp = game.add.audio('POWERUP');
    winner = game.add.audio('WINNER');
    winner.volume = 0.6;
    popBomba = game.add.audio('PONERBOMBA');
    morir = game.add.audio('MORIR');


    ladrillos = game.add.group();
    piedras = game.add.group();
    piedrasBordes = game.add.group();
    gMuroInferior = game.add.group(); // Hecho aparte por las oclusiones entre los sprites

    ladrillos.enableBody = true;
    piedras.enableBody = true;
    piedrasBordes.enableBody = true;
    
    gMuroInferior.enableBody = true;
    gArbolInf = game.add.group();
    gArbolsup = game.add.group();
        
    gTuboSupCentro = game.add.group();
    gTuboInfIzq = game.add.group();
    gTuboInfDcha = game.add.group();
    gTuboSupIzq = game.add.group();
    gTuboSupDcha = game.add.group();
    
    gTuboInfIzq.enableBody = true;
    gTuboInfDcha.enableBody = true;
    gTuboSupIzq.enableBody = true;
    gTuboSupDcha.enableBody = true;
        
    gArbolInf.enableBody = true;
    gArbolsup.enableBody= true;
    gBombas = game.add.group();
    gBonificadores = game.add.group();

    gBombas.enableBody = true;
    gBonificadores.enableBody = true;

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
    for (var i = 0; i < nJugadores; i++){
        jugadores[i] = new jugador(i);
        jugadores[i].init();
    }
    
    
    // Tubos y árboles:
    var tubo;

    for(var i = 0; i < 6 ;i++){
        tubo = gTuboInfDcha.create(80+i*64, 316, 'tubo_debajo_dcha');
        tubo.body.immovable = true;
        tubo.body.setSize(11, 27, 53,53);

        tubo = gTuboInfIzq.create(80+i*64, 316, 'tubo_debajo_izq');
        tubo.body.immovable = true;
        tubo.body.setSize(8, 27, 0,53);

        tubo = gTuboSupCentro.create(80+i*64, 316, 'tubo_encima_centro');
        game.world.bringToTop(gTuboSupCentro);

        tubo = gTuboSupIzq.create(80+i*64, 316, 'tubo_encima_izq');
        tubo.body.immovable = true;
        tubo.body.setSize(8, 37, 0,16);
        game.world.bringToTop(gTuboSupIzq);

        tubo = gTuboSupDcha.create(80+i*64, 316, 'tubo_encima_dcha');
        tubo.body.immovable = true;
        tubo.body.setSize(11, 37, 53,16);
        game.world.bringToTop(gTuboSupIzq);
    }
    
    var parteArbol = gArbolsup.create(32,316,'arbol_encima');
    parteArbol.body.immovable = true;    
    parteArbol = gArbolsup.create(game.world.width - 80,316,'arbol_encima');   
    parteArbol.body.immovable = true; 
    game.world.bringToTop(gArbolsup);
        
    parteArbol = gArbolInf.create(game.world.width - 80,316,'arbol_debajo');
    parteArbol.body.immovable = true; 
    parteArbol.body.setSize(48, 32, 0,48);
    parteArbol = gArbolInf.create(32,316,'arbol_debajo');
    parteArbol.body.immovable = true; 
    parteArbol.body.setSize(48, 32, 0,48);
    
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


    // Controles por teclado:
    cursors = game.input.keyboard.createCursorKeys();
    }
}

