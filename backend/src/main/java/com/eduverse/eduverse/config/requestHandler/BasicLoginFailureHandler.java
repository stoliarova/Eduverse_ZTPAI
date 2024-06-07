package com.eduverse.eduverse.config.requestHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class BasicLoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        // Log the failure
        System.out.println("Authentication failed for user: " + request.getParameter("username"));
        System.out.println("IP Address: " + request.getRemoteAddr());
        System.out.println("Error Message: " + exception.getMessage());

        // Set response status and redirect or send error message
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 status code
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Send JSON response with error message
        response.getWriter().write("{\"error\": \"Authentication failed\", \"message\": \"" + exception.getMessage() + "\"}");

        // Alternatively, redirect the user to a custom error page or login page
        // response.sendRedirect("/login?error=true");
    }
}
