package automatas20172_1;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

public class Estado {

    ///////////////////////////////
    String nombre;
    private boolean eInicial = false;
    private boolean eFinal = false;

    final List<Transicion> transiciones = new ArrayList();

    public Estado(Estado vertice) {
        this.nombre = vertice.nombre;
    }

    public Set<Estado> estadosConTransicionLambda() {
        return estadosConTransicion(Transicion.LAMBDA);
    }

    public Set<Estado> estadosConTransicion(String transicion) {
        Set<Estado> estadosConTransicion = new LinkedHashSet();
        ///Se recorren cada uno de las adyacencias que tenga el vertice
        transiciones.forEach(ady -> {
            ///En caso que alguna de las transiciones coincidan con la transicion esperada
            ///entonces el vertice destino hace parte del conjunto de vertices
            ady.getTextoTransicion().stream().filter(t -> t.equals(transicion)).forEach(
                    trans -> {
                        estadosConTransicion.add(ady.getEstadoSiguiente());
                    }
            );
        });
        return estadosConTransicion;
    }

    public Estado(boolean esInicial, boolean esFinal, String nombre) {
        this.eInicial = esInicial;
        this.eFinal = esFinal;
        this.nombre = nombre;
    }

    public Estado(String nombre) {
        this.nombre = nombre;
    }

    public boolean agregarTransicion(Estado estadoSiguiente, String transiciones) {
        Transicion adyacente = new Transicion(estadoSiguiente, transiciones);
        Optional<Transicion> a = this.transiciones.stream().filter(ady -> ady.getEstadoSiguiente().equals(estadoSiguiente)).findFirst();
        if (a.isPresent()) {
            ((Transicion) a.get()).agregarTextoTransicion(transiciones);
        } else {
            this.transiciones.add(adyacente);
        }
        return true;
    }

    public boolean eliminarSiguienteEstado(String nombreEstado) {
        return transiciones.removeIf((ady) -> ady.getEstadoSiguiente().nombre.equalsIgnoreCase(nombreEstado));
    }

    public boolean quitarRelaciones() {
        this.transiciones.clear();
        return true;
    }

    public boolean estaEstado(Estado v) {
        return transiciones.stream().filter((ady) -> ady.getEstadoSiguiente().equals(v)).findFirst().isPresent();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();

        transiciones.forEach((ady) -> sb.append("Ady: ").append(ady).append("\n"));

        return "Ver: " + nombre + "(" + isInicial() + "," + eFinal + ")\n" + sb.toString();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Estado) {
            return this.nombre.equalsIgnoreCase(((Estado) obj).nombre);
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 61 * hash + Objects.hashCode(this.nombre);
        return hash;
    }

    public boolean isFinal() {
        return eFinal;
    }

    public void seteFinal(boolean eFinal) {
        this.eFinal = eFinal;
    }

    public boolean isInicial() {
        return eInicial;
    }

    public void seteInicial(boolean eInicial) {
        this.eInicial = eInicial;
    }

}
