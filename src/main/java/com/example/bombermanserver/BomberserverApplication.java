package com.example.bombermanserver;

import java.util.Properties;
import java.io.IOException;
import java.util.Random;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class BomberserverApplication implements WebSocketConfigurer {
       
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(dataHandler(),"/data").setAllowedOrigins("*");
    }
    
    @Bean
    public WebSocketDataHandler dataHandler(){
        return new WebSocketDataHandler();
    }
  
    public static int[][] mapa = new int[22][17];
    public static int[][] mapaBonificadores = new int[22][17];
    public static int numSesiones;
    
    
    public static void main(String[] args) throws IOException {
        
        for(int i=0; i < mapa.length; i++){
            for(int j=0; j < mapa[0].length; j++){
                if(Math.random() < 0.75){
                    mapa[i][j] = 1;
                }else{
                    mapa[i][j] = 0;
                }
            }
        }
        
        for(int i=0; i < mapaBonificadores.length; i++){
            for(int j=0; j < mapaBonificadores[0].length; j++){
                if(mapa[i][j] == 1 && Math.random() < 0.5){
                    Random r = new Random();
                    int rnd = (r.nextInt(6) + 1) * (-1);
                    mapaBonificadores[i][j] = rnd;
                }else{
                    mapaBonificadores[i][j] = 0;
                }
            }
        }
        
        
        SpringApplication app = new SpringApplication(BomberserverApplication.class);
        Properties properties = new Properties();
        properties.setProperty("spring.resources.staticLocations", "classpath:/static/");

        app.setDefaultProperties(properties);
        app.run(args);

        SpringApplication.run(BomberserverApplication.class, args);
    }

}
