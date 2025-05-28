
package springapp.controller;

import springapp.dao.DispositivoRepository;
import springapp.model.Dispositivo;
import springapp.services.EscaneoRed;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Dispositivo> getAllDispositivos() {
    	
        return dispositivoRepository.findAll();
    }

    @PostMapping
    public Dispositivo createDispositivo(@RequestBody Dispositivo dispositivo) {
    	
    	
        return dispositivoRepository.save(dispositivo);
    }
    
    @GetMapping
    public List<Dispositivo> EscaneoWeb(){
    	
    	List<Dispositivo> dispositivos = new ArrayList<>();
    	dispositivos = escaneored.RedScann();
    	
    	for(Dispositivo d: dispositivos ) {
    		
    		createDispositivo(d);
    	}
    	
		return dispositivos;
    	
    }
    
}
