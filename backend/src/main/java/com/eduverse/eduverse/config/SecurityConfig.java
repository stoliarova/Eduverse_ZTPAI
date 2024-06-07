package com.eduverse.eduverse.config;

import com.eduverse.eduverse.Constants;
import com.eduverse.eduverse.components.RestAuthenticationEntryPoint;
import com.eduverse.eduverse.config.filter.JwtAuthenticationFilter;
import com.eduverse.eduverse.config.requestHandler.BasicLoginFailureHandler;
import com.eduverse.eduverse.config.requestHandler.BasicLoginSuccessHandler;
import com.eduverse.eduverse.config.requestHandler.OAuth2LoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final BasicLoginSuccessHandler basicLoginSuccessHandler;
    private final BasicLoginFailureHandler basicLoginFailureHandler;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Autowired
    public SecurityConfig(
            OAuth2LoginSuccessHandler pOAuth2LoginSuccessHandler,
            BasicLoginSuccessHandler pBasicLoginSuccessHandler,
            BasicLoginFailureHandler pBasicLoginFailureHandler,
            RestAuthenticationEntryPoint pRestAuthenticationEntryPoint,
            JwtAuthenticationFilter jwtAuthFilter,
            AuthenticationProvider authenticationProvider
    ) {
        this.oAuth2LoginSuccessHandler = pOAuth2LoginSuccessHandler;
        this.basicLoginSuccessHandler = pBasicLoginSuccessHandler;
        this.basicLoginFailureHandler = pBasicLoginFailureHandler;
        this.restAuthenticationEntryPoint = pRestAuthenticationEntryPoint;
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

        userDetailsManager.setUsersByUsernameQuery("SELECT username, password, enabled FROM \"" + Constants.table_user + "\" WHERE username = ?");
        userDetailsManager.setAuthoritiesByUsernameQuery("SELECT u.username, a.name FROM \"" + Constants.table_user + "\" u INNER JOIN \"" + Constants.table_user_authority + "\" ua ON u.id = ua.user_id INNER JOIN \"" + Constants.table_authority + "\" a ON a.id = ua.authority_id WHERE u.username = ?");

        return userDetailsManager;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(configurer -> configurer
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/register").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/users").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.GET, "/api/users/{userId}").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.POST, "/api/users").hasAuthority(Constants.authority_MANAGER)
                        .requestMatchers(HttpMethod.PUT, "/api/users").hasAuthority(Constants.authority_MANAGER)
                        .requestMatchers(HttpMethod.PUT, "/api/users/{userId}").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.DELETE, "/api/users/{userId}").hasAuthority(Constants.authority_ADMIN)

                        .requestMatchers(HttpMethod.GET, "/api/courses").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses/{courseId}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/courses").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.PUT, "/api/courses/{courseId}").hasAuthority(Constants.authority_USER) // Ensure this line allows PUT requests for courses
                        .requestMatchers(HttpMethod.DELETE, "/api/courses/{courseId}").hasAuthority(Constants.authority_USER)

                        .requestMatchers(HttpMethod.PUT, "/api/courses/{courseId}/updateText").hasAuthority(Constants.authority_USER)



                        .requestMatchers(HttpMethod.POST, "/api/courses/{courseId}/lessons").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.GET, "/api/courses/{courseId}/lessons").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.PUT, "/api/courses/{courseId}/lessons/{lessonId}").hasAuthority(Constants.authority_USER) // Ensure this line allows PUT requests for lessons
                        .requestMatchers(HttpMethod.DELETE, "/api/courses/{courseId}/lessons/{lessonId}").hasAuthority(Constants.authority_USER)


                        .requestMatchers(HttpMethod.PUT, "/api/user/{userId}/learnedLessons/{lessonId}").hasAuthority(Constants.authority_USER) // Ensure this line allows PUT requests for lessons
                        .requestMatchers(HttpMethod.DELETE, "/api/user/{userId}/learnedLessons/{lessonId}").hasAuthority(Constants.authority_USER)

                        .requestMatchers(HttpMethod.POST, "/api/user/{userId}/cart/{courseId}").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.DELETE, "/api/user/{userId}/cart/{courseId}").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.POST, "/api/user/{userId}/purchase").hasAuthority(Constants.authority_USER)
                        .requestMatchers(HttpMethod.POST, "/api/user/{userId}/purchaseSpecific").hasAuthority(Constants.authority_USER)

                        .requestMatchers(HttpMethod.GET, "/api/tags").permitAll()

                )

                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(Constants.url_frontend));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Ensure PUT is allowed

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
