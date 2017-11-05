idinventario = 0;
id_mantenimiento = 0;
estado_mante = "";
estado_aux = "";
var idioma = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Ningún dato disponible en esta tabla...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}
$(document).ready(function() {



    $("#cbxrecursos").change(function() {

        var valor = $(this).val();

        if (valor == "Comp") {
            $(".CampoGeneral").removeAttr("required");
            $(".CampoComputador").attr("required", "true");
            $("#computadores").show("slow");
            $("#tipoGeneral").hide("slow");
        } else {
            if (valor == "Port") {
                $(".CampoPortatil").attr("required", "true");
                $("#Info-Portatil").show("slow");

            } else {
                $(".CampoPortatil").removeAttr("required");
                $("#Info-Portatil").hide("slow");
            }
            $(".CampoGeneral").attr("required", "true");
            $(".CampoComputador").removeAttr("required");
            $("#computadores").hide("slow");
            $("#tipoGeneral").show("slow");
        }
    });

    $("#Agregar-nuevo-mantenimiento").click(function() {
        if (estado_aux == "RecBaja") {
            MensajeConClase("El recurso Fue dado de Baja, por tal motivo no esta disponible el Panel de  Mantenimiento ..!", "error", "Oops...")
        } else {
            Guardar_mantenimiento();
            return false;
        }
    });
    $("#detalle_inventario").click(function() {
        obtener_detalle_inventario(idinventario, tipo_inventario);
    });
    $("#panelTorre").click(function() {

        $("li").css("font-weight", "");
        $("li").removeClass("active")
        $(this).addClass("active");
        $(this).css("font-weight", "bold");
        $("#torre").show("slow");
        $("#teclado").hide("slow");
        $("#monitor").hide("slow");
        $("#mouse").hide("slow");
        $("#general").hide("slow");
    });

    $(".btnAgregar").click(function() {
        $('#cbxrecursos option[value="' + "" + '"]').remove();
        $('#cbxrecursos').val("Disp");
        $(".CampoGeneral").attr("required", "true");
        $(".CampoComputador").removeAttr("required");
        $(".CampoPortatil").removeAttr("required");
        $("#Info-Portatil").hide("fast");
    });
    $("#panelGenral").click(function() {

        $("li").css("font-weight", "");
        $("li").removeClass("active")
        $(this).addClass("active");
        $(this).css("font-weight", "bold");
        $("#general").show("slow");
        $("#torre").hide("slow");
        $("#teclado").hide("slow");
        $("#monitor").hide("slow");
        $("#mouse").hide("slow");

    });
    $("#panelMonitor").click(function() {

        $("li").css("font-weight", "");
        $("li").removeClass("active")
        $(this).addClass("active");
        $(this).css("font-weight", "bold");
        $("#monitor").show("slow");
        $("#torre").hide("slow");
        $("#teclado").hide("slow");
        $("#general").hide("slow");
        $("#mouse").hide("slow");
    });
    $("#panelMouse").click(function() {

        $("li").css("font-weight", "");
        $("li").removeClass("active")
        $(this).addClass("active");
        $(this).css("font-weight", "bold");
        $("#mouse").show("slow");
        $("#torre").hide("slow");
        $("#teclado").hide("slow");
        $("#monitor").hide("slow");
        $("#general").hide("slow");
    });
    $("#panelTeclado").click(function() {
        $("li").css("font-weight", "");
        $("li").removeClass("active")
        $(this).addClass("active");
        $(this).css("font-weight", "bold");

        $("#teclado").show("slow");
        $("#torre").hide("slow");
        $("#general").hide("slow");
        $("#monitor").hide("slow");
        $("#mouse").hide("slow");
    });

    $("#Recargar").click(function() {
        Listar_inventario();
    });

    $("#btnBuscarpersona").click(function() {

        var identificacion = $("#txtIdentificacionpersona").val();
        var tipo_identificacion = $("#tipo_ide_persona").val();

        if (tipo_identificacion.length == 0) {
            MensajeConClase("Seleccione Tipo de identificacion", "error", "Oops...");
        } else if (identificacion.trim().length == 0) {
            MensajeConClase("Ingrese Numero de identificacion", "error", "Oops...");
        } else {
            obtener_datos_persona_identificacion(identificacion, tipo_identificacion, ".nombre_perso", ".apellido_perso", ".identi_perso", ".tipo_id_perso", ".foto_perso", ".ubica_perso", ".depar_perso", ".cargo_perso", "#datos_perso", "#id_persona");

        }
    });
    $("#nuevo-responsable").click(function() {
        if (estado_aux == "RecBaja") {
            MensajeConClase("El recurso Fue dado de Baja, por tal motivo no esta disponible el Panel de  Mantenimiento ..!", "error", "Oops...")
        } else {
            $("#for-nuevo-responsbale").show("slow");
            $("#mostrar-responsable").hide("slow");
        }
    });
    $("#btn-regresar-respons").click(function() {

        $("#for-nuevo-responsbale").hide("slow");
        $("#mostrar-responsable").show("slow");

    });
    $("#btn-guardar-responsable").click(function() {
        var cargo = $("#cargo_traslado").val().trim();
        ;

        if (cargo.length == 0) {
            MensajeConClase("Antes de Guardar debe Seleccionar el nuevo Responsable", "error", "Oops...")
        } else if (estado_aux == "RecBaja") {
            MensajeConClase("El recurso Fue dado de Baja, por tal motivo no esta disponible el Panel de  Mantenimiento ..!", "error", "Oops...")
        } else {


            swal({
                title: "Estas Seguro ?",
                text: "Tener en cuenta que al asignar un nuevo responsable, el sistema automaticamente retirara al actual y lo pasara a la historia de responsables!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#990000",
                confirmButtonText: "Si, Trasladar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    Guardar_responsable();
                }
            });
        }
    });



    $("#Modificar_inventario").submit(function() {

        modificar_inventario(idinventario);
        return false;
    });



    $("#Asignar-responsables").click(function() {



        if (idinventario == 0) {
            MensajeConClase("Antes de continuar seleccione el recurso ..!", "error", "Oops...")
        } else {
            $("#Modal-responsables").modal();
            Listar_responsables(idinventario)

        }
    });

    $("#btnmantenimiento").click(function() {
        id_mantenimiento = 0;
        Cargar_parametro_buscado(11, ".cbx_tipo_mantenimiento", "Seleccione Tipo Mantenimiento");
        if (idinventario == 0) {
            MensajeConClase("Antes de continuar seleccione el recurso ..!", "error", "Oops...")
        } else {
            Listar_mantenimientos(idinventario)
            $("#ModalMantenimiento").modal();
        }
    });

    $("#btnmodificar_inventario").click(function() {
        obtener_valor_inventario_id(idinventario);


        if (idinventario == 0) {
            MensajeConClase("Antes de continuar seleccione el recurso a Modificar..!", "error", "Oops...")
        } else {

            $("#ModalModificarInventario").modal();
        }
    });

    /*$("#cbxrecursos_modi").change(function() {
     
     Cargar_parametro_buscado_aux_para($(this).val(), "#cbxmodelo_modi", "Seleccione Modelo", 5);
     Cargar_parametro_buscado_aux_para($(this).val(), "#cbxmarcas_modi", "Seleccione Marca", 4);
     });
     */
    $("#Guardar_inventario").submit(function() {
        registrar_inventario();

        return false;
    });
    $("#btneliminar_inventario").click(function() {


        if (idinventario == 0) {
            MensajeConClase("Antes de continuar seleccione el recurso a dar de baja..!", "error", "Oops...")

        } else if (estado_aux == "RecBaja") {
            MensajeConClase("El recurso ya  Fue dado de Baja Anteriormente..!", "error", "Oops...")
        } else {
            swal({
                title: "Estas Seguro ?",
                text: "Tener en cuenta que al dar de BAJA  el recurso se Desactivara y No se tendra en cuenta para sus diferentes usos..!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#990000",
                confirmButtonText: "Si, Terminar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    dar_baja(idinventario);
                }
            });


        }
    });

});
function Listar_inventario() {
    idinventario = 0;
    $('#tablainventario tbody').off('dblclick', 'tr');
    $('#tablainventario tbody').off('click', 'tr');


    var myTable = $("#tablainventario").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/Cargar_inventario",
            dataType: "json",
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "serial"},
            {"data": "recurso"},
            {"data": "marca"},
            {"data": "modelo"},
            {"data": "fecha_ingreso"},
            {"data": "fecha_garantia"},
            {"data": "descripcion"},
            {"data": "estado_recurso"},
        ], "language": idioma,
        dom: 'Bfrtip',
        "buttons": [{
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel',
                className: 'btn btn-success',
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV',
                className: 'btn btn-default',
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF',
                className: 'btn btn-danger',
            }
        ],
    });

    $('#tablainventario tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();

        idinventario = data.id;
        estado_aux = data.estado_aux;


        $("#tablainventario tbody tr").removeClass("warning");
        $(this).attr("class", "warning");

    });
    $('#tablainventario tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();
        $("#tabla_info_portatil").hide("fast");
        $("#tabla_info_computador").hide("fast");
        obtener_info_inventario_id(data.id);



    });


}
function Guardar_mantenimiento() {

    var tipo = $("#tipo_mantenimiento").val().trim();
    if (tipo.length == 0) {
        MensajeConClase("Seleccione Tipo de Mantenimiento", "error", "Oops...")
    } else {
        $.ajax({
            url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/Guardar_mantenimiento",
            dataType: "json",
            data: {
                id_tipo: tipo,
                id_inventario: idinventario,
            },
            type: "post",
        }).done(function(datos) {
            if (datos == "sin_session") {
                close();
                return false;
            }
            if (datos == 1) {

                MensajeConClase("Mantenimiento Agregado Con Exito", "success", "Proceso Exitoso!");
                Listar_mantenimientos(idinventario)
                return true;

            }else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {
                MensajeConClase("Error al Guardar El Mantenimiento", "error", "Oops...")
            }
        });
    }
}
function Terminar_mantenimiento() {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/Terminar_Mantenimiento",
        dataType: "json",
        data: {
            id: id_mantenimiento,
            id_inventario: idinventario,
        },
        type: "post",
    }).done(function(datos) {

        if (datos == "sin_session") {
            close();
            return false;
        }
        if (datos == 1) {

            MensajeConClase("Mantenimiento Terminado Con Exito", "success", "Proceso Exitoso!");
            Listar_mantenimientos(idinventario);
            id_mantenimiento = 0;
            return true;

        } else {
            MensajeConClase("Error al Terminar El Mantenimiento", "error", "Oops...")
        }
    });

}
function Guardar_responsable() {

    var cargo = $("#cargo_traslado").val().trim();

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/Guardar_Responsable",
        dataType: "json",
        data: {
            id_cargo: cargo,
            id_inventario: idinventario,
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return false;
        }
        if (datos == 4) {

            MensajeConClase("El responsble que desea Asignar es el responsable Actual", "error", "Oops...")
            return  true;

        } else if (datos == 2) {

            MensajeConClase("Todos Los Campos Son Obligatorios", "error", "Oops...")
            return  true;

        } else if (datos == 1) {
            $(".error").hide("slow");
            MensajeConClase("Responsable Asignado con exito", "success", "Proceso Exitoso!")
            Listar_responsables(idinventario);

            return true;

        }else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {


            MensajeConClase("Error al Guardar el Responsable", "error", "Oops...")
        }
    });

}
function Listar_responsables(id) {

    $('#tabla-responsables tbody').off('dblclick', 'tr');
    $('#tabla-responsables tbody').off('click', 'tr');


    var myTable = $("#tabla-responsables").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/Cargar_responsables",
            dataType: "json",
            data: {
                id: id,
            },
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "cargo"},
            {"data": "ubicacion"},
            {"data": "fecha_entrega"},
            {"data": "fecha_retiro"},
            {"data": "estado"},
        ], "language": idioma,
        dom: 'Bfrtip',
        "buttons": [{
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel',
                className: 'btn btn-success',
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV',
                className: 'btn btn-default',
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF',
                className: 'btn btn-danger',
            }
        ],
    });

    $('#tabla-responsables tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();





        $("#tabla-responsables tbody tr").removeClass("warning");
        $(this).attr("class", "warning");

    });
    $('#tabla-responsables tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();


    });


}


function Listar_mantenimientos(id) {

    $('#tabla-mantenimiento tbody').off('dblclick', 'tr');
    $('#tabla-mantenimiento tbody').off('click', 'tr');


    var myTable = $("#tabla-mantenimiento").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/Cargar_mantenimiento",
            dataType: "json",
            data: {
                id: id,
            },
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "tipo"},
            {"data": "descripcion"},
            {"data": "fecha"},
            {"data": "usuario"},
            {"data": "estado"},
        ], "language": idioma,
        dom: 'Bfrtip',
        "buttons": [{
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel',
                className: 'btn btn-success',
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV',
                className: 'btn btn-default',
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF',
                className: 'btn btn-danger',
            }
        ],
    });

    $('#tabla-mantenimiento tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();
        $("#tabla-mantenimiento tbody tr").removeClass("warning");
        $(this).attr("class", "warning");
        id_mantenimiento = data.id;
        estado_mante = data.estado_valor;

    });
    $('#tabla-mantenimiento tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();


    });


}

//En este metodo Guardo los parametros que maneja el sistema
function registrar_inventario() {
    //obtengo el formulario de registro de parametros
    var formData = new FormData(document.getElementById("Guardar_inventario"));
// Envio los datos a mi archivo PHP y le envio por get la funcion que va a realizar
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/guardar_inventario",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {
       
        if (datos == "sin_session") {
            close();
            return false;
        }
        //Recibo los datos del php
        //si es un quiere decir que los campos estan vacios
        if (datos == 1) {
            MensajeConClase("Todos los campos son obligatorios", "error", "Oops...")
            return  true;
            //si es dos es por que guardo el parametro
        } else if (datos == 4) {
            $('input').val('');
            $('textArea').val('');
            MensajeConClase("Dispositivo Guardado Con exito", "success", "Proceso Exitoso!");
            Listar_inventario();

            return true;
            // si es tres es por que el nombre del parametro existe
        } else if (datos == 6) {
            $('input').val('');
            $('textArea').val('');
            MensajeConClase("Computador Guardado Con exito", "success", "Proceso Exitoso!");
            Listar_inventario();

            return true;
            // si es tres es por que el nombre del parametro existe
        } else if (datos == 3) {
            MensajeConClase("El serial del Dispositivo ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -1) {
            MensajeConClase("El serial de la torre ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -2) {
            MensajeConClase("El serial del Teclado ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -3) {
            MensajeConClase("El serial del Mouse ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -4) {
            MensajeConClase("El serial del Monitor ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -5) {
            MensajeConClase("Está intentando Guardar 2 o más seriales repetidos", "error", "Oops...")
            return true;
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        } else {
            MensajeConClase("Error al Guardar El Recurso", "error", "Oops...")
        }
    });
}
function dar_baja(id) {
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/dar_baja",
        dataType: "json",
        data: {
            id: id
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return false;
        }
        if (datos == 1) {
            MensajeConClase("El recurso fue dado de baja con exito", "success", "Proceso Exitoso!");
            Listar_inventario();
            return  true;
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {
            MensajeConClase("Error al dar de baja a el recurs", "error", "Oops...")
        }
    });
}

function modificar_inventario(id) {

    var formData = new FormData(document.getElementById("Modificar_inventario"));

    formData.append("id", id);

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/modificar_inventario",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {


        if (datos == "sin_session") {
            close();
            return false;
        }
        if (datos == 1) {
            MensajeConClase("Inventario Modificado con exito", "success", "Proceso Exitoso!");
            $("input").val("");
            $("textarea").val("");
            Listar_inventario();
            $("#ModalModificarInventario").modal("hide")
            return  false;
            ;

        } else if (datos == 2) {

            MensajeConClase("Todos Los Campos Son Obligatorios", "error", "Oops...")
            return  true;

        } else if (datos == 3) {

            MensajeConClase("El serial ya esta registrado en el sistema", "error", "Oops...")
            return  true;

        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {


            MensajeConClase("Error al modificar el inventario", "error", "Oops...")
        }
    });
}

function obtener_valor_inventario_id(id) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/obtener_valores_inventario",
        dataType: "json",
        data: {
            id: id
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return false;
        }
        // Cargar_parametro_buscado_aux_para(datos[0].id_recurso, "#cbxmodelo_modi", "Seleccione Modelo", 5);
        //Cargar_parametro_buscado_aux_para(datos[0].id_recurso, "#cbxmarcas_modi", "Seleccione Marca", 4);
        $("#serial_modi").val(datos[0].serial);
        var modelo = datos[0].id_modelo;
        var marca = datos[0].id_marca;
        var tipo = datos[0].tipo;

        $("#cbxmarcas_modi").val(marca);
        $("#cbxmodelo_modi").val(modelo);
        $("#cbxrecursos_modi").val(tipo);
        $("#descripcion_modi").val(datos[0].descripcion);




    });
}

function obtener_info_inventario_id(id) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/obtener_valores_inventario_info",
        dataType: "json",
        data: {
            id: id
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return false;
        }
        $(".valor_recurso").html(datos[0].tipo_valor);
        $(".valor_garantia").html(datos[0].fecha_garantia);
        $(".valor_ingreso").html(datos[0].fecha_ingreso);
        $(".valor_marca").html(datos[0].marca);
        $(".valor_modelo").html(datos[0].modelo);
        $(".valor_serial").html(datos[0].serial);
        $(".valor_valor").html(datos[0].valor);
        $(".valor_descripcion").html(datos[0].descripcion);
        tipo_inventario = datos[0].tipo;
        $("#Modal-info-dispositivo").modal("show");

    });
}

function obtener_detalle_inventario(id, tipo) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/inventario_control/obtener_detalle_inventario_info",
        dataType: "json",
        data: {
            id: id,
            tipo: tipo,
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return false;
        }
        if (datos == "") {
            MensajeConClase("El dispositivo no Tiene Informacion Adicional", "error", "Oops...")
        } else
        if (tipo == "Port") {

            $(".valor_procesador").html(datos[0].procesador);
            $(".valor_discoduro").html(datos[0].disco_duro);
            $(".valor_memoria").html(datos[0].memoria);
            $(".valor_sistemaope").html(datos[0].sistema_operativo);
            $("#tabla_info_portatil").show("slow");

        } else if (tipo == "Torre" || tipo == "Mouse" || tipo == "Teclado" || tipo == "Monitor") {
            $(".valor_procesador").html(datos[0].procesador);
            $(".valor_discoduro").html(datos[0].disco_duro);
            $(".valor_memoria").html(datos[0].memoria);
            $(".valor_sistemaope").html(datos[0].sistema_operativo);
            $(".valor_torre").html(datos[0].torre);
            $(".valor_mouse").html(datos[0].mouse);
            $(".valor_teclado").html(datos[0].teclado);
            $(".valor_monitor").html(datos[0].monitor);
            $("#tabla_info_computador").show("slow");

        } else {
            MensajeConClase("El dispositivo no Tiene Informacion Adicional", "error", "Oops...")
        }

    });
}

function  Terminar_Mat() {

    if (id_mantenimiento == 0) {
        MensajeConClase("Seleccione Mantenimiento a terminar", "error", "Oops...")
    } else if (estado_mante == "Mat_Term") {
        MensajeConClase("El Mantenimiento ya se encuentra Terminado", "error", "Oops...")
    } else {

        swal({
            title: "Estas Seguro ?",
            text: "Tener en cuenta que al Terminar el Mantenimiento el recurso se Activara y se tendra en cuenta para sus diferentes usos..!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#990000",
            confirmButtonText: "Si, Terminar!",
            cancelButtonText: "No, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm) {
            if (isConfirm) {
                Terminar_mantenimiento();
            }
        });


    }
}