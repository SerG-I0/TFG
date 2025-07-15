package miprojecto;

import springapp.SpringReactMongoApplication;
import springapp.controller.UsuarioController;
import springapp.model.Usuario;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = SpringReactMongoApplication.class)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UsuarioControllerTest {

    @Autowired
    private UsuarioController usuarioController;
    


    private static final String TEST_EMAIL = "prueba@ejemplo.com";
    private static final String TEST_PASSWORD = "prueba123";
    
    private static final Usuario usuario = new Usuario( TEST_EMAIL, TEST_PASSWORD);


    @Test
    @Order(1)
    void testCrearUsuario() {

        ResponseEntity<?> response = usuarioController.createUsuario(usuario);
        assertEquals(201, response.getStatusCode().value());

        Usuario creado = (Usuario) response.getBody();
        assertNotNull(creado);
        assertEquals(TEST_EMAIL, creado.getEmail());
        assertNotEquals(TEST_PASSWORD, creado.getPassword()); // Password debe estar cifrada

    }

    @Test
    @Order(2)
    void testCrearUsuarioDuplicado() {
        Usuario duplicado = new Usuario();
        duplicado.setEmail(TEST_EMAIL);
        duplicado.setPassword("prueba321");

        ResponseEntity<?> response = usuarioController.createUsuario(duplicado);
        assertEquals(409, response.getStatusCode().value());
        assertTrue(response.getBody().toString().contains("Ya existe"));
    }

    @Test
    @Order(3)
    void testLoginCorrecto() {
        Usuario usuario = new Usuario();
        usuario.setEmail(TEST_EMAIL);
        usuario.setPassword(TEST_PASSWORD);

        ResponseEntity<?> response = usuarioController.login(usuario);
        assertEquals(200, response.getStatusCode().value());

        Object body = response.getBody();
        assertNotNull(body);
        assertTrue(body instanceof String);

        String token = (String) body;
        assertFalse(token.isEmpty());

        String[] partes = token.split("\\.");
        assertEquals(3, partes.length);
    }


    @Test
    @Order(4)
    void testLoginIncorrecto() {
        Usuario usuario = new Usuario();
        usuario.setEmail(TEST_EMAIL);
        usuario.setPassword("passwordIncorrecta");

        ResponseEntity<?> response = usuarioController.login(usuario);
        assertEquals(401, response.getStatusCode().value());
        assertEquals("Credenciales inválidas.", response.getBody());
    }


    @Test
    @Order(5)
    void testGetAllUsuarios() {
        List<Usuario> usuarios = usuarioController.getAllUsuarios();
        assertFalse(usuarios.isEmpty());
    }

    @Test
    @Order(6)
    void testEliminarUsuarioExistente() {

        ResponseEntity<Void> response = usuarioController.deleteUsuario(usuario.getEmail());
        assertEquals(204, response.getStatusCode().value());
    }

    @Test
    @Order(7)
    void testEliminarUsuarioInexistente() {
        ResponseEntity<Void> response = usuarioController.deleteUsuario("emailinexistente");
        assertEquals(404, response.getStatusCode().value());
    }
}
