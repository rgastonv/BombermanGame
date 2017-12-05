package com.example.bombermanserver;

import static com.example.bombermanserver.BomberserverApplication.mapa;
import static com.example.bombermanserver.BomberserverApplication.mapaBonificadores;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import java.io.IOException;
import static java.lang.Integer.parseInt;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

class WebSocketDataHandler extends TextWebSocketHandler {
    
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //Mapa Hash de sesiones
    private ObjectMapper mapper = new ObjectMapper(); //Convertidor json (jackson)
    
    

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Abierta sesión de usuario (data): " + session.getId());
        sessions.put(session.getId(), session); //Se mete la nueva sesión en el hashmap
        
        Gson gson = new Gson();
        String[] datos = new String[2];
        datos[0] = "0";
        datos[1] = session.getId();

        session.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
        
        String aux = gson.toJson(mapa, int[][].class);
        enviarMapa(session, aux);
        
        aux = gson.toJson(mapaBonificadores, int[][].class);
        enviarMapaB(session, aux);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Cerrada sesión de usuario: " + session.getId());
        sessions.remove(session.getId()); //Se quita la sesión del hashmap
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Datos recibidos: " + message.getPayload());
        
        String msg = message.getPayload();
        String[] datos;
        
        Gson gson = new Gson();
        datos = gson.fromJson(msg, String[].class);
        int tipo = parseInt(datos[0]);
        
        switch(tipo){
            case 0:
                System.out.println("Cómo narices he hecho esto");
                break;
            case 1:
                int[] act = gson.fromJson(datos[1], int[].class);
                enviarAcciones(act);
                break;
            case 2:
                System.out.println("Y esto?");
                break;
            default:
                break;
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
    
    private void enviarAcciones(int[] act) throws IOException{
        for(WebSocketSession participant : sessions.values()) {
            Gson gson = new Gson();
            String[] datos = new String[2];
            datos[0] = "1";
            datos[1] = gson.toJson(act, int[].class);
            
            participant.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
        }
    }
    
    private void enviarMapa(WebSocketSession session, String mapa) throws IOException{
        Gson gson = new Gson();
        String[] datos = new String[2];
        datos[0] = "2";
        datos[1] = mapa;
        session.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
    }
    private void enviarMapaB(WebSocketSession session, String mapa) throws IOException{
        Gson gson = new Gson();
        String[] datos = new String[2];
        datos[0] = "3";
        datos[1] = mapa;
        session.sendMessage(new TextMessage(gson.toJson(datos, String[].class)));
    }
}
