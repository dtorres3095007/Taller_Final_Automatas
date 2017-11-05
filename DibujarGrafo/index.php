<!DOCTYPE html>
<?php
require_once './datos.php';
TruncarTablas();
?> 
<html style="width: 100%;height: 100%">
    <head >

        <script type="text/javascript" src="vis-4.21.0/dist/vis.js"></script>
        <link href="vis-4.21.0/dist/vis.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        . <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link rel="stylesheet" href="css/buttons.bootstrap.min.css">

        <link rel="stylesheet" href="css/font-awesome.min.css">

        <style type="text/css">
            .principal{
                height: 90%;
            }
            body{
                overflow:hidden; 
            }
            .capa{
                margin: 0 auto;

            }
            label{
                color: #00a0f2;
            }
            .error,.bien{
                display: none;
                font-family: sans-serif;
                size: 30px;
                text-align: center;
                font-weight: bold;
            }


        </style>
    </head>
    <body style="width: 100%;height: 100%">
        <br>
        <div class="col-md-4 principal">


            <div class="error alert alert-danger"></div>
            <div class="bien alert alert-success"></div>

            <div class="panel panel-primary">
                <div class="panel-heading">Datos del Grafo</div>
                <div class="panel-body">

                    <div class="col-md-12">
                        <label>Ingrese Estado</label>
                        <input type="text" class="form-control" placeholder="Nodo" id="txtnodo"> 
                        <br>
                        <button id="guardar_nodo" class="btn btn-primary">Crear Estado</button>
                    </div>
                    <div class="col-md-12">
                        <br>
                        <label>Ingrese Trancisiones</label>
                        <input type="text" class="form-control" placeholder="Borde Inicial" id="txtborde_inicial"><br> 
                        <input type="text" class="form-control" placeholder="Borde Final" id="txtborde_final">
                        <br><input type="text" class="form-control" placeholder="Peso" id="txtpeso">
                        <br>
                        <button id="guardar_Borde" class="btn btn-primary">Crear Borde</button>
                    </div>


                </div>
            </div>
            <div class="panel panel-primary">
                <div class="panel-heading">Registro de Cadenas</div>
                <div class="panel-body">

                    <div class="col-md-12">
                        <br>
                        <label>Ingrese Cadenas a validar</label>
                        <input type="text" class="form-control" placeholder="Cadena" id="txtcadena"><br> 

                        <button id="guardar_cadena" class="btn btn-primary">Guardar</button>
                        <button id="terminar" class="btn btn-danger">Terminar y Ejecutar</button>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-8 principal">
            <div class="panel panel-primary principal">
                <div class="panel-heading">Grafo Creado</div>
                <div class="panel-body principal" id="mynetwork">Panel Content</div>
            </div>
        </div>


        <script src="jquery-2.2.1.js"></script>
        <script src="Consulta.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/dataTables.bootstrap.js"></script>
        <script src="js/jquery.dataTables.min.js"></script>
        <script src="js/dataTables.bootstrap.min.js"></script>  
    </body>
</html>
