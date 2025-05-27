package springapp.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import springapp.model.Dispositivo;

public class EscaneoRed {
	 public List<Dispositivo> RedScann(){
	        String command = "nmap -sP 192.168.1.0/24";
	        List<Dispositivo> dispositivos = new ArrayList<>();

	        try {
	            Process process = Runtime.getRuntime().exec(command);
	            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	            String line;
	            String currentIp = null;

	            while ((line = reader.readLine()) != null) {
	                line = line.trim();
	                System.out.println(line); // Depuración opcional

	                // Detectar IP
	                if (line.startsWith("Nmap scan report for")) {
	                    currentIp = line.substring(line.lastIndexOf(" ") + 1);
	                }

	                // Detectar dirección MAC y fabricante
	                else if (line.startsWith("MAC Address:") && currentIp != null) {
	                    Pattern patternMac = Pattern.compile("MAC Address: ([\\w:]+) \\(([^)]+)\\)");
	                    Matcher matcherMac = patternMac.matcher(line);
	                    if (matcherMac.find()) {
	                        String mac = matcherMac.group(1);
	                        String fabricante = matcherMac.group(2);
	                        if (fabricante.equalsIgnoreCase("unknown")) {
	                            fabricante = "Desconocido";
	                        }
	                        dispositivos.add(new Dispositivo(currentIp, mac, fabricante));
	                        currentIp = null; // Reset IP después de asignar
	                    }
	                }
	            }

	            process.waitFor();

	            // Mostrar resultados
	            System.out.println("\n=== Dispositivos detectados ===\n");
	            for (Dispositivo d : dispositivos) {
	                System.out.println(d);
	            }

	        } catch (IOException | InterruptedException e) {
	            e.printStackTrace();
	        }
	        return dispositivos;
	    }

}
