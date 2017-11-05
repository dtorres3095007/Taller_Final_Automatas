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
var acept = 0;
var idperfil = 0;
var id_permisos_perfil = 0;
$(document).ready(function() {

    /*  $("#ModificarUsuario").submit(function () {
     
     Modificar_usuario();
     return false;
     });
     */
    $("#Recargar").click(function() {
        Listar_perfiles_usuarios();


    });
    $("#logeo").submit(function() {

        Logear();
        return false;
    });
    $("#Asignar_Activiad").click(function() {
        if (idperfil == 0) {

            MensajeConClase("Seleccione Perfil al Cual desea Asignar la Actividad", "error", "Oops...")
        } else {
            $("#myModal").modal("show");
        }
    })
    $("#Retirar_Activiad").click(function() {
        Confirmar_Retirar_Actividad();
    })

    $("#Guardar_actividad_perfil").submit(function() {

        registrar_Actividad_perfil();
        return false;
    });
    $("#salir").click(function() {

        cerrar_sesion();
        return false;
    });

})

function Logear() {

    var formData = new FormData(document.getElementById("logeo"));
    formData.append("acept", acept);
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Pages/Logear",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {

        if (datos == 1) {

            window.location = "http://localhost/ReservaRecursosCUC/index.php/";

        } else if (datos == 2) {
            $("input").val("")
            MensajeConClase("Ingrese Usuario y Contraseña", "error", "Oops...")
            return true;
        } else if (datos == 3) {
            MensajeConClase("Usuario o contraseña incorrectos", "error", "Oops...")
            return true;
        } else if (datos == 4) {

            swal({
                title: "Politicas",
                text: "La División Gestión de Activos y Pasivos será la responsable de ejecutar y velar por el cumplimiento de las presentes políticas y demás lineamientos que en esta materia instituya la Junta Directiva del Banco Central de Costa Rica o la Comisión de Reservas. En las carteras gestionadas en forma externa, la ejecución de las políticas de inversión corresponderá a los administradores designados por la Junta Directiva y la División Gestión de Activos y Pasivos deberá velar porque dichos administradores cumplan con las presentes políticas y demás lineamientos.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#990000",
                confirmButtonText: "Si, Aceptar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    acept = 1;
                    Logear();
                }
            });
            return true;
        } else {

            window.location = "http://localhost/ReservaRecursosCUC/index.php/";


        }
    });


}

function cerrar_sesion() {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Pages/cerrar",
        type: "post",
        dataType: "html",
        cache: false,
        contentType: false,
        processData: false
    }).done(function(datos) {

        window.location = "http://localhost/ReservaRecursosCUC/index.php/";

    });
}
function Listar_perfiles_usuarios() {
    idperfil = 0;
    Listar_permisos_perfiles_usuarios();
    $("#opciones_perfil").hide("slow")
    $('#tabla_perfiles tbody').off('dblclick', 'tr');
    $('#tabla_perfiles tbody').off('click', 'tr');


    var myTable = $("#tabla_perfiles").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Cargar_valor_Parametros",
            dataType: "json",
            data: {
                idparametro: 17
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

    $('#tabla_perfiles tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();
        idperfil = data.id_aux;
        $("#tabla_perfiles tbody tr").removeClass("warning");
        $(this).attr("class", "warning");
        Listar_permisos_perfiles_usuarios();
        // prueba();
        Listar_Actividades_Sin_Asignar_Perfil();
        $("#opciones_perfil").show("slow")

    });
    $('#tabla_perfiles tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();


    });


}

function Listar_permisos_perfiles_usuarios() {
    id_permisos_perfil = 0;

    $('#tabla_permisos_perfiles tbody').off('dblclick', 'tr');
    $('#tabla_permisos_perfiles tbody').off('click', 'tr');


    var myTable = $("#tabla_permisos_perfiles").DataTable({
        "destroy": true,
        "ajax": {
            url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Listar_permisos_perfil",
            dataType: "json",
            data: {
                idperfil: idperfil
            },
            type: "post",
        },
        //"processing": true,

        "columns": [
            {"data": "id_actividad"},
            {"data": "agrega"},
            {"data": "elimina"},
            {"data": "modifica"},
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

    $('#tabla_permisos_perfiles tbody').on('click', 'tr', function() {
        var data = myTable.row(this).data();
        id_permisos_perfil = data.id;
        $("#tabla_permisos_perfiles tbody tr").removeClass("warning");
        $(this).attr("class", "warning");

    });
    $('#tabla_permisos_perfiles tbody').on('dblclick', 'tr', function() {
        var data = myTable.row(this).data();


    });


}
function iniciar_tabla_permisos_perfil() {

    var myTable = $("#tabla_permisos_perfiles").DataTable({
        "destroy": true,
        "language": idioma,
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
//En este metodo Guardo los parametros que maneja el sistema
function registrar_Actividad_perfil() {

    //obtengo el formulario de registro de parametros
    var formData = new FormData(document.getElementById("Guardar_actividad_perfil"));
    formData.append("idperfil", idperfil);
// Envio los datos a mi archivo PHP y le envio por get la funcion que va a realizar
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/guardar_actividad_perfil",
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

            MensajeConClase("Seleccione Actividad", "error", "Oops...")
            return  true;
            //si es dos es por que guardo el parametro
        } else if (datos == 2) {

            MensajeConClase("Actividad Asignada Con exito", "success", "Proceso Exitoso!")
            Listar_permisos_perfiles_usuarios();
            Listar_Actividades_Sin_Asignar_Perfil();

            return true;
            // si es tres es por que el nombre del parametro existe
        }  else if (datos == -1302) {
                MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
            } else {
            MensajeConClase("Error al Asignar la actividad", "error", "Oops...");
        }
    });
}

function Listar_Actividades_Sin_Asignar_Perfil() {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Listar_Actividades_Sin_Asignar_Perfil",
        dataType: "json",
        data: {
            idperfil: idperfil,
        },
        type: "post",
        success: function(datos) {
            var sw = 0;

            if (datos == "sin_session") {
                close();
                return;
            }
            $("#cbx_Actividades").html("");
            $("#cbx_Actividades").append("<option value=''>Seleccione Actividad</option>");
            for (var i = 0; i <= datos.length - 1; i++) {
                if (datos[i].id_actividad == null) {
                    $("#cbx_Actividades").append("<option value=" + datos[i].id_aux + ">" + datos[i].valor + "</option>");
                    sw = 1;
                }

            }
            if (sw == 0) {
                $("#cbx_Actividades").html("");
                $("#cbx_Actividades").append("<option value=''>Sin Actividades Por Asignar</option>");
            }

            ;
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });

}

function prueba() {
    alert("llama")
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Listar_permisos_perfil",
        dataType: "json",
        data: {
            idperfil: idperfil,
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
function CambiarPermisos(id, estado, col) {

    if (estado == 1) {
        estado = 0;
    } else {
        estado = 1;
    }

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Cambiar_estado_Permiso",
        dataType: "json",
        data: {
            id: id,
            estado: estado,
            col: col,
        },
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            if (datos == 4) {
                MensajeConClase("Permiso Modificado Con éxito", "success", "Proceso Exitoso!");
                Listar_permisos_perfiles_usuarios();
            } else if (datos == -1302) {
                MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
            } else {

                MensajeConClase("Error al Cambiar el Permiso", "error", "Oops...")
            }
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });
}

function AceptarCambioEstado(id, estado, col) {
    swal({
        title: "Estas Seguro .. ?",
        text: "Tener en cuenta que al Cambiar el Permiso, este afectara en las funciones del Perfil que esta Asignado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#990000",
        confirmButtonText: "Si, Cambiar!",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm) {
        if (isConfirm) {
            CambiarPermisos(id, estado, col);
        }
    });
}
function Eliminar_Actividad(id) {
    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Genericas_control/Eliminar_Actividad",
        dataType: "json",
        data: {
            id: id,
        },
        type: "post",
        success: function(datos) {
            if (datos == "sin_session") {
                close();
                return;
            }
            if (datos == 4) {
                MensajeConClase("Actividad Retirada Con éxito", "success", "Proceso Exitoso!");
                Listar_permisos_perfiles_usuarios();
                Listar_Actividades_Sin_Asignar_Perfil()
            }else if (datos == -1302) {
                MensajeConClase("No tiene Permisos Para Realizar Esta Opereacion", "error", "Oops...")
            }  else {

                MensajeConClase("Error al Retirar la Actividad", "error", "Oops...")
            }
        },
        error: function() {

            console.log('Something went wrong', status, err);

        }
    });
}

function Confirmar_Retirar_Actividad() {
    if (id_permisos_perfil == 0) {
        MensajeConClase("Seleccione Actividad a Retirar", "error", "Oops...");
    } else {
        swal({
            title: "Estas Seguro .. ?",
            text: "Tener en cuenta que al Retirar la Actividad afectara a los Usuarios con este Perfil Asignado",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#990000",
            confirmButtonText: "Si, Retirar!",
            cancelButtonText: "No, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm) {
            if (isConfirm) {
                Eliminar_Actividad(id_permisos_perfil);
            }
        });
    }
}
