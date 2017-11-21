package com.example.bombermanserver;

import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BomberserverApplication {

	public static void main(String[] args) {
		
		SpringApplication app = new SpringApplication(BomberserverApplication.class);
		Properties properties = new Properties();
		properties.setProperty("spring.resources.staticLocations", "classpath:/static/");

		app.setDefaultProperties(properties);
		app.run(args);
		
		//Puntuacion p1 = new Puntuacion("Helena",0);
		
		SpringApplication.run(BomberserverApplication.class, args);
	}
}
