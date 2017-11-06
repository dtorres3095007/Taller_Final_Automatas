package automatas20172_1;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class Transicion {

    public static final String LAMBDA = "";

    private final Estado estadoSiguiente;
    private Set<String> textoTransicion = new LinkedHashSet<>();

    public Transicion(Estado vertice, String transiciones) {
        this.estadoSiguiente = vertice;
        String[] textosTransicion = transiciones.split(" ");
        this.textoTransicion.addAll(Arrays.asList(textosTransicion));
    }

    public void agregarTextoTransicion(String textoTransicion) {
        String[] vectorTransicion = textoTransicion.split(" ");
        this.getTextoTransicion().addAll(Arrays.asList(vectorTransicion));
    }

    public void eliminarTextoTransicion(String textoTransicion) {
        String[] vectorTransicion = textoTransicion.split(" ");
        for (String textoTransicion_ : vectorTransicion) {
            this.getTextoTransicion().removeIf((t) -> t.equals(textoTransicion_));
        }
    }

    @Override
    public String toString() {
        return getTextoTransicion().stream().collect(Collectors.joining(" ")) + "→" + getEstadoSiguiente().nombre;
    }

    public Estado getEstadoSiguiente() {
        return estadoSiguiente;
    }

    public Set<String> getTextoTransicion() {
        return textoTransicion;
    }

    public void setTextoTransicion(Set<String> textoTransicion) {
        this.textoTransicion = textoTransicion;
    }

    public String getPrimeraTransicion() {
        return textoTransicion.stream().findAny().orElse(null);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Transicion) {
            Transicion t = (Transicion) obj;
            if (this.estadoSiguiente.equals(t.getEstadoSiguiente())) {
                return this.textoTransicion.equals(t.getTextoTransicion());
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.estadoSiguiente);
        hash = 17 * hash + Objects.hashCode(this.textoTransicion);
        return hash;
    }

}
