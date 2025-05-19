
package springapp.controller;

import springapp.dao.DispositivoRepository;
import springapp.model.Dispositivo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dispositivos")
@CrossOrigin
public class DispositivoController {
    @Autowired
    private DispositivoRepository dispositivoRepository;

    @GetMapping
    public List<Dispositivo> getAllDispositivos() {
        return dispositivoRepository.findAll();
    }

    @PostMapping
    public Dispositivo createDispositivo(@RequestBody Dispositivo dispositivo) {
        return dispositivoRepository.save(dispositivo);
    }
}
