<?php

if (!empty($_GET['estado'])) {

    $valor = $_POST['valor'];
    $inicial = $_POST['inicial'];
    $final = $_POST['final'];
    echo json_encode(GuardarEstado($valor, $inicial, $final));
}
if (!empty($_GET['truncar'])) {

    TruncarTablas();
    echo json_encode(1);
}
if (!empty($_GET['trancision'])) {

    $valor = $_POST['valor'];
    $inicial = $_POST['inicial'];
    $final = $_POST['final'];
    echo json_encode(GuardarTrancision($valor, $inicial, $final));
}
if (!empty($_GET['cadena'])) {
    $cadena = $_POST['cadena'];
    echo json_encode(GuardarCadena($cadena));
}
if (!empty($_GET['Listarcadenas'])) {

    echo json_encode(TraerCadenas());
}
function GuardarEstado($valor, $inicial, $final) {
    require_once './config.php';
    $query = "INSERT INTO `estados`(`valor`, `inicial`, `final`) VALUES ('$valor','$inicial','$final')";
    mysqli_query($link, $query);
    return 1;
}

function GuardarTrancision($valor, $inicial, $final) {
    require_once './config.php';
    $query = "INSERT INTO `transiciones`(`inicial`, `final`, `valor`) VALUES ('$inicial','$final','$valor')";
    mysqli_query($link, $query);
    return 1;
}

function GuardarCadena($cadena) {
    require_once './config.php';
    $query = "INSERT INTO `cadenas`(`cadena`) VALUES ('$cadena')";
    mysqli_query($link, $query);
    return 1;
}

function TraerCadenas() {
    require_once './config.php';
    $cadenas = array();
    $query = "SELECT * FROM `cadenas` WHERE 1";
    $resultado = mysqli_query($link, $query);
    while ($row = mysqli_fetch_array($resultado)) {
 
        array_push($cadenas, $row);
    }
    return $cadenas;
}

function TruncarTablas() {
    require_once './config.php';
    $query = "TRUNCATE TABLE `cadenas`";
    mysqli_query($link, $query);
    $query = "TRUNCATE TABLE `transiciones`";
    mysqli_query($link, $query);
    $query = "TRUNCATE TABLE `estados`";
    mysqli_query($link, $query);
    return 1;
}

?>
