<?php
$host = "localhost";
$user = "root";
$pass = ""; 
$bd = "bd_fiestita"; 

$conexion = new mysqli($host, $user, $pass, $bd);

if ($conexion->connect_error) {
    die("Error: " . $conexion->connect_error);
}
$conexion->set_charset("utf8mb4"); 
?>
