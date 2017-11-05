<?php  

	/* Inicia la sesión, función utilizada para mantener 
la sesión y variables de sesión para que no se pierdan 
sus valores al navegar a través de las páginas del sitio */
//session_start();
$server = "localhost"; 
$database = "grafo"; //nombre de la base de datos
$username = "root"; // nombre de usuario con el que se conecta a la base de datos
$password = ""; // contraseña

//Conexión
	$link = mysqli_connect($server, $username, $password, $database);

	/* verificar la conexión */
	if (mysqli_connect_errno()) {
	    printf("Conexión fallida: %s\n", mysqli_connect_error());
	    exit();
	}


date_default_timezone_set("America/Bogota");

?>