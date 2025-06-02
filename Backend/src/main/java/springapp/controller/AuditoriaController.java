
package springapp.controller;

import springapp.dao.AuditoriaRepository;
import springapp.model.Auditoria;
import springapp.model.Dispositivo;
import springapp.services.AuditoriaDispositivo;
import springapp.services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias")
@CrossOrigin
public class AuditoriaController {
    @Autowired
    private AuditoriaRepository auditoriaRepository;
    
    @Autowired
    private AuditoriaDispositivo auditoriaDispositivo;
    
    @Autowired
    private EmailService emailService;
    

    @GetMapping("/getAllAuditorias")
    public List<Auditoria> getAllAuditorias() {
        return auditoriaRepository.findAll();
    }

    @PostMapping("/crearAuditoria")
    public Auditoria createAuditoria(@RequestBody Dispositivo dispositivo) {
    	
    	Auditoria auditoria= auditoriaDispositivo.RealizarAuditoria(dispositivo);
    	//emailService
    	
        return auditoriaRepository.save(auditoria);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable String id) {
        if (auditoriaRepository.existsById(id)) {
            auditoriaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
