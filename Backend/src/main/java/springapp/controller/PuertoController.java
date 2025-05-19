
package springapp.controller;

import springapp.dao.PuertoRepository;
import springapp.model.Puerto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/puertos")
@CrossOrigin
public class PuertoController {
    @Autowired
    private PuertoRepository puertoRepository;

    @GetMapping
    public List<Puerto> getAllPuertos() {
        return puertoRepository.findAll();
    }

    @PostMapping
    public Puerto createPuerto(@RequestBody Puerto puerto) {
        return puertoRepository.save(puerto);
    }
}
