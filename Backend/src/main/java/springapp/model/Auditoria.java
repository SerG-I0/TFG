
package springapp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "auditorias")
public class Auditoria {
    @Id
    private String id;
	private Dispositivo dispositivo;
    private ArrayList<Puerto> puertos = new ArrayList<>();
    private LocalDateTime Fecha;


    
 


	//Constructor vacio
	public Auditoria() {
		super();
	}
	


	public Auditoria(Dispositivo dispositivo, ArrayList<Puerto> puertos) {
		super();
		this.dispositivo = dispositivo;
		this.puertos = puertos;

	}


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





	public ArrayList<Puerto> getPuertos() {
		return puertos;
	}





	public void setPuertos(ArrayList<Puerto> puertos) {
		this.puertos = puertos;
	}
	
   public LocalDateTime getFecha() {
		return Fecha;
	}



	public void setFecha(LocalDateTime fecha) {
		Fecha = fecha;
	}








}
	