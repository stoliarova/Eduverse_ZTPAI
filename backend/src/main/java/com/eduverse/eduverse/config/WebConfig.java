package com.eduverse.eduverse.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;


//
// ALTERNATIVE VERSION of CORS @Bean used in SecurityConfig
// It is potentially more performant than the @Bean version but considered less dynamic and flexible
// as it changes internal mechanisms of Spring Boot logic rather than being used as filter for each request
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    private static final List<String> allowedOrigins = Arrays.asList(
//            "http://localhost:5173",
//            "https://example.com",
//            "https://subdomain.example.com"
//    );
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        // Transform the simple origin list into a pattern list for subdomains
//        List<String> allowedOriginPatterns = allowedOrigins.stream()
//                .map(o -> o.replace("http://", "http://*.").replace("https://", "https://*."))
//                .collect(Collectors.toList());
//
//        registry.addMapping("/**")
//                .allowedOrigins(allowedOriginPatterns.toArray(new String[0])) // Set dynamic-like patterns
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("Authorization", "Cache-Control", "Content-Type")
//                .allowCredentials(true)
//                .maxAge(3600); // Max age of CORS options request
//    }
//}
