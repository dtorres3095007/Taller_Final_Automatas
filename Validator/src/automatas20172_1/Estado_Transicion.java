/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package automatas20172_1;

/**
 *
 * @author DAMIAN
 */
public class Estado_Transicion {
    private String valor;
    private String inicial;
    private String Final;

    public Estado_Transicion(String valor, String inicial, String Final) {
        this.valor = valor;
        this.inicial = inicial;
        this.Final = Final;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getInicial() {
        return inicial;
    }

    public void setInicial(String inicial) {
        this.inicial = inicial;
    }

    public String getFinal() {
        return Final;
    }

    public void setFinal(String Final) {
        this.Final = Final;
    }
    
    
}
