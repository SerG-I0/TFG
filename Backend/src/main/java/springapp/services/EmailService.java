package springapp.services;

import java.util.Properties;

import org.springframework.stereotype.Service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import springapp.model.Auditoria;
import springapp.model.Puerto;

@Service
public class EmailService {
	
	public void EnviarAuditoria(Auditoria auditoria, String emaildestino) {
		

	    String correoorigen = "smtptfgsergio@gmail.com";
	    String password = "vmze rmxu vtcr roje";
	    String mensaje= GenerarTexto(auditoria);

	    Properties props = System.getProperties();
	    props.put("mail.smtp.host", "smtp.gmail.com");  //El servidor SMTP de Google
	    props.put("mail.smtp.user", correoorigen);
	    props.put("mail.smtp.clave", password);    //La clave de la cuenta
	    props.put("mail.smtp.auth", "true");    //Usar autenticación mediante usuario y clave
	    props.put("mail.smtp.starttls.enable", "true"); //Para conectar de manera segura al servidor SMTP
	    props.put("mail.smtp.port", "587"); //El puerto SMTP seguro de Google

	    Session session = Session.getDefaultInstance(props);
	    MimeMessage message = new MimeMessage(session);

	    try {
	        message.setFrom(new InternetAddress(correoorigen));
	        message.addRecipient(Message.RecipientType.TO, new InternetAddress(emaildestino));   //Se podrían añadir varios de la misma manera
	        message.setSubject("Auditoria Dispositivo");
	        message.setText(mensaje);
	        Transport transport = session.getTransport("smtp");
	        transport.connect("smtp.gmail.com", correoorigen, password);
	        transport.sendMessage(message, message.getAllRecipients());
	        transport.close();
	    }
	    catch (MessagingException exception) {
	        exception.printStackTrace();
	    }
	  }

	
	public String GenerarTexto(Auditoria auditoria) {
		
		StringBuilder bloquemensaje = new StringBuilder();
		    bloquemensaje.append("Auditoría realizada en: ").append(auditoria.getFecha()).append("\n");
		    bloquemensaje.append("Dispositivo:\n");
		    bloquemensaje.append(" - IP: ").append(auditoria.getDispositivo().getIp()).append("\n");
		    bloquemensaje.append(" - MAC: ").append(auditoria.getDispositivo().getMac()).append("\n");
		    bloquemensaje.append(" - Fabricante: ").append(auditoria.getDispositivo().getFabricante()).append("\n\n");

		    bloquemensaje.append("Puertos encontrados:\n");
		    for (Puerto p : auditoria.getPuertos()) {
		        bloquemensaje.append(" > Puerto: ").append(p.getPuerto()).append("\n");
		        bloquemensaje.append("   Servicio: ").append(p.getServicio()).append("\n");
		        bloquemensaje.append("   Vulnerabilidades: ").append(p.getVulnerabilidades()).append("\n");
		        bloquemensaje.append("   Cifrados: ").append(p.getCifrados()).append("\n");
		        bloquemensaje.append("   Certificados: ").append(p.getCertificados()).append("\n\n");
		        bloquemensaje.append("   SshKeys: ").append(p.getSshkeys()).append("\n\n");
		
	}
		 return bloquemensaje.toString();
	}
}
