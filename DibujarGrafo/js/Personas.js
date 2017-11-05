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
var idpersona = 0;
var persona = Array();
var tieneperfil = true;
$(document).ready(function() {

    /*$("#departamento_sele_guardar").change(function () {
     var idaux = $(this).val().trim();
     
     Cargar_parametro_buscado_aux_para(idaux, ".cbxcargos", "Seleccione Cargo", 2)
     });*/
    $("#Recargar").click(function() {

        listar_Personas();
    });
    $("#btn_asignar_perfil_user").click(function() {
        if (idpersona == 0) {
            MensajeConClase("Antes de continuar debe seleccionar la persona a la cual desea Asignar el Perfil..!", "error", "Oops...")
        } else if (tieneperfil) {
            swal({
                title: "No es lo que esperabas ?",
                text: "La persona Seleccionada ya tiene un Perfil Seleccionado, Si desea Cambiar El perfil debe Ingresar al Panel de Modificacion.!! ",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#990000",
                confirmButtonText: "Si, Ingresar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    obtener_datos_persona(idpersona);
                    $("#Modificar_persona").modal("show");
                }
            });
        } else {
            $("#Asignar_Perfil_modal").modal("show");
        }
    });
    $("#form-ingresar-visitado").submit(function() {
        registrarPersona();
        return false;
    });
    $("#Asignar_Perfil_usuario").submit(function() {

        Asignar_Perfil();
        return false;
    });
    $("#form-modificar-persona").submit(function() {
        Modificar_persona();
        return false;
    });
    $("#btnmodificar_persona").click(function() {
        if (idpersona == 0) {
            MensajeConClase("Antes de continuar debe seleccionar la persona a Modificar..!", "error", "Oops...")
        } else {

            obtener_datos_persona(idpersona)
            $("#Modificar_persona").modal();
        }
    })
    $("#btneliminar_persona").click(function() {


        if (idpersona == 0) {
            MensajeConClase("Antes de continuar debe seleccionar la persona a Eliminar..!", "error", "Oops...")
        } else {
            swal({
                title: "Estas Seguro ?",
                text: "Tener en cuenta que antes de Eliminar una Persona, Esta no debe Tener Asociado Ninguna Actividad para que Pueda Ser Eliminada!",
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
                    eliminar_Persona(idpersona);
                }
            });


        }
    });
    $("#btnEliminarpersona").click(function() {
        eliminar_Persona(idpersona);
        $("#MensajeEliminar").hide("fast");
        $("#MensajeEliminar").html("Persona Eliminada Con exito");
        $("#MensajeEliminar").show("slow");

        $(".botonesEliminar").hide("slow");
        $("#salirEliminar").show("slow");
    });

});
var listar_Personas = function() {
    idpersona = 0;
    $('#tablapersonas tbody').off('click', 'tr');
    $('#tablapersonas tbody').off('dblclick', 'tr');

    var table = $("#tablapersonas").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/Cargar_personas",
            dataType: "json",
            type: "post",
        }, //paging: false,
        //scrollY: 400,

        "columns": [
            {"data": "nombre"},
            {"data": "segundo_nombre"},
            {"data": "apellido"},
            {"data": "segundo_apellido"},
            {"data": "identificacion"},
            {"data": "telefono"},
            {"data": "correo"},
            {"data": "usuario"},
        ], "language": idioma,
        dom: 'Bfrtip',
        "buttons": [
            {
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
        ]

    });
    $('#tablapersonas tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        $("#tablapersonas tr").removeClass("warning");
        $(this).attr("class", "warning");
        idpersona = data.id;
        Tiene_Perfil();

    });
    $('#tablapersonas tbody').on('dblclick', 'tr', function() {
        var data = table.row(this).data();
        obtener_datos_persona_id_completo(idpersona, ".nombre_perso", ".apellido_perso", ".identi_perso", ".tipo_id_perso", ".foto_perso", ".ubica_perso", ".depar_perso", ".cargo_perso");

        $("#Mostrar_detalle_persona").modal();


    });
}
function registrarPersona() {

    //tomamos el formulairo ingresar visitante
    var formData = new FormData(document.getElementById("form-ingresar-visitado"));

    //  Enviamos el formulario a nuestro archivo php con parametro guardar     
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/guardar_persona",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {

        if (datos == -1000) {
            close();
            return;
        }

        if (datos == 1) {
            MensajeConClase("Todos Los campos ha excepción de la Foto son Obligatorios", "error", "Oops...")
            return  true;
        } else if (datos == 2) {
            MensajeConClase("Debe Ingresar Solo letras en el Nombre y Apellido", "error", "Oops...")
            return true;
        } else if (datos == 3) {
            MensajeConClase("El Persona ya se encuentra en el Sistema", "error", "Oops...")
            return true;
        } else if (datos == 4) {
            MensajeConClase("Persona Guardada Con exito", "success", "Proceso Exitoso!");
            $("input").val('');
            listar_Personas();
        } else if (datos == 5) {
            $("#FileImagen").val('');
            MensajeConClase("Formato de la Imagen No valido, Formatos validos JPG, PNG, GIF, JPEG", "error", "Oops...")
        } else if (datos == 6) {
            MensajeConClase("El Nombre de usuario ya se encuentra Registrado", "error", "Oops...")
        }else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {
            MensajeConClase("Error al Guardar a la persona", "error", "Oops...")
        }
    });

}
function eliminar_Persona(persona) {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/Eliminar_persona",
        dataType: "json",
        data: {
            idpersona: persona
        },
        type: "post",
    }).done(function(datos) {
      
        if (datos == "sin_session") {
            close();
            return;
        }
        if (datos == 1) {
            MensajeConClase("Persona Eliminada Con exito con exito", "success", "Proceso Exitoso!");
            listar_Personas();
            return  true;
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        } else {
            MensajeConClase("Error al Eliminar a la Persona", "error", "Oops...")
        }
    });
}

function Modificar_persona() {

    //tomamos el formulairo ingresar visitante
    var formData = new FormData(document.getElementById("form-modificar-persona"));
    formData.append("id", idpersona);
    //  Enviamos el formulario a nuestro archivo php con parametro guardar     
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/modificar_persona",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {

        if (datos == -1000) {
            close();
            return;
        }
        if (datos == 1) {
            MensajeConClase("Todos Los campos son Obligatorios", "error", "Oops...")
            return  true;
        } else if (datos == 2) {
            MensajeConClase("Debe Ingresar Solo letras en el Nombre y Apellido", "error", "Oops...")
            return true;
        } else if (datos == 3) {
            MensajeConClase("El Persona ya se encuentra en el Sistema", "error", "Oops...")
            return true;
        } else if (datos == 4) {
            MensajeConClase("Persona Guardada Con exito", "success", "Proceso Exitoso!");
            $("input").val('');
            $("#Modificar_persona").modal("hide")
            listar_Personas();
        } else if (datos == 5) {
            $("#FileImagen").val('');
            MensajeConClase("Formato de la Imagen No valido, Formatos validos JPG, PNG, GIF, JPEG", "error", "Oops...")
        } else if (datos == 6) {
            MensajeConClase("El Nombre de usuario ya se encuentra Registrado", "error", "Oops...")
        } else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {
            MensajeConClase("Error al Guardar a la persona", "error", "Oops...")
        }
    });


}
function obtener_datos_persona(id) {
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/obtener_datos_persona",
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
        $("#nombre_modifica").val(datos[0].nombre);
        $("#apellido_modifica").val(datos[0].apellido);
        $("#segundo_nombre_modifica").val(datos[0].segundo_nombre);
        $("#segundo_apellido_modifica").val(datos[0].segundo_apellido);
        $("#identificacion_modifica").val(datos[0].identificacion);
        $("#cbxcargos_modifica").val(datos[0].id_cargo);
        $("#cbxtipoIdentificacion_modifica").val(datos[0].id_tipo_identificacion);
        $("#cbxdepartamento_modifica").val(datos[0].id_departamento);
        $("#telefono_modifica").val(datos[0].telefono);
        $("#correo_modifica").val(datos[0].correo);
        $("#usuario_modifica").val(datos[0].usuario);
    });
}


function Asignar_Perfil() {

    var formData = new FormData(document.getElementById("Asignar_Perfil_usuario"));
    formData.append("id", idpersona);

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/Asignar_Perfil",
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

        if (datos == 4) {
            MensajeConClase("Perfil Asignado con Exito", "success", "Proceso Exitoso!");
            $("#Asignar_Perfil_modal").modal("hide")
            return  false;
            ;

        }else if (datos == -1302) {
            MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
        }  else {
            MensajeConClase("Error al Asignar el perfil", "error", "Oops...")
        }
    });
}
function Tiene_Perfil() {


    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/Tiene_Perfil",
        dataType: "json",
        data: {
            idpersona: idpersona
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }

        if (datos == "Sin Asignar") {
            tieneperfil = false;

        } else {
            tieneperfil = true;

        }
    });
}
