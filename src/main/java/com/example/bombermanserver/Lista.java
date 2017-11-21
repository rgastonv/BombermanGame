package com.example.bombermanserver;
import java.util.*;

public class Lista {
    
    private int longitud;
    private ArrayList<Jugador> contenido;
    
    public Lista() {
        longitud = 0;
        contenido = new ArrayList<Jugador>();
    }
    
    public void ordenar(){
        for(int i = 1; i < longitud; i++){
            if (contenido.get(i).getPun() > contenido.get(i-1).getPun()){
                Jugador aux = contenido.get(i);
                contenido.set(i, contenido.get(i-1));
                contenido.set(i-1, aux);
            }
        }
    }
    
    public void actualizar(Jugador nuevo){
        boolean aux = false;
        
        for(int i = 0; i < longitud && !aux; i++){
            if(contenido.get(i).getNombre().equals(nuevo.getNombre())){
                contenido.get(i).setPun();
                aux = true;
            }
        }
        if(!aux){
            contenido.add(nuevo);
            longitud++;
        }
        
        this.ordenar();
    }
    
    public ArrayList<Jugador> getTopRecords(){
        ArrayList<Jugador> aux = new ArrayList<Jugador>();
        
        for (int i = 0; i < 4; i++){
            aux.add(contenido.get(i));
        }
        
        return aux;
    }
}
