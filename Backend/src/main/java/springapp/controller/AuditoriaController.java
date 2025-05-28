
package springapp.controller;

import springapp.dao.AuditoriaRepository;
import springapp.model.Auditoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias")
@CrossOrigin
public class AuditoriaController {
    @Autowired
    private AuditoriaRepository auditoriaRepository;

    @GetMapping
    public List<Auditoria> getAllAuditorias() {
        return auditoriaRepository.findAll();
    }

    @PostMapping
    public Auditoria createAuditoria(@RequestBody Auditoria auditoria) {
        return auditoriaRepository.save(auditoria);
    }
}
