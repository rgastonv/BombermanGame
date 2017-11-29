var connection = new WebSocket("ws://" + window.location.host + "/data");
connection.onopen = function(){
    connection.send('Hi');
}
connection.onerror = function(e){
    console.log("Ha dado error el ws: "+ e);
}
connection.onmessage = function(msg){
    console.log("Mensaje recibido de WS: "+ msg.data);
}
$(document).ready(function(){
    $('#send-btn').click(function(){
        var message = $('#message').val();
        connection.send(message);
    });
});
