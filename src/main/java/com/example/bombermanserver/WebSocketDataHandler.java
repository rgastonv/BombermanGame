package com.example.bombermanserver;

import static com.example.bombermanserver.BomberserverApplication.nJoined;
import static com.example.bombermanserver.BomberserverApplication.mapa;
import static com.example.bombermanserver.BomberserverApplication.numSesiones;
import static com.example.bombermanserver.BomberserverApplication.mapaBonificadores;
import static com.example.bombermanserver.Controller.jugadores;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import java.io.IOException;
import static java.lang.Integer.parseInt;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.websocket.OnMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

class WebSocketDataHandler extends TextWebSocketHandler {

    public Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //Mapa Hash de sesiones
    private ObjectMapper mapper = new ObjectMapper(); //Convertidor json (jackson)
    public ArrayList<String> lJugWS = new ArrayList<String>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Abierta sesión de usuario (data): " + session.getId());
        sessions.put(session.getId(), session); //Se mete la nueva sesión en el hashmap
        numSesiones = sessions.size();
        Gson gson = new Gson();
        String[] datos = new String[2];
        datos[0] = "0";
        datos[1] = session.getId();

        session.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));

        String aux = gson.toJson(mapa, int[][].class);
        enviarMapa(session, aux);

        aux = gson.toJson(mapaBonificadores, int[][].class);
        enviarMapaB(session, aux);

        int sesionInt = Integer.parseInt(session.getId(), 16);
        if (sesionInt < 8) {
            lJugWS.add(parseInt(session.getId()), "...");
        }
        enviarListaNombres();
        //jugadores.add("");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Cerrada sesión de usuario: " + session.getId());
        sessions.remove(session.getId()); //Se quita la sesión del hashmap
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        synchronized(sessions) {
        System.out.println("Datos recibidos: " + message.getPayload());

        String msg = message.getPayload();
        String[] datos;

        Gson gson = new Gson();
        datos = gson.fromJson(msg, String[].class);
        int tipo = parseInt(datos[0]);

        switch (tipo) {
            case 0:
                System.out.println("ids");
                break;
            case 1:
                int[] act = gson.fromJson(datos[1], int[].class);
                enviarAcciones(act);
                break;
            case 2:
                System.out.println("mapa");
                break;
            case 3:
                System.out.println("mapa boni");
                break;
            case 4:
                nJoined++;
                //EL ERROR DA AQUÍ--->  System.out.println(jugadores.get(parseInt(session.getId())) +" ha pulsado join"); <---EL ERROR DA AUÍ!!!!!!
                String[] misDatos = new String[3];
                misDatos[0] = "4";
                misDatos[1] = datos[1];
                misDatos[2] = session.getId();
                String mens = gson.toJson(misDatos, String[].class);
                lJugWS.set(parseInt(session.getId()), misDatos[1]);
                avisarTabla(mens);
                break;
            case 6:
                for (WebSocketSession participant : sessions.values()) {
                    participant.sendMessage(new TextMessage("[6," + numSesiones + "," + nJoined + "," + session.getId() + "]"));
                }
                break;
            case 7:
                actuJug(datos[1]);
                break;
            default:
                break;
        }
        }

        //sendOtherParticipants(session, node);
    }

    /*private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

        System.out.println("Datos enviados: " + node.toString());

        
        ObjectNode newNode = mapper.createObjectNode(); //Nodo con la info de message
        
        newNode.put("id", node.get("id").asText());
        newNode.put("action", node.get("action").asText());

        for(WebSocketSession participant : sessions.values()) {
            if(!participant.getId().equals(session.getId())) {
                participant.sendMessage(new TextMessage(newNode.toString()));
            }
        }
        
    }*/
    private void enviarAcciones(int[] act) throws IOException {
        for (WebSocketSession participant : sessions.values()) {
            Gson gson = new Gson();
            String[] datos = new String[2];
            datos[0] = "1";
            datos[1] = gson.toJson(act, int[].class);

            participant.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
        }
    }

    private void enviarMapa(WebSocketSession session, String mapa) throws IOException {
        Gson gson = new Gson();
        String[] datos = new String[2];
        datos[0] = "2";
        datos[1] = mapa;
        session.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
    }

    private void enviarMapaB(WebSocketSession session, String mapa) throws IOException {
        Gson gson = new Gson();
        String[] datos = new String[2];
        datos[0] = "3";
        datos[1] = mapa;
        session.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
    }

    private void avisarTabla(String mens) throws IOException { //Manda una señal a todos los clientes para que realicen el GET de la tabla
        for (WebSocketSession participant : sessions.values()) {

            participant.sendMessage(new TextMessage(mens));
        }
    }

    private void enviarListaNombres() throws IOException {
        Gson gson = new Gson();
        String[] datos = new String[2];

        for (WebSocketSession participant : sessions.values()) {
            datos[0] = "5";
            datos[1] = gson.toJson(lJugWS, ArrayList.class);

            participant.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
        }
    }

    private void actuJug(String dato) throws IOException {
        Gson gson = new Gson();
        JugadorGame[] arrJug = gson.fromJson(dato, JugadorGame[].class);

        String[] datos = new String[2];
        for (WebSocketSession participant : sessions.values()) {
            datos[0] = "7";
            datos[1] = gson.toJson(arrJug, JugadorGame[].class);

            participant.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
            
        }

    }

}
