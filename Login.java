import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class Login extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        String tableName;

        if (username.matches("\\d{6}")) {
            tableName = "teachers";
        } else if (username.matches("[a-zA-Z0-9]+")) {
            tableName = "students";
        } else {
            out.println("{\"success\": false, \"message\": \"Invalid username format!\"}");
            return;
        }

        try {
            // Loading drivers for MySQL
            Class.forName("com.mysql.jdbc.Driver");

            // Creating connection with the database
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/gitam", "root", "")) {
                String query = "SELECT * FROM " + tableName + " WHERE uid = ? AND pass = ?";
                try (PreparedStatement ps = con.prepareStatement(query)) {
                    ps.setString(1, username);
                    ps.setString(2, password);

                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            out.println("success");
                        } 
                    }
                }
            }
        } catch (Exception se) {
            se.printStackTrace(out);
        }
    }
}
