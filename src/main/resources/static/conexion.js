var myLocalId;
var connection = new WebSocket("ws://" + window.location.host + "/data");
var jugadores = [];
var randomMapa;
var mapaBonificadores2;

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
            
            document.getElementById('cajaJugadores').innerHTML += "<div class=\"col-xs-12\" style=\"background-color:aliceblue\"> "+
                        "<form>"+
                            "<div class=\"form-group\" align=\"center\">"+
                                "<p> Jugador " + nId +": " + nom +"</p> "+
                            "</div>"+
                        "</form>"+
                    "</div>";
            
            
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
            console.log(fefeo);
            for(var i=0; i<fefeo.length; i++){
                document.getElementById('cajaJugadores').innerHTML += "<div class=\"col-xs-12\" style=\"background-color:aliceblue\"> "+
                        "<form>"+
                            "<div class=\"form-group\" align=\"center\">"+
                                "<p> Jugador " + i +": " + fefeo[i] +"</p> "+
                            "</div>"+
                        "</form>"+
                    "</div>";
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
