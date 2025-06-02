package springapp.model;

public class Puerto {
	private String puerto="";
    private String servicio="";
    private String vulnerabilidades=""; 
    private String cifrados="";
    private String certificados="";
    private String sshkeys="";
    
    
    
    
	public Puerto() {
		super();
	}
	public String getPuerto() {
		return puerto;
	}
	public void setPuerto(String puerto) {
		this.puerto = puerto;
	}
	public String getSshkeys() {
		return sshkeys;
	}
	public void setSshkeys(String sshkeys) {
		this.sshkeys = sshkeys;
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
