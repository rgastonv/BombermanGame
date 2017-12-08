package com.example.bombermanserver;

public class JugadorGame {
   
    private float [] posXY;
    private int nBombas;    
    private int rng;
    private int vel;
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public int getnBombas() {
        return nBombas;
    }

    public float[] getPosXY() {
        return posXY;
    }

    public int getRng() {
        return rng;
    }

    public int getVel() {
        return vel;
    }

    public void setnBombas(int nBombas) {
        this.nBombas = nBombas;
    }

    public void setPosXY(float[] posXY) {
        this.posXY = posXY;
    }

    public void setRng(int rng) {
        this.rng = rng;
    }

    public void setVel(int vel) {
        this.vel = vel;
    }
    
    
    
    
    
}
