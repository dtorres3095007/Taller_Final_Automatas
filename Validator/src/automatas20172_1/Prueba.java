package automatas20172_1;

import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * @author BS
 */
public class Prueba {

    public static void main(String[] args) {
        Grafo grafo = new Grafo();
        Datos a = new Datos();
        ArrayList<Cadenas> cadenas = a.ObtenerCadenas();
        ArrayList<Estado> estados = a.ObtenerEstados();
        ArrayList<Estado_Transicion> estados_transicion = a.ObtenerEstadosTrancision();

        for (int i = 0; i < estados.size(); i++) {
           // System.out.println("Estado: "+estados.get(i).nombre + " Inicial: "+estados.get(i).isInicial()+ " Final: "+estados.get(i).isFinal() );
            grafo.crearEstadoYObtener(estados.get(i).nombre, estados.get(i).isInicial(), estados.get(i).isFinal());
        }

        for (int i = 0; i < estados_transicion.size(); i++) {
            grafo.agregarEstadoTransicion(estados_transicion.get(i).getInicial(), estados_transicion.get(i).getFinal(), estados_transicion.get(i).getValor());
           // System.out.println("Final: "+estados_transicion.get(i).getInicial() +" Final: "+ estados_transicion.get(i).getFinal()+" Valor "+estados_transicion.get(i).getValor());
        }
        System.out.println(grafo);
    
        for (int i = 0; i < cadenas.size(); i++) {
          String x = ""+  grafo.evaluarCadena(cadenas.get(i).getValor());
          String id = ""+cadenas.get(i).getId();
        a.CambiarEtado(id, x);

        }
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

}
