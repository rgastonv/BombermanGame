
window.onload = function (){
    document.getElementById("nombre0").innerHTML = "Raquel";
    document.getElementById("pun0").innerHTML = "8";
    
    document.getElementById("nombre1").innerHTML = "Elena";
    document.getElementById("pun1").innerHTML = "5";
    
    document.getElementById("nombre2").innerHTML = "Pablo";
    document.getElementById("pun2").innerHTML = "4";
    
    document.getElementById("nombre3").innerHTML = "Andrés";
    document.getElementById("pun3").innerHTML = "1";
    
        
    $.ajax({
        type: 'GET',
        url:"/records",
        headers: {
            "Content-type": "application/json"
        }
    }).done(function(dato) {
        document.getElementById("nombre0").innerHTML = dato[0].nombre;
        document.getElementById("pun0").innerHTML = dato[0].pun;

        document.getElementById("nombre1").innerHTML = dato[1].nombre;
        document.getElementById("pun1").innerHTML = dato[1].pun;
        
        document.getElementById("nombre2").innerHTML = dato[2].nombre;
        document.getElementById("pun2").innerHTML = dato[2].pun;

        document.getElementById("nombre3").innerHTML = dato[3].nombre;
        document.getElementById("pun3").innerHTML = dato[3].pun;
    });
    
}
var rJugadores = [];

/*var myRequest = new XMLHttpRequest();
myRequest.open('GET','listaPun.JSON');
myRequest.onload = function(){
    var myData = JSON.parse(myRequest.responseText);
    console.log(myData[1].name);
}
myRequest.send();*/




var puntuacionJug = function( p , n){
    this.pun =p;
    this.nombre = n;
    this.getPun = function(){
        return pun;
    }
    this.getNombre = function(){
        return nombre;
    }
    
}

/* //DESCARGA EL JSON AL EJECUTAR
function saveText(text, filename){
    var a = document.createElement('a');
    a.setAttribute('href','data:text/plain; charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download',filename);
    a.click();
}*/

for(var i =0; i<1;i++){
    rJugadores[i] = new puntuacionJug(5, "Unable");    
}
/*var myJSON = JSON.stringify(rJugadores);
saveText(myJSON,"puntuaciones.json");*/


