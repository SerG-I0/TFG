package springapp.model;

import java.util.List;

public class Puerto {
	private String puerto="";
    private String servicio="";
    private String vulnerabilidades=""; 
    private String cifrados="";
    private String certificados="";
    
    
    
    
	public Puerto() {
		super();
	}
	public String getPuerto() {
		return puerto;
	}
	public void setPuerto(String puerto) {
		this.puerto = puerto;
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
		this.vulnerabilidades = this.vulnerabilidades + "\n" + vulnerabilidades;
	}
	public String getCifrados() {
		return cifrados;
	}
	public void setCifrados(String cifrados) {
		this.cifrados = cifrados ;
	}
	public String getCertificados() {
		return certificados;
	}
	public void setCertificados(String certificados) {
		this.certificados = certificados;
	}
    
    
    

}
