package automatas20172_1;

import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * @author BS
 */
public class Prueba {

    public static void main(String[] args) {

        Datos a = new Datos();
        ArrayList<String> cadenas = a.ObtenerCadenas();
        System.out.println("" + cadenas.size());

        /*
        ///Alt +28∟
        ///Se crea el Objeto Grafo
        Grafo grafo = new Grafo();
        ///Se agregan cada uno de los estados
        ///seguidos de true si es inicial, y luego true si es final
        grafo.crearEstadoYObtener("q0", true, false);
        grafo.crearEstadoYObtener("q1", true);
        grafo.crearEstadoYObtener("q2");
        grafo.crearEstadoYObtener("q3", true);
        grafo.agregarEstadoTransicion("q0", "q1", "a");
        grafo.agregarEstadoTransicion("q0", "q2", "b");
        grafo.agregarEstadoTransicion("q1", "q2", "b");
        grafo.agregarEstadoTransicion("q2", "q1", "c");
        grafo.agregarEstadoTransicion("q2", "q3", "a");
        grafo.agregarEstadoTransicion("q3", "q2", "b");
        grafo.agregarEstadoTransicion("q3", "q1", "d");
        ///En caso que haya dos transiciones de un estado a otro se puede colocar separado
        ///por espacio
        grafo.agregarEstadoTransicion("q3", "q1", "d a");

        System.out.println(grafo);
        Arrays.asList("a", "b","c", "d", "abcba", "abcbcba").forEach(
                s -> System.out.println("Resultado " + s + " " + grafo.evaluarCadena(s))
        );
         */
    }

    /* public static boolean evaluarMatriz(String[][] matriz, String cadena) {
        Grafo grafo = new Grafo();
        for (int fila = 1; fila < matriz.length; fila++) {
            for (int columna = 1; columna < matriz[fila].length; columna++) {
                grafo.agregarEstadoTransicion(matriz[fila][0], matriz[0][columna], matriz[fila][columna]);
            }
        }
        boolean sw=grafo.evaluarCadena(cadena);
        System.out.println("Evaluar "+cadena+"->"+sw);
        return sw;
    }*/
}
