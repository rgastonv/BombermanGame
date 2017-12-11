var myLocalId;
var connection = new WebSocket("ws://" + window.location.host + "/data");
var jugadores = [];
var randomMapa;
var mapaBonificadores2;
var nJugadores;
var nombres = [];

connection.onerror = function(e) {
    console.log("WebSocket ha fallado: " + e);
}

connection.onmessage = function(msg) {
    console.log("Mensaje de WS: " + msg.data);
    var message = JSON.parse(msg.data)
    var tipo = parseInt(message[0]);
    switch(tipo){
        case 0:
            myLocalId = parseInt(message[1]);
            console.log("Local ID: " + myLocalId);
            break;
        case 1:
            var idAct = JSON.parse(message[1]);
            moverJugadores2(parseInt(idAct[0]) , parseInt(idAct[1]));
            console.log("El jugador " + idAct[0] + " usa acción " + idAct[1]);
            break;
        case 2:
            randomMapa = JSON.parse(message[1]);
            break;
        case 3:
            mapaBonificadores2  = JSON.parse(message[1]);
            break;
        case 4://hacer tabla con el array recibido actualizado
            var nom = message[1];
            var nId = parseInt(message[2]);
            
            nombres[nId] = nom;
            
            aux = nom;
            
            if (document.getElementById('parrafo' + nId) == null){
                document.getElementById('cajaJugadores').innerHTML += "<div class=\"col-xs-12\" style=\"background-color:aliceblue\"> "+
                        "<form>"+
                            "<div class=\"form-group\" align=\"center\">"+
                                "<p id=\"parrafo" + nId +"\"><img src=\"Sprites/jug_" + nId + ".png\">" + " - " + aux +"</p> "+
                            "</div>"+
                        "</form>"+
                    "</div>";
            }else{
                document.getElementById('parrafo' + nId).innerHTML = "<img src=\"Sprites/jug_" + nId + ".png\">" + " - " + aux;
            }
            
            
            /*$.ajax({
            type: 'GET',
            url:"/login/" + 0,
            headers: {
                "Content-type": "application/json"
            }
            }).done(function(dato) {
                nombres[0] = dato;
                console.log(dato);
            });*/
            
    
            break;
        case 5:
            var fefeo = JSON.parse(message[1]);
            var aux;
            console.log(fefeo);
            for(var i = 0; i<fefeo.length; i++){
                aux = fefeo[i];
                
                if (document.getElementById('parrafo'+i)== null){             
                    document.getElementById('cajaJugadores').innerHTML += "<div class=\"col-xs-12\" style=\"background-color:aliceblue\"> "+
                        "<form>"+
                            "<div class=\"form-group\" align=\"center\">"+
                                "<p id=\"parrafo" + i +"\"><img src=\"Sprites/jug_" + i + ".png\">" + " - " + aux +"</p> "+
                            "</div>"+
                        "</form>"+
                    "</div>";  
                }else{
                    document.getElementById('parrafo' + i).innerHTML = "<img src=\"Sprites/jug_" + i + ".png\">" + " - " + aux;
                }

            
                nombres[i]=fefeo[i];
                
                if (nombres.length >= 8 && myLocalId >= 8){
                    document.getElementById('filaInput').innerHTML ="";
                    document.getElementById('filaTituloInput').innerHTML ="<p>Ya se ha alcanzado el número máximo de jugadores para esta sala. ¡Espera, por favor!</p>";
                    //Borrar botón play
                }
            }
            
            break;
        case 6:
            if(parseInt(message[2]) == parseInt(message[1]) || parseInt(message[2]) == 8){
                cargarGame();
                nJugadores = parseInt(message[2]);
            }else{
                if(parseInt(message[3]) == myLocalId){
                    alert("Falta alguien por unirse a la sala.");
                }
            }
            
            break;
            
        case 7:
            var aux = JSON.parse(message[1]);
            
            for(var i =0; i< aux.length ;i++){
                if(aux[i] == null && jugadores[i]!= undefined){
                    jugadores[i].matar();
                }
                if(jugadores[i]!= undefined){
                    jugadores[i].setSpritePos(parseFloat(aux[i].posXY[0]),parseFloat(aux[i].posXY[1]));
                }
                
                console.log("Actualizado jugador"+i);
            }
            break;
        
        default:
            console.log("Ha saltado default en conexion")
            break;
    }
    
}

connection.onclose = function() {
    console.log("Cerrando socket.");
}
