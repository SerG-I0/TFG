
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
    private ArrayList<Auditoria> puertos = new ArrayList<>();
    
    
    
    // Constructor vacio
	public Dispositivo() {
		super();
	}

	
	
	public Dispositivo(String ip, String mac, String fabricante) {
		super();
		this.ip = ip;
		this.mac = mac;
		this.fabricante = fabricante;
	}
	
	
	// Constructor
	public Dispositivo(String ip, String mac, String fabricante, ArrayList<Auditoria> puertos) {
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

	public ArrayList<Auditoria> getPuertos() {
		return puertos;
	}

	public void setPuertos(ArrayList<Auditoria> puertos) {
		this.puertos = puertos;
	}

	



}
