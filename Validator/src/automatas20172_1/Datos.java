/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package automatas20172_1;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DAMIAN
 */
public class Datos {

    Conexion c = new Conexion();
    Connection con;
    Statement send;
    ArrayList<Cadenas> cadenas = new ArrayList<>();
    ArrayList<Estado> estados = new ArrayList<>();
    ArrayList<Estado_Transicion> estado_Transicion = new ArrayList<>();

    public Datos() {
    }

    public ArrayList<Cadenas> ObtenerCadenas() {

        try {

            con = c.conex();
            if (con == null) {

                return null;

            }
            String sql = "SELECT * FROM `cadenas` WHERE estado = 'Sin Validar'";

            send = con.createStatement();
            ResultSet rs = send.executeQuery(sql);

            while (rs.next()) {
                Cadenas a = new Cadenas(rs.getInt("id"), rs.getString("cadena"));
                cadenas.add(a);

            }
            return cadenas;

        } catch (SQLException ex) {
            System.out.println("Error" + ex);

        }
        return null;

    }

    public ArrayList<Estado> ObtenerEstados() {

        try {

            con = c.conex();
            if (con == null) {

                return null;

            }
            String sql = "SELECT * FROM `estados` WHERE 1";

            send = con.createStatement();
            ResultSet rs = send.executeQuery(sql);

            while (rs.next()) {
                boolean Inicial = false, Final = false;
                int F = rs.getInt("final");
                int I = rs.getInt("inicial");
                String valor = rs.getString("valor");
                if (F == 1) {
                    Final = true;
                }
                if (I == 1) {
                    Inicial = true;
                }
                Estado a = new Estado(Inicial, Final, valor);
                estados.add(a);

            }
            return estados;

        } catch (SQLException ex) {
            System.out.println("Error" + ex);

        }
        return null;

    }

    public ArrayList<Estado_Transicion> ObtenerEstadosTrancision() {

        try {

            con = c.conex();
            if (con == null) {

                return null;

            }
            String sql = "SELECT * FROM `transiciones` WHERE 1";

            send = con.createStatement();
            ResultSet rs = send.executeQuery(sql);

            while (rs.next()) {

                String Final = rs.getString("final");
                String Inicial = rs.getString("inicial");
                String valor = rs.getString("valor");

                Estado_Transicion a = new Estado_Transicion(valor, Inicial, Final);
                estado_Transicion.add(a);

            }
            return estado_Transicion;

        } catch (SQLException ex) {
            System.out.println("Error" + ex);

        }
        return null;

    }

    public boolean CambiarEtado(String id, String estado) {

        con = c.conex();
        try {

            String sql = "UPDATE `cadenas` SET `estado`='" + estado + "' WHERE `id`='" + id + "'";
            Statement statement = con.createStatement();
            int modi = statement.executeUpdate(sql);
            if (modi == 1) {
                return true;
            }
        } catch (SQLException ex) {
            System.out.println("Error");
        }

        return false;
    }

    public static void esperarXsegundos(int segundos) {
        try {
            Thread.sleep(segundos * 1000);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }
    public static void Run(){
        while (true) {            
            esperarXsegundos(1);
            System.out.println("Holaa");
        }
    }

}
