
package springapp.controller;

import springapp.dao.UsuarioRepository;
import springapp.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("getAllUsuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/crearUsuario")
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        // Buscar si ya existe un usuario con el email proporcionado
        Usuario existente = usuarioRepository.findByEmail(usuario.getEmail());
        
        if (existente != null) {
            // Ya existe un usuario con ese email, devolver error 409 Conflict
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Ya existe un usuario con ese correo electrónico.");
        }
        
        // Si no existe, guardamos el nuevo usuario
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        Usuario encontrado = usuarioRepository.findByEmail(usuario.getEmail());

        if (encontrado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado.");
        }

        if (!encontrado.getPassword().equals(usuario.getPassword()) ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta.");
        }

        return ResponseEntity.ok("Autenticado con éxito.");
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable String id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
