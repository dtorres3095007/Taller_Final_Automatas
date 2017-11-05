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

}
