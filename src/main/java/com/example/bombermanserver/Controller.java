package com.example.bombermanserver;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	@GetMapping("/records")
	public ArrayList<Jugador> getRecords() throws FileNotFoundException, IOException {
            
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
            
            Lista listaJugT = gson.fromJson(aBuffer, Lista.class);
            
            ArrayList<Jugador> listaRecords = listaJugT.getTopRecords();
            
            return listaRecords;
	}
        
        @PostMapping("/holi")
	public String postWinner(@RequestBody String nombre) throws FileNotFoundException, IOException {
            
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
            
            Lista listaJugT = gson.fromJson(aBuffer, Lista.class);
            
            listaJugT.actualizar2(nombre);
            
            String json = gson.toJson(listaJugT, Lista.class);
            
            //ESCRITURA EN EL ARCHIVO
            File myFile = new File("example2.json");
            myFile.createNewFile();
            FileOutputStream fOut = new FileOutputStream(myFile);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append(json);
            myOutWriter.close();
            fOut.close();
            
            return nombre;
	}
	
}

