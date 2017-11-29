package com.example.bombermanserver;

import java.util.Properties;
import java.io.IOException;

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
        registry.addHandler(idsHandler(),"/ids").setAllowedOrigins("*");
    }
    
    @Bean
    public WebSocketDataHandler dataHandler(){
        return new WebSocketDataHandler();
    }
    @Bean
    public WebSocketIdsHandler idsHandler(){
        return new WebSocketIdsHandler();
    }
    
  
    public static void main(String[] args) throws IOException {
              
        SpringApplication app = new SpringApplication(BomberserverApplication.class);
        Properties properties = new Properties();
        properties.setProperty("spring.resources.staticLocations", "classpath:/static/");

        app.setDefaultProperties(properties);
        app.run(args);

        SpringApplication.run(BomberserverApplication.class, args);
    }

}
