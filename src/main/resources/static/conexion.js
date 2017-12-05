var myLocalId;
var connection = new WebSocket("ws://" + window.location.host + "/data");
var jugadores = [];

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
            console.log("Velaske yo soi wapa: " + myLocalId);
            break;
        case 1:
            var idAct = JSON.parse(message[1]);
            moverJugadores2(parseInt(idAct[0]) , parseInt(idAct[1]));
            console.log("El jugador " + idAct[0] + " usa acción " + idAct[1]);
            break;
        case 2:
            break;
        default:
            console.log("Ha saltado default en conexion")
            break;
            
    }
    
}

connection.onclose = function() {
	console.log("Cerrando socket.");
}
