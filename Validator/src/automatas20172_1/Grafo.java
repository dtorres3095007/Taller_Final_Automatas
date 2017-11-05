/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package automatas20172_1;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Grafo {

    final Set<Estado> estados = new LinkedHashSet<>();

    /**
     * Añade al conjunto de Vertices, todas los verticiones que tienen
     * recursivamente transiciones lamdas
     *
     * @param estadosEvaluar
     */
    void expandirLambdas(Set<Estado> estadosEvaluar) {
        Set<Estado> estadosEvaluarTmp = estadosEvaluar;
        int numeroVertices;
        do {
            Set<Estado> verticesNuevosDetectados = new LinkedHashSet<>();
            numeroVertices = estadosEvaluar.size();
            estadosEvaluarTmp.forEach(
                    (estado) -> {
                        verticesNuevosDetectados.addAll(estado.estadosConTransicionLambda());
                    }
            );
            estadosEvaluar.addAll(verticesNuevosDetectados);
            estadosEvaluarTmp = verticesNuevosDetectados;
            ///Si se añadieron nuevo vertices, se deben seguir evaluando las transciones
            ///lamdas de los mismos
        } while (numeroVertices != estadosEvaluar.size());
    }

    boolean evaluarCadena(String cadenaEvaluar) {
        boolean evaluacionExitosa = false;
        ///Se crea un conjunto de todos los vertices que son iniciales
        ///en teoría debe ser uno solo pero se le dará tolerancia para permitir más de uno.
        Set<Estado> estadosEvaluar = estados.stream().filter(v -> v.isInicial()).collect(Collectors.toSet());
        ///Es posible que los vertices iniciales tengan unas transiciones lamdas
        ///por lo tanto dichos vertices tambien harán parte del conjunto inicial
        expandirLambdas(estadosEvaluar);
        ///
        boolean abortar = false;
        int i = -1;
        do {
            i++;
            if (i == cadenaEvaluar.length()) {///Si la iteracion actual corresponde a la final de la cadena
                ///Hay que verificar los vertices actuales, y en caso que alguno sea final, entonces
                ///la cadena es valida
                if (estadosEvaluar.stream().filter(v -> v.isFinal()).count() > 0) {
                    evaluacionExitosa = true;
                }
                abortar = true;
            } else {
                String caracterAEvaluar = cadenaEvaluar.substring(i, i + 1);
                Set<Estado> verticesTmp = new LinkedHashSet<>();
                estadosEvaluar.forEach(
                        (vertice) -> {
                            vertice.transiciones.stream().forEach(
                                    (adyacente) -> {
                                        adyacente.getTextoTransicion().stream().forEach(
                                                (transicion) -> {
                                                    if (transicion.equals(caracterAEvaluar)) {
                                                        verticesTmp.add(adyacente.getEstadoSiguiente());
                                                    }
                                                }
                                        );
                                    }
                            );
                        }
                );
                ///Si no hay vertices con transiciones validas, entonces la cadena no es valida
                if (verticesTmp.isEmpty()) {
                    abortar = true;
                } else {
                    expandirLambdas(verticesTmp);
                    estadosEvaluar = verticesTmp;
                }
            }
        } while (!abortar);
        return evaluacionExitosa;
    }

    public boolean isVacio() {
        return estados.isEmpty();
    }

    public void eliminarEstados() {
        this.estados.clear();
    }

    public void eliminarTransiciones() {
        estados.forEach((Estado v) -> v.quitarRelaciones());
    }

    public static boolean esNombreValido(String nombre) {
        return !(nombre.trim().equals(""));
    }

    public void agregarVertices(String nombresVertices) {
        agregarVertices(nombresVertices, false, false);
    }

    public List<Estado> agregarVertice(String nombres) {
        return agregarVertices(nombres, false, false);
    }

    public List<Estado> agregarVertices(String nombresEstados, boolean esInicial, boolean esFinal) {
        List<Estado> verticesCreados = new ArrayList();
        String vNombresEstados[] = nombresEstados.trim().split(",");
        for (String nombreEstado : vNombresEstados) {
            if (esNombreValido(nombreEstado) == false || buscarEstado(nombreEstado) != null) {
                continue;
            }
            Estado q = new Estado(esInicial, esFinal, nombreEstado);
            verticesCreados.add(q);
        }
        return verticesCreados;
    }

    public Estado buscarEstado(String nombreEstado) {
        return estados.stream().filter(v -> v.nombre.equalsIgnoreCase(nombreEstado)).findFirst().orElse(null);
    }

    public Estado crearEstadoYObtener(String nombreEstado, boolean esFinal) {
        return Grafo.this.crearEstadoYObtener(nombreEstado, false, esFinal);
    }
    public Estado crearEstadoYObtener(String nombreEstado, boolean esInicial, boolean esFinal) {
        Estado p = buscarEstado(nombreEstado);
        if (p == null) {
            p = agregarVertices(nombreEstado, esInicial, esFinal).get(0);
            estados.add(p);
        }
        return p;
    }

    public List<Estado> crearEstadoYObtener(String[] nombreEstado, boolean esInicial, boolean esFinal) {
        List<Estado> lista = new ArrayList<>();
        for (String nombre : nombreEstado) {
            lista.add(this.crearEstadoYObtener(nombre, esInicial, esFinal));
        }
        return lista;
    }

    public Estado crearEstadoYObtener(String nombreEstado) {
        return this.crearEstadoYObtener(nombreEstado, false, false);
    }

    public void agregarEstadoTransicion(String nombreEstadoOrigen,
            String nombreEstadoDestino, String cadenaTransicion) {
        agregarEstadoTransicion(nombreEstadoOrigen, false, false,
                nombreEstadoDestino, false, false, cadenaTransicion);
    }

    public void agregarEstadoTransicion(String nombreEstadoOrigen, boolean origenEsInicial,
            String nombreEstadoDestino, boolean destinoEsFinal, String cadenaTransicion) {
        agregarEstadoTransicion(nombreEstadoOrigen, origenEsInicial, false,
                nombreEstadoDestino, false, destinoEsFinal, cadenaTransicion);
    }

    public void agregarEstadoTransicion(String nombreEstadoOrigen, boolean origenEsInicial, boolean origenEsFinal,
            String nombreEstadoDestino, boolean destinoEsInicial, boolean destinoEsFinal, String cadenaTransicion) {
        Estado estadoOrigen = Grafo.this.crearEstadoYObtener(nombreEstadoOrigen, origenEsInicial, origenEsFinal);
        Estado estadoDestino = Grafo.this.crearEstadoYObtener(nombreEstadoDestino, destinoEsInicial, destinoEsFinal);
        if (estadoOrigen != null && estadoDestino != null) {
            estadoOrigen.agregarTransicion(estadoDestino, cadenaTransicion);
        }
    }

    @Override
    public String toString() {
        return "Grafo \n" + (estados.stream().map(e -> e.toString()).collect(Collectors.joining(" ")));
    }

}
