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
id_persona_reserva = 0;
idreserva = 0;
idinventario = 0;
idinventario = 0;
tipo_repor = 0;
$(document).ready(function() {
    // Cargar_parametro_buscado_aux(6, ".cbx_tipo_recurso", "Seleccione Tipo recurso");
    $("#Guardar_reserva").submit(function() {
        Guardar_Reserva();
        return false;
    });
    $("#cbx_tipo_reporte").change(function() {
        var tipo_repor = $("#cbx_tipo_reporte").val().trim();
        if (tipo_repor == 3) {
            $('.reporte_fecha_filtro').hide("slow");
            $("#usar_filtro").hide("slow");
            $('#reporte_fecha_filtro').removeAttr("checked")
        } else {
            $('.reporte_fecha_filtro').show("slow");

        }
        return false;
    });
    $("#Recargar").click(function() {
        Listar_reservas_audivisuales();
    });
    $('#reporte_fecha_filtro').on('click', function() {
        if ($(this).is(':checked')) {
            // Hacer algo si el checkbox ha sido seleccionado
            $("#usar_filtro").show("slow");
            $("#inicial_fecha").val("");
            $("#final_fecha").val("");
        } else {
            $("#usar_filtro").hide("slow");
            $("#inicial_fecha").val("");
            $("#final_fecha").val("");
        }
    });


    $("#detalle_inventario").click(function() {
        obtener_detalle_inventario(idinventario, tipo_inventario);
    });
    $("#btneliminar_reserva").click(function() {
        if (idreserva == 0) {
            MensajeConClase("Seleccione la Reserva que desea Cancelar", "error", "Oops...")
        } else {
            swal({
                title: "Estas Seguro ?",
                text: "Tener en cuenta que al Cancelar la Reserva se Habilitara para su respectivo uso",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#990000",
                confirmButtonText: "Si, Cancelar!",
                cancelButtonText: "No, Regresar!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    Modificar_estado_reserva(idreserva, "Res_Canc");
                }
            });
        }
    });

    $("#btn_generar_reporte_general").click(function() {
        var inicial = $("#inicial_fecha").val().trim();
        var final = $("#final_fecha").val().trim();
        tipo_repor = $("#cbx_tipo_reporte").val().trim();

        if (tipo_repor.length == 0) {
            MensajeConClase("Seleccione el Tipo de Reporte que desea Generar", "error", "Oops...")
        } else {
            if ($('#reporte_fecha_filtro').prop('checked')) {
                if (inicial.length == 0 || final.length == 0) {
                    MensajeConClase("Ingrese Fecha Inicial y fecha Final", "error", "Oops...")
                    return false;
                }
            }
            if (tipo_repor == 1 || tipo_repor == 2 || tipo_repor == 4) {
                $("#tit_rep_fec_ent").html("Fecha_Entrega");
                $("#tit_rep_fec_sal").html("Fecha_Salida");
                $("#tit_rep_pers").html("Persona");
                $("#tit_rep_lug").html("Lugar");
                reportes_generales(inicial, final);
            } else {
                $("#tit_rep_fec_ent").html("Fecha_Ingreso");
                $("#tit_rep_fec_sal").html("Fecha_Garantia");
                $("#tit_rep_pers").html("Marca");
                $("#tit_rep_lug").html("Modelo");
                reportes_generales2("", "")
            }


        }

    });


    $("#btnreportes_generales").click(function() {

        $("#Modal_reportes_generales").modal("show");

        var myTable = $("#tablareportes_generales").DataTable({
            "destroy": true,
            "columns": [
                {"data": "tipo"},
                {"data": "serial"},
                {"data": "fecha_entrega"},
                {"data": "fecha_salida"},
                {"data": "persona"},
                {"data": "lugar"},
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
    });

    $("#detalle_persona_solicita").click(function() {

        $("#tabla_persona_reserva").show("slow");
    });
    $("#btnpersona_entrega_recibe").click(function() {
        if (id_persona_reserva == 0) {
            $("#tipo_respuesta_solicitud").html('<b>Quien Entrega el Recurso ..?</b>')
        } else {
            $("#tipo_respuesta_solicitud").html("<b>Quien Recibe el Recurso ..?</b>")
        }
        $("#Modal_responder_reserva").modal("show");
    });
    $("#ocultar_detalle_persona_solicita").click(function() {
        $("#tabla_persona_reserva").hide("slow");
    });

    $("#btnlistar_inventario").click(function() {
        $(".tablaReservas").hide("fast")
        $(".tablainventario").show("slow")
    });
    $("#btnlistar_reservas").click(function() {
        $(".tablainventario").hide("fast")
        $(".tablaReservas").show("slow")

    });

    $("#btn_responder_solicitud_reserva").click(function() {
        var id_persona_sele = $("#cbx_persona_reserva").val();
        if (id_persona_sele.length == 0) {
            MensajeConClase(" Seleccione Persona a Entregar el Recurso Solicitado", "error", "Oops...")
        } else {
            Marcar_entrega_recibe(id_persona_sele, idreserva, id_persona_reserva)
        }

    });


});

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

        } else if (datos == "sin_session") {
            close();
        } else {
            MensajeConClase("El dispositivo no Tiene Informacion Adicional", "error", "Oops...")
        }

    });
}
function Guardar_Reserva() {

    //tomamos el formulairo ingresar visitante
    var formData = new FormData(document.getElementById("Guardar_reserva"));

    //  Enviamos el formulario a nuestro archivo php con parametro guardar     
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Guardar",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {

        if (datos == -1) {
            MensajeConClase("El recurso no se encuentra Disponible", "error", "Oops...")
            return  true;
        } else if (datos == -2) {
            MensajeConClase("Error al Registrar la Reserva", "error", "Oops...")
            return true;
        } else if (datos == -3) {
            MensajeConClase("La Hora de Salida debe Ser Mayor a la Hora de Entrega del Recurso", "error", "Oops...")
            return true;
        } else if (datos == -4) {
            MensajeConClase("La Fecha y hora  de Entrega debe Ser Mayor a la Fecha y Hora Actual", "error", "Oops...")
            return true;
        } else if (datos == -5) {
            MensajeConClase("Todos los campos son Obligatorios, a exepcion de la Asignatura y las Observaciones", "error", "Oops...")
            return true;
        } else if (datos == "sin_session") {
            close();
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        } else {
            var mensaje = "Reserva Guardada Con exito";
            MensajeConClase(datos, "success", "Proceso Exitoso!");
            Listar_reservas_audivisuales();
            // $("input").val('');

        }
    });

}


function Listar_reservas_audivisuales() {
    idreserva == 0;
    $("#btnpersona_entrega_recibe").hide("slow");

    idinventario = 0;
    $('#tablaReservas tbody').off('dblclick', 'tr');
    $('#tablaReservas tbody').off('click', 'tr');


    var myTable = $("#tablaReservas").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Cargar_Reservas",
            dataType: "json",
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "tipo"},
            {"data": "serial_inventario"},
            {"data": "fecha_entrega"},
            {"data": "fecha_salida"},
            {"data": "id_usuario"},
            {"data": "lugar"},
            {"data": "id_tipo_entrega"},
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

    $('#tablaReservas tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();

        idreserva = data.id;

        if (data.estado2 == "Res_Soli") {
            $("#btnpersona_entrega_recibe").show("slow");
            $("#btnpersona_entrega_recibe span").removeClass("glyphicon-eye-close")
            $("#btnpersona_entrega_recibe span").addClass("glyphicon-eye-open")
            id_persona_reserva = 0;
        } else if (data.estado2 == "Res_Entre") {
            id_persona_reserva = 1;
            $("#btnpersona_entrega_recibe").show("slow");
            $("#btnpersona_entrega_recibe span").removeClass("glyphicon-eye-open")
            $("#btnpersona_entrega_recibe span").addClass("glyphicon-eye-close")
        } else {
            $("#btnpersona_entrega_recibe").hide("slow");
            id_persona_reserva = -1;
        }


        $("#tablaReservas tbody tr").removeClass("warning");
        $(this).attr("class", "warning");

    });
    $('#tablaReservas tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();

        obtener_info_reserva_id(idreserva)

    });


}


function Listar_inventario_audivisuales() {


    idinventario = 0;
    $('#tablainventario tbody').off('dblclick', 'tr');
    $('#tablainventario tbody').off('click', 'tr');


    var myTable = $("#tablainventario").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Cargar_inventario_audiovisuales",
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
            return;
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
function obtener_info_reserva_id(id) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/obtener_datos_reserva",
        dataType: "json",
        data: {
            id: id
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }
        $(".valor_solicitante").html(datos[0].nombre + " " + datos[0].apellido);
        $(".valor_recurso").html(datos[0].tipo);
        $(".valor_serial").html(datos[0].serial_inventario);
        $(".valor_ingreso").html(datos[0].fecha_entrega);
        $(".valor_salida").html(datos[0].fecha_salida);
        $(".valor_tipo_entrega").html(datos[0].id_tipo_entrega);
        $(".valor_tipo_prestamo").html(datos[0].id_tipo_prestamo);
        $(".valor_tipo_clase").html(datos[0].id_tipo_clase);
        $(".valor_lugar").html(datos[0].lugar);
        $(".valor_asignatura").html(datos[0].asignatura);

        if (datos[0].nombre_recibe == null) {
            $(".valor_persona_recibe").html("Sin Asignar");

        } else {
            $(".valor_persona_recibe").html(datos[0].nombre_recibe + " " + datos[0].apellido_recibe + " " + datos[0].segundo_apellido_Recibe);

        }

        if (datos[0].nombre_entrega == null) {
            $(".valor_persona_entrega").html("Sin Asignar");

        } else {
            $(".valor_persona_entrega").html(datos[0].nombre_entrega + " " + datos[0].apellido_entrega + " " + datos[0].segundo_apellido_entrega);

        }
        $(".valor_observaciones").html(datos[0].observaciones);
        $(".valor_estado").html(datos[0].estado);

        $(".valor_nombre_soli").html(datos[0].nombre + " " + datos[0].segundo_nombre);
        $(".valor_apellido_soli").html(datos[0].apellido + " " + datos[0].segundo_apellido);

        $(".valor_identificacion_soli").html(datos[0].identificacion);
        $(".valor_correo_soli").html(datos[0].correo);
        $(".valor_telefono_soli").html(datos[0].telefono);
        $(".valor_departamento_soli").html(datos[0].departamento);
        $(".valor_tipo_identificacion_soli").html(datos[0].id_tipo_identificacion);


        $("#Modal-info-dispositivo-reserva").modal("show");

    });
}
function Cargar_recursos_audiovisuales(combo) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/obtener_recursos_audiovisuales_combo",
        dataType: "json",
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            $(combo).html("");
            $(combo).append("<option value=''>" + "Seleccione Recurso" + "</option>");

            for (var i = 0; i <= datos.length - 1; i++) {
                $(combo).append("<option  value= " + datos[i].id_aux + ">" + datos[i].valor + "</option>");

            }

            ;
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}

function Cargar_personas_audiovisuales() {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/obtener_datos_personas_audiovisuales",
        dataType: "json",
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            $(".cbx_persona_reserva").html("");
            $(".cbx_persona_reserva").append("<option value=''>Seleccione Persona</option>");

            for (var i = 0; i <= datos.length - 1; i++) {
                $(".cbx_persona_reserva").append("<option   value= " + datos[i].id + ">" + datos[i].nombre + " " + datos[i].apellido + " " + datos[i].segundo_apellido + "</option>");

            }

            ;
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}
function Marcar_entrega_recibe(idpersona, idreserva, tipo) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Modificar_entrega_Reserva",
        dataType: "json",
        data: {
            idpersona: idpersona,
            idreserva: idreserva,
            tipo: tipo,
        },
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            if (datos == 4) {
                if (tipo == 0) {
                    MensajeConClase("Recurso Entregado con exito", "success", "Proceso Exitoso!");
                } else {
                    MensajeConClase("Recurso Recibido con exito", "success", "Proceso Exitoso!");

                }
                $("#Modal_responder_reserva").modal("hide");
                Listar_reservas_audivisuales();

            } else if (datos == 2) {
                MensajeConClase("La persona a seleccionada no existe", "error", "Oops...")
            } else if (datos == -1302) {
                MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
            } else {
                MensajeConClase("Error en la operacion", "error", "Oops...")
            }
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}

function reportes_generales(inicial, final) {

    var myTable = $("#tablareportes_generales").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Cargar_recurso_fecha_estado",
            dataType: "json",
            type: "post",
            data: {
                inicial: inicial,
                final: final,
                tipo: tipo_repor,
            },
        },
        //"processing": true,

        "columns": [
            {"data": "tipo"},
            {"data": "serial"},
            {"data": "fecha_entrega"},
            {"data": "fecha_salida"},
            {"data": "persona"},
            {"data": "lugar"},
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

}

function reportes_generales2(inicial, final) {
    var myTable = $("#tablareportes_generales").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Cargar_recurso_fecha_estado",
            dataType: "json",
            type: "post",
            data: {
                inicial: inicial,
                final: final,
                tipo: 3,
            },
        },
        //"processing": true,

        "columns": [
            {"data": "recurso"},
            {"data": "serial"},
            {"data": "fecha_garantia"},
            {"data": "fecha_ingreso"},
            {"data": "marca"},
            {"data": "modelo"},
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

}

function reportes_generalesx(inicial, final) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Cargar_recurso_fecha_estado",
        dataType: "json",
        data: {
            inicial: inicial,
            final: final,
            tipo: tipo_repor,
        },
        type: "post",
        success: function(datos) {

            alert(datos)
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}
function Modificar_estado_reserva(id, estado) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Reservas_control/Modificar_estado_reserva",
        dataType: "json",
        data: {
            id: id,
            estado: estado,
        },
        type: "post",
        success: function(datos) {

            if (datos == 1) {
                Listar_reservas_audivisuales();
                MensajeConClase("La Reserva Fue cancelada", "success", "Proceso Exitoso!");
            } else if (datos == 2) {
                MensajeConClase("La reserva ya fue Cancelada Anteriormente", "error", "Oops...")
            } else if (datos == "sin_session") {
                close();
            } else if (datos == -1302) {
                MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
            } else {
                MensajeConClase("Error en la operacion", "error", "Oops...")
            }
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}