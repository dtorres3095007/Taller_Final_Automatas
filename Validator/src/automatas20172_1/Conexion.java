/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */   /* */
package automatas20172_1;

/**
 *
 * @author Damian7
 */
import java.sql.*;
import javax.swing.JOptionPane;
public class Conexion {
Connection con=null;
String driver="com.mysql.jdbc.Driver";
String url = "jdbc:mysql://localhost/grafo";
public Connection conex(){
    try {
       Class.forName(driver);
       con=DriverManager.getConnection(url,"root","");
        System.out.println("bien");
    } catch (ClassNotFoundException | SQLException e) {
        
    JOptionPane.showMessageDialog(null, "Error al conectar con la DBA");
 
        
    }
    return con;
}
    
}
