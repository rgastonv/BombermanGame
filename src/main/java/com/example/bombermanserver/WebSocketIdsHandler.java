package com.example.bombermanserver;

import static com.example.bombermanserver.WebSocketDataHandler.arry;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

class WebSocketIdsHandler extends TextWebSocketHandler {

    //private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //Mapa Hash de sesiones
    private ObjectMapper mapper = new ObjectMapper(); //Convertidor json (jackson)

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Abierta sesión de usuario (ids): " + session.getId());
        
        
       // sessions.put(session.getId(), session); //Se mete la nueva sesión en el hashmap
        /*
        JsonNode node = mapper.readTree(message.getPayload());
        
        ObjectNode newNode = mapper.createObjectNode(); //Nodo con la info de message
        
        newNode.put("id", node.get("id").asText());
        newNode.put("action", node.get("action").asText());

        for(WebSocketSession participant : sessions.values()) {
            if(!participant.getId().equals(session.getId())) {
                participant.sendMessage(new TextMessage(newNode.toString()));
            }
        }
        
        */
        ObjectNode newNode = mapper.createObjectNode();
        newNode.put("id", Integer.toString(arry));
        System.out.println(arry);
        session.sendMessage(new TextMessage(newNode.toString()));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //sessions.remove(session.getId()); //Se quita la sesión del hashmap
    }

    /*@Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
            
        System.out.println("Datos recibidos: " + message.getPayload());
        JsonNode node = mapper.readTree(message.getPayload());

        sendOtherParticipants(session, node);
    }

    private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

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
}
