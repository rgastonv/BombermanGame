package com.example.bombermanserver;

import java.util.Properties;
import java.io.IOException;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BomberserverApplication {
    

    public static void main(String[] args) throws IOException {
              
        SpringApplication app = new SpringApplication(BomberserverApplication.class);
        Properties properties = new Properties();
        properties.setProperty("spring.resources.staticLocations", "classpath:/static/");

        app.setDefaultProperties(properties);
        app.run(args);

        SpringApplication.run(BomberserverApplication.class, args);
    }
}
