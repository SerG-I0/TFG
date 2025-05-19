
package springapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;

@Document(collection = "dispositivos")
public class Dispositivo {
    @Id
    private String ip;
	private String mac;
    private String fabricante;
    private ArrayList<Puerto> puertos = new ArrayList<>();
    
    
    
    // Constructor vacio
	public Dispositivo() {
		super();
	}

	
	// Constructor
	public Dispositivo(String ip, String mac, String fabricante, ArrayList<Puerto> puertos) {
		super();
		this.ip = ip;
		this.mac = mac;
		this.fabricante = fabricante;
		this.puertos = puertos;
	}

	
	
    
    //Getters y Setters 
    
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

	public ArrayList<Puerto> getPuertos() {
		return puertos;
	}

	public void setPuertos(ArrayList<Puerto> puertos) {
		this.puertos = puertos;
	}

	



}
