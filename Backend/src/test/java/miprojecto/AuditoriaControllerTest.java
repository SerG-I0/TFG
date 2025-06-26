package miprojecto;


import springapp.SpringReactMongoApplication;
import springapp.controller.AuditoriaController;
import springapp.dao.AuditoriaRepository;
import springapp.model.Auditoria;
import springapp.model.Dispositivo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = SpringReactMongoApplication.class)
public class AuditoriaControllerTest {

    @Autowired
    private AuditoriaController auditoriaController;

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    private Dispositivo dispositivoPrueba;

    @BeforeEach
    public void setup() {

    	//Creamos un dispositivo para realizar las pruebas
        dispositivoPrueba = new Dispositivo();
        dispositivoPrueba.setIp("192.168.1.1");
        dispositivoPrueba.setMac("AA:BB:CC:DD:EE:FF");
        dispositivoPrueba.setFabricante("Test");
    }

    @Test
    public void testCreateAuditoriaAndGetAllAuditorias() {
    	//Creamos una auditoria de prueba para realizar el test
    	  String emailUsuario = "test@example.com"; // email simulado para el test

        Auditoria auditoriaTest = auditoriaController.createAuditoria(dispositivoPrueba,emailUsuario);

        //Comprobamos que existe la auditoria y que esta concide con la creada
        assertNotNull(auditoriaTest);
        assertNotNull(auditoriaTest.getId());
        
        //Traemos todas las auditorias y comprobamos que este el id del que acabamos de crear
        List<Auditoria> auditorias = auditoriaController.getAllAuditorias();

        assertFalse(auditorias.isEmpty());
        
        assertTrue(auditorias.stream().anyMatch(a -> a.getId().equals(auditoriaTest.getId())));
        
        //borramos para no alterar el estado de la BBDD
        auditoriaController.deleteAuditoria(auditoriaTest.getId());
    }

    @Test
    public void testDeleteAuditoria() {
    	
    	 String emailUsuario = "test@example.com"; // email simulado para el test
    	//Creamos una auditoria de prueba para insertarla
    	
        Auditoria auditoriaTest = auditoriaController.createAuditoria(dispositivoPrueba,emailUsuario);
        
       //Borramos la auditoria y recogemos la respuesta
        var response = auditoriaController.deleteAuditoria(auditoriaTest.getId());
        
        //Comprobamos que se ha borrado y que ya no existe en la BBDD
        assertEquals(204, response.getStatusCode().value());
        assertFalse(auditoriaRepository.existsById(auditoriaTest.getId()));
    }

    @Test
    public void testDeleteAuditoriaNotFound() {
        String idInexistente = "idpruebanoexiste";

        //Intentamos borrar una auditoria buscando con id que no existe en la BBDD
        var response = auditoriaController.deleteAuditoria(idInexistente);

        //Comprobamos que la respuesta es que no existia
        assertEquals(404, response.getStatusCode().value());
    }
}
