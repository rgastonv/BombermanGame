package com.example.bombermanserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	@GetMapping("/records")
	public Jugador getRecords() {
		return new Jugador("Andrés", 8);
	}
	
}

