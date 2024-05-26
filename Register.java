import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class Register extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
	
        String fn = request.getParameter("first");
        String ln = request.getParameter("last");
        String em = request.getParameter("email");
	String uid = request.getParameter("uid");
	String pass = request.getParameter("password");
	String cpass = request.getParameter("confirm");
	String mob = request.getParameter("mobile");
        String tableName;
        try{
        

        //loading drivers for mysql
        Class.forName("com.mysql.jdbc.Driver");

	//creating connection with the database 
          Connection  con=DriverManager.getConnection
                     ("jdbc:mysql://localhost:3306/gitam","root","");
        if (uid.matches("\\d{6}")) {
                tableName = "teachers";
        } else if (uid.matches("[a-zA-Z0-9]+")) {
                tableName = "students";
        } else {
                out.println("Invalid user ID format!");
                return;
        }
        PreparedStatement ps=con.prepareStatement
                  ("insert into " + tableName +  " values(?,?,?,?,?,?,?)");

        ps.setString(1, fn);
        ps.setString(2, ln);
        ps.setString(3, em);
	ps.setString(4, uid);
	ps.setString(5, pass);
	ps.setString(6, cpass);
	ps.setString(7, mob);
        int i=ps.executeUpdate();
        
          if(i>0)
          {
            out.println("You are sucessfully registered");
          }
        
        }
        catch(Exception se)
        {
            se.printStackTrace();
        }
	
      }
  }