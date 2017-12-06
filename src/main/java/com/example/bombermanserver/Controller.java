package com.example.bombermanserver;

import static com.example.bombermanserver.BomberserverApplication.numSesiones;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.ProcessBuilder.Redirect.Type;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class Controller {
    
        public static ArrayList<String> jugadores = new ArrayList<String>();
	
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
        
        @PostMapping("/actualizar")
	public String postWinner(@RequestBody String jug) throws FileNotFoundException, IOException {
            
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
            
            listaJugT.actualizar2(jug);
            
            String json = gson.toJson(listaJugT, Lista.class);
            
            //ESCRITURA EN EL ARCHIVO
            File myFile = new File("example2.json");
            myFile.createNewFile();
            FileOutputStream fOut = new FileOutputStream(myFile);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append(json);
            myOutWriter.close();
            fOut.close();
            
            return jug;
	}
	
        
        @PostMapping("/login/{id}")
	public String loginP(@PathVariable int id, @RequestBody String nombre) throws FileNotFoundException, IOException {
            
            ArrayList<String> arrAux = new ArrayList<String>();
            for(int i =0;i<numSesiones;i++){
                arrAux.add("");
            }
            arrAux.set(id,nombre);
            
            for(int i = 0; i < jugadores.size(); i++){
                if(!jugadores.get(i).equals("")){
                    arrAux.set(i,jugadores.get(i));
                }
            }
            
            jugadores.clear();
            for(int i = 0; i < arrAux.size(); i++){
                jugadores.add(arrAux.get(i));
            }
            //jugadores.add("");
            
            //jugadores.set(id, nombre);
            
            /*for(int i = 0; i < jugadores.size(); i++){
                System.out.println("Ejecutado loginP - " + jugadores.get(i));
            }*/
            
            
            return nombre;
	}
        
        @GetMapping("/login/{id}")
	public ResponseEntity<String> loginG(@PathVariable int id) throws FileNotFoundException, IOException {   
           
            if (jugadores.get(id) != null){
                return new ResponseEntity<>(jugadores.get(id), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
	}
        
        
}

