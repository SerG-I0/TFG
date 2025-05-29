
package springapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "auditorias")
public class Auditoria {
    @Id
    private String id;
    private Dispositivo dispositivo;
    private String servicio;
    private String vulnerabilidades; 
    private String cifrados;
    private String certificados;
    
    
    //Constructor vacio
	public Auditoria() {
		super();
	}

	
	//Constructor
	public Auditoria(String id, Dispositivo dispositivo, String servicio, String vulnerabilidades, String cifrados, String certificados) {
		super();
		this.id = id;
		this.dispositivo= dispositivo;
		this.servicio = servicio;
		this.vulnerabilidades = vulnerabilidades;
		this.cifrados = cifrados;
		this.certificados = certificados;
	}

	
    // Getters y Setters
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	

	public Dispositivo getDispositivo() {
		return dispositivo;
	}


	public void setDispositivo(Dispositivo dispositivo) {
		this.dispositivo = dispositivo;
	}


	public String getServicio() {
		return servicio;
	}

	public void setServicio(String servicio) {
		this.servicio = servicio;
	}

	public String getVulnerabilidades() {
		return vulnerabilidades;
	}

	public void setVulnerabilidades(String vulnerabilidades) {
		this.vulnerabilidades = vulnerabilidades;
	}

	public String getCifrados() {
		return cifrados;
	}

	public void setCifrados(String cifrados) {
		this.cifrados = cifrados;
	}

	public String getCertificados() {
		return certificados;
	}

	public void setCertificados(String certificados) {
		this.certificados = certificados;
	}


    
    
    
    
}
