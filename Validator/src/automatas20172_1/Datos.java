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
    ArrayList<String> cadenas = new ArrayList<>();
    ArrayList<Estado> estados = new ArrayList<>();
     ArrayList<Estado_Transicion> estado_Transicion = new ArrayList<>();
    

    public Datos() {
    }

    public ArrayList<String> ObtenerCadenas() {

        try {

            con = c.conex();
            if (con == null) {

                return null;

            }
            String sql = "SELECT * FROM `cadenas` WHERE 1";

            send = con.createStatement();
            ResultSet rs = send.executeQuery(sql);
         
            while (rs.next()) {
               
                cadenas.add(rs.getString("cadena"));

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
                boolean Inicial=false, Final=false;
                int F=rs.getInt("final");
                int I=rs.getInt("inicial");
                String valor = rs.getString("valor");
                if(F==1)Final = true;
                if(I==1)Inicial = true;
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
               
                String Final=rs.getString("final");
                String Inicial=rs.getString("inicial");
                String valor = rs.getString("valor");
      
               Estado_Transicion a = new Estado_Transicion(valor,Inicial, Final);
                estado_Transicion.add(a);

            }
            return estado_Transicion;

        } catch (SQLException ex) {
            System.out.println("Error" + ex);

        }
        return null;

    }

}
