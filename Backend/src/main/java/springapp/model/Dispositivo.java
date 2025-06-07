
package springapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dispositivos")
public class Dispositivo {
    @Id
    private String id;
	private String ip;
	private String mac;
    private String fabricante;
    
    
    
    // Constructor vacio
	public Dispositivo() {
		super();
	}

	//Constructor
	
	public Dispositivo(String ip, String mac, String fabricante) {
		super();
		this.ip = ip;
		this.mac = mac;
		this.fabricante = fabricante;
	}
	
    
    //Getters y Setters 
	
	   public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}
    
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getFabricante() {
		return fabricante;
	}

	public void setFabricante(String fabricante) {
		this.fabricante = fabricante;
	}



	



}
