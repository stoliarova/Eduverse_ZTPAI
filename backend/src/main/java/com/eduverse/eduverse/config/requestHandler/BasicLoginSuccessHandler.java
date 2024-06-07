package com.eduverse.eduverse.config.requestHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class BasicLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // Log the success information
        System.out.println("Authentication successful for user: " + request.getParameter("username"));
        System.out.println("IP Address: " + request.getRemoteAddr());

        // Set response status and content type for JSON response
        response.setStatus(HttpServletResponse.SC_OK); // 200 status code
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Send JSON response with success message
        response.getWriter().write("{\"success\": true, \"message\": \"Authentication successful\"}");

        // Alternatively, you could redirect the user to their intended destination or a specific page
        // For example:
        // super.onAuthenticationSuccess(request, response, authentication);
    }
}

