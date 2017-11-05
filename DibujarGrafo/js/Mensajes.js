var timer;
var timer2;
$(document).ready(function() {
    $("nav  a").focus(function() {
        $(this).blur()
    })
    $("thead").show("slow");

    $("#menu button").focus(function() {
        $(this).blur();
    });
    $("#menu").show("slow");
    $("#inicio-user").show("slow");
    $("tbody").show("slow");
    $("#menu button").click(function() {
        $(".error").hide("fast");

        $(this).blur();
    });

    $("input").change(function() {
        var valor = $(this).val();
        valor = valor.trim();
        $(this).val(valor);

    });
    $("textarea").change(function() {
        var valor = $(this).val();
        valor = valor.trim();
        $(this).val(valor);

    });

})
function MensajeConClase(mensaje, atributo, x) {
    sweetAlert(x, mensaje, atributo);
}
function HabilitarModifica(capa) {
    $(capa).show('fast');
}
function DesHabilitarModifica(capa) {
    clearTimeout(timer2);
    $(capa).hide('fast');
    timer2 = setTimeout(function() {
        $(".modal").modal('hide');
    }, 5000);
}
function obtener_datos_persona_identificacion(identificacion, tipo, nombres, apellidos, identifi, tipo_iden, foto, ubicacion, departamento, cargo, muestra, id) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/obtener_datos_persona_identificacion",
        dataType: "json",
        data: {
            identificacion: identificacion,
            id_tipo: tipo
        },
        type: "post",
    }).done(function(datos) {
        if (datos == "sin_session") {
            close();
            return;
        }
        if (datos == "") {
            $(".txtUsuario").hide("slow");
            $("#txtpassword").val("");
            $("#btnGuardarusuario").hide("slow");
            MensajeConClase("Persona No encontrada", ".error");
            $(muestra).hide("slow");
            return 0;
        } else {
            $("#btnGuardarusuario").show("slow");
            $(".txtUsuario").show("slow");
            $(id).val(datos[0].id);
            $("#txtpassword").val(datos[0].identificacion);
            $("#btnmostrarpersona").show("slow");
            MensajeConClase("Persona Encontrada", ".error");
            $(nombres).html("<span class='ttitulo'>Nombres:</span> " + datos[0].nombre + " " + datos[0].segundo_nombre);
            $(apellidos).html("<span class='ttitulo'>Apellidos:</span> " + datos[0].apellido + " " + datos[0].segundo_apellido);
            $(identifi).html("<span class='ttitulo'>Identi:</span> " + datos[0].identificacion);
            $(tipo_iden).html("<span class='ttitulo'>Tipo Identi:</span> " + datos[0].id_tipo_identificacion);
            $(foto).html('<img src="../../../ImagenesPersonas/' + datos[0].foto + '">')
            $(ubicacion).html("<span class='ttitulo'>Ubicacion:</span> " + datos[0].ubicacion);
            $(departamento).html("<span class='ttitulo'>Departamento:</span> " + datos[0].id_departamento);
            $(cargo).html("<span class='ttitulo'>Cargo:</span> " + datos[0].id_cargo);

            $(muestra).show("slow");



            return 1;


        }
    });
}
function obtener_datos_persona_id_completo(id, nombres, apellidos, identifi, tipo_iden, foto, ubicacion, departamento, cargo) {

    $.ajax({
        url: "http://localhost/reservaRecursosCUC/index.php/Personas_control/obtener_datos_persona_id_completo",
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
        $(nombres).html("<span class='ttitulo'>Nombres:</span> " + datos[0].nombre + " " + datos[0].segundo_nombre);
        $(apellidos).html("<span class='ttitulo'>Apellidos:</span> " + datos[0].apellido + " " + datos[0].segundo_apellido);
        $(identifi).html("<span class='ttitulo'>Identi:</span> " + datos[0].identificacion);
        $(tipo_iden).html("<span class='ttitulo'>Tipo Identi:</span> " + datos[0].id_tipo_identificacion);
        $(foto).html('<img src="../../../ImagenesPersonas/' + datos[0].foto + '">')
        $(ubicacion).html("<span class='ttitulo'>Ubicacion:</span> " + datos[0].ubicacion);
        $(departamento).html("<span class='ttitulo'>Departamento:</span> " + datos[0].id_departamento);
        $(cargo).html("<span class='ttitulo'>Cargo:</span> " + datos[0].id_cargo);

    });
}

function close() {
    window.location = "http://localhost/ReservaRecursosCUC/index.php/Pages/Cargar_Iframe/Personas";
}