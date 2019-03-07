
import java.io.*;
import java.net.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class YeeLight {


	public static void main(String args[]) throws Exception{
		
		YeeLight yeeLight = new YeeLight();

		String ipAddress = yeeLight.getIP();

		System.out.println("IP Address is : " + ipAddress);

		yeeLight.runLightCommands(ipAddress);

	}


	// get ip address of the light over a UDP connection
	public String getIP() throws Exception {

		System.out.println("Search for a device ...");

		String httpRequest = "M-SEARCH * HTTP/1.1\r\n" + "HOST: 239.255.255.250:1982\r\n" + "MAN: \"ssdp:discover\"\r\n" + "ST: wifi_bulb\r\n";

		String returnIP = "";

		// Create a Socket 
		DatagramSocket socket = new DatagramSocket();

		InetAddress ipAddress = InetAddress.getByName("239.255.255.250");

		byte[] httpResponse = new byte[1024];

		// Create a packet for the HTTP request ... to send a request
		DatagramPacket requestPacket = new DatagramPacket(httpRequest.getBytes(), httpRequest.getBytes().length, ipAddress, 1982);
		// Send HTTP request to the socket connection
		socket.send(requestPacket);

		// Create a packet for the HTTP response ... to receive a response
		DatagramPacket responsePacket = new DatagramPacket(httpResponse, httpResponse.length);
		// Receive HTTP response from the socket connection
		socket.receive(responsePacket);


		// Convert HTTP response from byte to a String
		byte [] responseByte = responsePacket.getData();
		String responseString = new String(responseByte);

		socket.close();


		// Get IP address from the HTTP response
		String regex = "Location: yeelight://(.*?):55443";

		Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
		Matcher matcher = pattern.matcher(responseString);


		while (matcher.find()) {
			returnIP = matcher.group(1);
		}

		// System.out.println("IP Address is : " + returnIP);

		return returnIP;

	}


	// run commands to manipulate the light over tcp connection
	public void runLightCommands(String ipAddress) throws Exception {

		// Convert string ver ip to inet address
		InetAddress inetAddress = InetAddress.getByName(ipAddress);

		Socket socket = new Socket(inetAddress, 55443);


		// Output the data 
		DataOutputStream outputStream = new DataOutputStream(socket.getOutputStream());


		outputStream.writeBytes("{\"id\":1,\"method\":\"toggle\",\"params\":[]}\r\n");

		socket.close();

	}





}




