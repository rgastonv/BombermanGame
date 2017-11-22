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
            for( int j=0; j<longitud-1;j++){
                if (contenido.get(j).getPun() < contenido.get(j+1).getPun()){
                    Jugador aux = contenido.get(j);
                    contenido.set(j, contenido.get(j+1));
                    contenido.set(j+1, aux);
                }
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
    
    public Jugador getRecord(int a){
        
        
        Jugador aux  = new Jugador();
        aux = contenido.get(a);
                
        return aux;
    }
    public ArrayList<Jugador> getTopRecords(){
        ArrayList<Jugador> aux = new ArrayList<Jugador>();
       
        for (int i = 0; i < 4; i++){
            aux.add(contenido.get(i));
        }
       
        return aux;
    }
    
    public ArrayList<Jugador> getAll(){
        
        return contenido;
    }

   public void actualizar2 (String nuevo){
        boolean aux = false;
        
        for(int i = 0; i < longitud && !aux; i++){
            if(contenido.get(i).getNombre().equals(nuevo)){
                contenido.get(i).setPun();
                aux = true;
            }
        }
        if(!aux){
            Jugador nJ = new Jugador(nuevo, 1);
            contenido.add(nJ);
            longitud++;
        }
        
        this.ordenar();
    }
}
