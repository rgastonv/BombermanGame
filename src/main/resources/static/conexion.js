var myLocalId;
var connection = new WebSocket("ws://" + window.location.host + "/data");
var jugadores = [];

connection.onerror = function(e) {
	console.log("WebSocket ha fallado: " + e);
}

connection.onmessage = function(msg) {
    console.log("Mensaje de WS: " + msg.data);
    var message = JSON.parse(msg.data)
    console.log(message.action);
    var mid= message.id;
    var mAT= mid.action;
    moverJugadores2(mid,mAT);
}

connection.onclose = function() {
	console.log("Cerrando socket.");
}

var connection2 = new WebSocket("ws://" + window.location.host + "/ids");

connection2.onerror = function(e) {
	console.log("WebSocket ha fallado: " + e);
}

connection2.onmessage = function(msg) {
    
    var message = JSON.parse(msg.data)
    myLocalId = message.id;
    console.log("Local id es : " + myLocalId);
}

connection2.onclose = function() {
	console.log("Cerrando socket.");
}
