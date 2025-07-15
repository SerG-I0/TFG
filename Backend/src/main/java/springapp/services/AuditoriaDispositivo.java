package springapp.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.io.IOException;
import java.util.*;

import org.springframework.stereotype.Service;

import springapp.model.Auditoria;
import springapp.model.Dispositivo;
import springapp.model.Puerto;

@Service
public class AuditoriaDispositivo {

    private static String cleanText(String text) {
        if (text == null) return "";
        text = text.replaceAll("[|_]", "");               // Elimina | y _
        text = text.replaceAll("^\\[", "").replaceAll("\\]$", ""); // Quita corchetes
        text = text.replaceAll("\\s{2,}", " ");           // Reemplaza múltiples espacios
        return text.trim();
    }

    public Auditoria RealizarAuditoria(Dispositivo dispositivo) {

        String targetIp = dispositivo.getIp();
        String command = "nmap -p 1-65535 -O --open --script vuln,default,ssl-cert,ssl-enum-ciphers " + targetIp;

        Auditoria auditoria = new Auditoria();
        ArrayList<Puerto> puertos = new ArrayList<>();
        Puerto puerto = null;

        try {
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();

                // Detectar puertos abiertos
                if (line.matches("^\\d+/tcp\\s+open\\s+.*")) {
                    if (puerto != null) {
                        puertos.add(puerto); // Guarda el puerto anterior
                    }
                    puerto = new Puerto(); // Nuevo puerto
                    String[] parts = line.split("\\s+");
                    puerto.setPuerto(parts[0]);
                    puerto.setServicio(parts[2]);
                    continue;
                }

                // Vulnerabilidades
                if (puerto != null &&
                        (line.contains("VULNERABLE:") || line.contains("Found the following possible"))) {
                    StringBuilder vulnBlock = new StringBuilder(line).append("\n");
                    String peekLine;
                    while ((peekLine = reader.readLine()) != null) {
                        peekLine = peekLine.trim();
                        vulnBlock.append(peekLine).append("\n");
                        if (peekLine.startsWith("|_")) break;
                    }
                    puerto.setVulnerabilidades(cleanText(vulnBlock.toString()));
                    continue;
                }

                // Cifrados SSL
                if (puerto != null && line.contains("ssl-enum-ciphers:")) {
                    StringBuilder ciphersBlock = new StringBuilder(line).append("\n");
                    String peekLine;
                    while ((peekLine = reader.readLine()) != null) {
                        peekLine = peekLine.trim();
                        ciphersBlock.append(peekLine).append("\n");
                        if (peekLine.startsWith("|_")) break;
                    }
                    puerto.setCifrados(cleanText(ciphersBlock.toString()));
                    continue;
                }

                // Certificados SSL
                if (puerto != null && line.contains("ssl-cert:")) {
                    StringBuilder certsBlock = new StringBuilder(line).append("\n");
                    String peekLine;
                    while ((peekLine = reader.readLine()) != null) {
                        peekLine = peekLine.trim();
                        certsBlock.append(peekLine).append("\n");
                        if (peekLine.startsWith("|_")) break;
                    }
                    puerto.setCertificados(cleanText(certsBlock.toString()));
                    continue;
                }
                
                // Keys Ssh
                if (puerto != null && line.contains("ssh-hostkey:")) {
                    StringBuilder sshBlock = new StringBuilder(line).append("\n");
                    String peekLine;
                    while ((peekLine = reader.readLine()) != null) {
                        peekLine = peekLine.trim();
                        sshBlock.append(peekLine).append("\n");
                        if (peekLine.startsWith("|_")) break;
                    }
                    puerto.setSshkeys(cleanText(sshBlock.toString()));
                    continue;
                }
            }

            // Añadir el último puerto
            if (puerto != null) {
                puertos.add(puerto);
            }

            auditoria.setDispositivo(dispositivo);
            auditoria.setPuertos(puertos);
            auditoria.setFecha(LocalDateTime.now());

            process.waitFor();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return auditoria;
    }
}
