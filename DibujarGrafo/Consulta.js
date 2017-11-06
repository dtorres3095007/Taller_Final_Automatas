var nodes = [];
var edges = [];
indice = 1;
$(document).ready(function () {
    //CargarDatos();

    setInterval(function () {
        TraerCadenas();
    }, 3000);
    $("#guardar_nodo").click(function () {
        $(".error").hide("slow");
        var valor = $("#txtnodo").val().toString();
        var valor_Acep = $("#aceptacion").val().toString();
        if (valor.length == 0) {
            MensajeError("INGRESE ESTADO");

        } else {

            CrearNodos(valor, valor_Acep);
        }
    });
    $("#nuevo").click(function () {

        Truncar();
    });

    $("#guardar_cadena").click(function () {
        $(".error").hide("slow");
        var valor = $("#txtcadena").val().toString();
        if (valor.length == 0) {
            MensajeError("INGRESE CADENA A VALIDAR");

        } else {

            GuardarCadena(valor);
        }
    });
    $("#guardar_Borde").click(function () {
        $(".error").hide("slow");
        var borde_inicial = $("#txtborde_inicial").val().toString();
        var borde_final = $("#txtborde_final").val().toString();
        var peso = $("#txtpeso").val();
        if (borde_inicial.length == 0) {
            MensajeError("INGRESE EL ESTADO INICIAL DE LA TRANSICION");
        } else if (borde_final.length == 0) {

            MensajeError("INGRESE EL ESTADO FINAL DE LA TRANSICION");
        }  else {

            CrearBordes(borde_inicial, borde_final, peso);
        }
    });


});
function CrearNodos(label, final) {
    $(".error").hide("slow");
    var indice_inicial = Buscar_indices(label);
    if (indice_inicial != -1) {
        MensajeError("EL ESTADO YA EXISTE");
    } else {
        GuardarEstado(label, final);


    }
}
function CrearBordes(inicial, final, peso) {
    $(".error").hide("slow");
    var indice_inicial = Buscar_indices(inicial);
    var indice_final = Buscar_indices(final);
    if (indice_inicial == -1) {
        MensajeError("EL ESTADO INICIAL DE LA TRANSICION NO EXISTE");
    } else if (indice_final == -1) {
        MensajeError("EL ESTADO FINAL DE LA TRANSICION NO EXISTE");
    } else {
        GuardarTrancision(peso, indice_inicial, indice_final, inicial, final);

    }


}
function Buscar_indices(inicial) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].label == inicial) {
            return nodes[i].id;
        }
    }
    return -1;
}
function  PintarGrafo() {


    // create a network
    var container = document.getElementById('mynetwork');
    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        edges: {
            arrows: {
                to: {
                    enabled: true
                }
            }

        }

    };
    // initialize your network!
    var network = new vis.Network(container, data, options);
}

function GuardarEstado(estado, final) {
    var inicial = 0;
    if (indice == 1) {
        inicial = 1;
    }
    $.ajax({
        url: "datos.php?estado=si",
        dataType: "json",
        type: "post", data: {
            valor: estado,
            inicial: inicial,
            final: final
        },
        success: function (datos) {

            nodes.push({id: indice, label: estado});
            indice++;
            PintarGrafo();
            MensajeBien("ESTADO CREADO CON EXITO");
            $("input").val("");
        },
        error: function () {

            console.log('Something went wrong', status, err);

        }
    });
}

function TraerCadenas() {

    $.ajax({
        url: "datos.php?Listarcadenas=si",
        dataType: "json",
        type: "post",
        success: function (datos) {
            $("#resultado tbody").html("");

            for (var i = 0; i < datos.length; i++) {
                $("#resultado tbody").append("<tr ><td>" + (i + 1) + "</td><td>" + datos[i].cadena + "</td><td>" + datos[i].estado + "</td></tr>");

            }

        },
        error: function () {

            console.log('Something went wrong', status, err);

        }
    });
}
function GuardarTrancision(peso, indice_inicial, indice_final, inicial, final) {

    $.ajax({
        url: "datos.php?trancision=si",
        dataType: "json",
        type: "post", data: {
            valor: peso,
            inicial: inicial,
            final: final
        },
        success: function (datos) {
            MensajeBien("TRANSICION CREADA CON EXITO");
            edges.push({from: indice_inicial, to: indice_final, label: peso});
            PintarGrafo();
            $("input").val("");
        },
        error: function () {

            console.log('Something went wrong', status, err);

        }
    });
}
function Truncar() {

    $.ajax({
        url: "datos.php?truncar=si",
        dataType: "json",
        type: "post",
        success: function (datos) {
            MensajeBien("YA PUEDES TRABAJAR");
            edges = [];
            nodes = [];
            PintarGrafo();
            $("input").val("");
        },
        error: function () {

            console.log('Something went wrong', status, err);

        }
    });
}
function GuardarCadena(cadena) {

    $.ajax({
        url: "datos.php?cadena=si",
        dataType: "json",
        type: "post", data: {
            cadena: cadena,
        },
        success: function (datos) {
            MensajeBien("CADENA GUARDADA CON EXITO");
            $("input").val("");
        },
        error: function () {

            console.log('Something went wrong', status, err);

        }
    });
}
function MensajeError(Mensaje) {
    $(".bien").hide("slow");
    $(".error").hide("slow");
    $(".error").html(Mensaje);
    $(".error").show("slow");
    setTimeout(function () {
        $(".bien").hide("slow");
        $(".error").hide("slow");
    }, 5000);
}
function MensajeBien(Mensaje) {
    $(".error").hide("slow");
    $(".bien").hide("slow");
    $(".bien").html(Mensaje);
    $(".bien").show("slow");
    setTimeout(function () {
        $(".bien").hide("slow");
        $(".error").hide("slow");
    }, 5000);
}