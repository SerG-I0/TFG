
package springapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;
	private String password;
    private String email;
    
    
    
    
    //Constructor vacio
    public Usuario() {
		super();
	}
    
    //Constructor
  	public Usuario(String email, String password) {
  		super();
  		this.password = password;
  		this.email = email;
  	}
    
    //Constructor
	public Usuario(String id, String password, String email) {
		super();
		this.id = id;
		this.password = password;
		this.email = email;
	}



	//Getters y Setters
    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
