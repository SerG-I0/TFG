
package springapp.controller;

import springapp.dao.DispositivoRepository;
import springapp.model.Dispositivo;
import springapp.services.EscaneoRed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/dispositivos")
@CrossOrigin

public class DispositivoController {
    @Autowired
    private DispositivoRepository dispositivoRepository;
    
    @Autowired
    private EscaneoRed escaneored;

    @GetMapping("/getAllDispositivos")
    public List<Dispositivo> getAllDispositivos() {
    	
        return dispositivoRepository.findAll();
    }

    @PostMapping()
    public Dispositivo createDispositivo(@RequestBody Dispositivo dispositivo) {
    	
    	
        return dispositivoRepository.save(dispositivo);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDispositivo(@PathVariable String id) {
        if (dispositivoRepository.existsById(id)) {
            dispositivoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/escanear")
    public List<Dispositivo> EscaneoWeb(){
    	
    	//dispositivoRepository.deleteAll();
    	List<Dispositivo> dispositivos = new ArrayList<>();
    	dispositivos = escaneored.RedScann();
    	
    	for(Dispositivo d: dispositivos ) {
    		
    		createDispositivo(d);
    	}
    	
		return dispositivos;
    	
    }
    
}
