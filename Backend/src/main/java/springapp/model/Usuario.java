
package springapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String idusuario;
	private String password;
    private String email;
    
    
    
    
    //Constructor vacio
    public Usuario() {
		super();
	}
    
    
    //Constructor
	public Usuario(String idusuario, String password, String email) {
		super();
		this.idusuario = idusuario;
		this.password = password;
		this.email = email;
	}



	//Getters y Setters
    public String getIdusuario() {
		return idusuario;
	}
	public void setIdusuario(String idusuario) {
		this.idusuario = idusuario;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}



}
