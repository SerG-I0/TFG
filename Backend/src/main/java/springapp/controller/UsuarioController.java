
package springapp.controller;

import springapp.dao.UsuarioRepository;
import springapp.model.Usuario;
import springapp.security.JWUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("getAllUsuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/crearUsuario")
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        Usuario existente = usuarioRepository.findByEmail(usuario.getEmail()); 
        if (existente != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Ya existe un usuario con ese correo electrónico.");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario encontrado = usuarioRepository.findByEmail(usuario.getEmail());

        if (encontrado == null || !passwordEncoder.matches(usuario.getPassword(), encontrado.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas.");
        }

        String token = JWUtil.generateToken(encontrado.getEmail());

        return ResponseEntity.ok().body(token);
    }


    
    @DeleteMapping("/{email:.+}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable String email) {
        if (usuarioRepository.existsByEmail(email)) {
            usuarioRepository.deleteByEmail(email);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }



}
