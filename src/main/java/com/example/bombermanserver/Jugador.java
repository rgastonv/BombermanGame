package com.example.bombermanserver;

public class Jugador {
	
	private int pun;
	private String nombre;
	
	public Jugador() {
	}
	
	public Jugador(String n, int p) {
		this.nombre = n;
		this.pun = p;
	}

	public String getNombre() {
		return nombre;
	}

	public int getPun() {
		return pun;
	}
	
	public void setPun() {
		this.pun = this.pun + 1;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
