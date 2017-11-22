package com.example.bombermanserver;

import ch.qos.logback.core.CoreConstants;
import java.io.FileWriter;
import com.google.gson.stream.JsonWriter;
import java.io.*;
import java.util.Properties;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BomberserverApplication {
    

    public static void main(String[] args) throws IOException {
        
    /*
        Gson gson = new Gson();
        

        
        //LECTURA DEL ARCHIVO        
        File myFile2 = new File("example2.json");
        FileInputStream fIn = new FileInputStream(myFile2);
        BufferedReader myReader = new BufferedReader(new InputStreamReader(fIn));
        String aDataRow = "";
        String aBuffer = ""; //Holds the text
        while ((aDataRow = myReader.readLine()) != null) 
        {
            aBuffer += aDataRow ;
        }
        myReader.close();        
        //System.out.println(aBuffer);
        
        
        //Lectura del Json
        Lista listaJugT = gson.fromJson(aBuffer, Lista.class);        
        listaJugT.actualizar2("pepe");
        listaJugT.actualizar2("pepe2");
        listaJugT.actualizar2("pepe2");
        listaJugT.actualizar2("HelenaConH");
        listaJugT.actualizar2("RaquelHaProgramar");
        
        
        //Guardado del Json
        Gson gson2 = new Gson();           
        String json = gson2.toJson(listaJugT, Lista.class);
        System.out.println(json);
        FileOutputStream outputStream;
        //ESCRITURA EN EL ARCHIVO
        File myFile = new File("example2.json");
        myFile.createNewFile();
        FileOutputStream fOut = new FileOutputStream(myFile);
        OutputStreamWriter myOutWriter =new OutputStreamWriter(fOut);
        myOutWriter.append(json);
        myOutWriter.close();
        fOut.close();
        
        
        System.out.println(listaJugT.getRecord(0).getNombre()+ "HHHHHHHHHHHHH");
        
        */
        
        SpringApplication app = new SpringApplication(BomberserverApplication.class);
        Properties properties = new Properties();
        properties.setProperty("spring.resources.staticLocations", "classpath:/static/");

        app.setDefaultProperties(properties);
        app.run(args);

        SpringApplication.run(BomberserverApplication.class, args);
    }
}
