package miprojecto;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import springapp.SpringReactMongoApplication;
import springapp.controller.DispositivoController;
import springapp.model.Dispositivo;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@SpringBootTest(classes = SpringReactMongoApplication.class)
public class DispositivoControllerTest {

    @Autowired
    private DispositivoController dispositivoController;

    @Test
    void testDeleteDispositivo() {
        // Crear y guardar un dispositivo para borrar
        Dispositivo dispositivo = new Dispositivo();
        Dispositivo dispositivoprueba = dispositivoController.createDispositivo(dispositivo);

        // Borrar el dispositivo
        var response = dispositivoController.deleteDispositivo(dispositivoprueba.getId());

        assertEquals(204, response.getStatusCode().value());

        // Comprobar que ya no exista
        List<Dispositivo> dispositivos = dispositivoController.getAllDispositivos();
        assertFalse(dispositivos.stream().anyMatch(d -> d.getId().equals(dispositivoprueba.getId())));
    }
    
    
    @Test
    void testCreateAndGetAllDispositivos() {
        // Crear un dispositivo de prueba
        Dispositivo dispositivo = new Dispositivo();
        // Aquí asigna valores a dispositivo, por ejemplo:
        //dispositivo.setNombre("Mi dispositivo");
        
        // Guardarlo usando el controlador
        Dispositivo dispositivoprueba = dispositivoController.createDispositivo(dispositivo);

        assertNotNull(dispositivoprueba);
        assertNotNull(dispositivoprueba.getId());

        // Traer todos los dispositivos y verificar que esté el que acabas de crear
        List<Dispositivo> dispositivos = dispositivoController.getAllDispositivos();
        assertTrue(dispositivos.stream().anyMatch(d -> d.getId().equals(dispositivoprueba.getId())));
        
        //Borramos para no alterar el estado de la BBDD
        dispositivoController.deleteDispositivo(dispositivoprueba.getId());
    }


}
