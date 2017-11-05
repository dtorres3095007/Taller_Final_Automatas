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
var idparametro = 0;
var idvalorparametro = 0;
$(document).ready(function() {


    $("#Recargar").click(function() {
        Listar_Parametros();
        Listar_valor_Parametros(-1);
    });
    $('.btn-Efecto-men').popover();

    $("#GuardarParametro").submit(function() {
        registrarParametro();
        return false;
    });
    $("#GuardarValorParametro").submit(function() {
        registrar_valor_Parametro();
        return false;
    });
    $("#Modificar_valor_parametro").submit(function() {

        modificar_valor_Parametro(idvalorparametro);
        return false;
    });
    $("#btneliminar").click(function() {


        if (idvalorparametro == 0) {
            MensajeConClase("Antes de Continuar Seleccione le Parametro a Eliminar", "error", "Oops...")

        } else {
            swal({
                title: "Estas Seguro .. ?",
                text: "Tener en cuenta que al Eliminar este Parámetro, Este desaparecerá de los diferentes Módulos en los cuales se Utilizaba !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#990000",
                confirmButtonText: "Si, Eliminar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    eliminar_valor_Parametro(idvalorparametro)
                }
            });
        }
    });

    $("#AgregarValorParametro").click(function() {
        if (idparametro == 0) {

            MensajeConClase("Antes de continuar seleccione el parametro al cual va a registrar un nuevo valor..!", "error", "Oops...")
        } else {

            if (idparametro == 18 || idparametro == 17 || idparametro == 16 || idparametro == 6 || idparametro == 7 || idparametro == 8 || idparametro == 12 || idparametro == 2) {
                $(".div_id_aux").html('<input class="form-control inputt" type="text" id="id_aux" name="id_aux" placeholder="Codigo">');
                $(".div_id_aux").show("fast");
            } else {
                $(".div_id_aux").html('<input class="form-control inputt" type="text" id="id_aux" name="id_aux" placeholder="Codigo">');

                $(".div_id_aux").hide("fast");
            }
            $("#ValorParmetro").modal();
        }
    });
    $("#btnmodifica").click(function() {
        obtener_valor_parametro_id(idvalorparametro);

        if (idvalorparametro == 0) {
            MensajeConClase("Antes de Continuar Seleccione le Parametro a Modificar", "error", "Oops...")
        } else {

            $("#ModalModificarParametro").modal();
        }
    });




});
function Listar_Parametros() {
    idparametro = 0;
    $('#tablaparametros tbody').off('dblclick', 'tr');
    $('#tablaparametros tbody').off('click', 'tr');


    var myTable = $("#tablaparametros").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Cargar_Parametros",
            dataType: "json",
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "id"},
            {"data": "nombre"},
            {"data": "descripcion"},
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

    $('#tablaparametros tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();

        idparametro = data.id;

        Listar_valor_Parametros(idparametro)

        $("#tablaparametros tbody tr").removeClass("warning");
        $(this).attr("class", "warning");

    });
    $('#tablaparametros tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();


    });


}

function Listar_valor_Parametros(parametro) {
    idvalorparametro = 0;
    $('#tablavalorparametros tbody').off('dblclick', 'tr');
    $('#tablavalorparametros tbody').off('click', 'tr');


    var myTable = $("#tablavalorparametros").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Cargar_valor_Parametros",
            dataType: "json",
            data: {
                idparametro: parametro
            },
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "indice"},
            {"data": "valor"},
            {"data": "valorx"},
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

    $('#tablavalorparametros tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();

        idvalorparametro = data.id;

        $("#tablavalorparametros tbody tr").removeClass("warning");
        $(this).attr("class", "warning");

    });
    $('#tablavalorparametros tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();


    });


}

//En este metodo Guardo los parametros que maneja el sistema
function registrarParametro() {

    //obtengo el formulario de registro de parametros
    var formData = new FormData(document.getElementById("GuardarParametro"));
// Envio los datos a mi archivo PHP y le envio por get la funcion que va a realizar
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/guardar_Parametro",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {

        if (datos == "sin_session") {
            close();
            return;
        }
        //Recibo los datos del php
        //si es un quiere decir que los campos estan vacios
        if (datos == 1) {

            MensajeConClase("Todos Los Campos Son Obligatorios", "error", "Oops...")
            return  true;
            //si es dos es por que guardo el parametro
        } else if (datos == 2) {


            $('input').val('');
            $('textArea').val('');
            MensajeConClase("Parametro Guardado", "success", "Proceso Exitoso!")
            Listar_Parametros();

            return true;
            // si es tres es por que el nombre del parametro existe
        } else if (datos == 3) {

            MensajeConClase("El Nombre del Parametro ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        } else {
            // en dado caso que ocurra un error

            MensajeConClase("Error al Guardar el Parametro", "error", "Oops...")
        }
    });
}

function registrar_valor_Parametro() {


    var formData = new FormData(document.getElementById("GuardarValorParametro"));

    formData.append("idparametro", idparametro);

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/guardar_valor_Parametro",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }

        if (datos == 1) {

            MensajeConClase("Todos Los Campos Son Obligatorios", "error", "Oops...")
            return  true;

        } else if (datos == 2) {


            $('input').val('');
            $('textArea').val('');

            MensajeConClase("Valor Parametro Guardado", "success", "Proceso Exitoso!")
            Listar_valor_Parametros(idparametro);

            return true;

        } else if (datos == 3) {

            MensajeConClase("El Nombre del Parametro ya esta en el sistema", "error", "Oops...")
            return true;
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        } else {


            MensajeConClase("Error al Guardar el Parametro", "error", "Oops...")
        }
    });
}
function eliminar_valor_Parametro(parametro) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Eliminar_Valor_parametro",
        dataType: "json",
        data: {
            idparametro: parametro
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }

        if (datos == 1) {

            MensajeConClase("Valor Parametro Eliminado con exito", "success", "Proceso Exitoso!");

            Listar_valor_Parametros(idparametro);

            return  true;

        }else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {


            MensajeConClase("Error al Eliminar el Parametro", "error", "Oops...")
        }
    });
}
function obtener_valor_parametro_id(parametro) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/obtener_valor_parametro_id",
        dataType: "json",
        data: {
            idparametro: parametro
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }
        $("#txtValor_modificar").val(datos[0].valor);
        $("#txtDescripcion_modificar").val(datos[0].valorx);
    });
}
function Cargar_parametro_buscado(parametro, combo, mensaje) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/obtener_valores_parametro",
        dataType: "json",
        data: {
            idparametro: parametro
        },
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            $(combo).html("");
            $(combo).append("<option value=''>" + mensaje + "</option>");

            for (var i = 0; i <= datos.length - 1; i++) {
                $(combo).append("<option  title='" + datos[i].valorx + "' data-toggle='popover' data-trigger='hover' value= " + datos[i].id + ">" + datos[i].valor + "</option>");

            }

            ;
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}
function Cargar_parametro_buscado_aux_para(idaux, combo, mensaje, parametro) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/obtener_valor_parametro_idaux",
        dataType: "json",
        data: {
            idaux: idaux,
            idparametro: parametro
        },
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            $(combo).html("");
            $(combo).append("<option value=''>" + mensaje + "</option>");

            for (var i = 0; i <= datos.length - 1; i++) {
                $(combo).append("<option value=" + datos[i].id + ">" + datos[i].valor + "</option>");

            }

            ;
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}
function Cargar_parametro_buscado_aux(parametro, combo, mensaje) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/obtener_valores_parametro",
        dataType: "json",
        data: {
            idparametro: parametro
        },
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            $(combo).html("");
            $(combo).append("<option value=''>" + mensaje + "</option>");

            for (var i = 0; i <= datos.length - 1; i++) {
                $(combo).append("<option value=" + datos[i].id_aux + ">" + datos[i].valor + "</option>");

            }

            ;
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}
function modificar_valor_Parametro(parametro) {

    var formData = new FormData(document.getElementById("Modificar_valor_parametro"));

    formData.append("idparametro", parametro);

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Modificar_valor_Parametro",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }

        if (datos == 1) {

            MensajeConClase("Valor Parametro Modificado con exito", "success", "Proceso Exitoso!");
            $("input").val("");
            $("textarea").val("");
            $("#ModalModificarParametro").modal("hide");
            Listar_valor_Parametros(idparametro);

            return  false;
            ;

        }else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else if (datos == 2) {

            MensajeConClase("Todos Los Campos Son Obligatorios", "error", "Oops...")
            return  true;

        } else {


            MensajeConClase("Error al Modificar el Parametro", "error", "Oops...")
        }
    });
}


