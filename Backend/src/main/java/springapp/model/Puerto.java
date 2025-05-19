
package springapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "puertos")
public class Puerto {
    @Id
    private String id;
    private String servicio;
    private String vulnerabilidades; 
    private String cifrados;
    private String certificados;
    
    
    //Constructor vacio
	public Puerto() {
		super();
	}

	
	//Constructor
	public Puerto(String id, String servicio, String vulnerabilidades, String cifrados, String certificados) {
		super();
		this.id = id;
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
