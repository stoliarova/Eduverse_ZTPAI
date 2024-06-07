package com.eduverse.eduverse.controller;

import com.eduverse.eduverse.dao.AuthorityRepository;
import com.eduverse.eduverse.entity.LoginAttempt;
import com.eduverse.eduverse.entity.User;
import com.eduverse.eduverse.error.exception.UserNotFoundException;
import com.eduverse.eduverse.service.JwtService;
import com.eduverse.eduverse.service.RabbitMQSender;
import com.eduverse.eduverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AuthorityRepository authorityRepository;
    private final RabbitMQSender rabbitMQSender;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = userService.updateOrSave(new User(
                request.getUsername() + "@mail.com",
                "noprovider",
                request.getUsername(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName()
        ));

        var authorityUSER = authorityRepository.getReferenceById(1);
        user.getAuthorities().add(authorityUSER);

        userService.save(user);
        var jwtToken = jwtService.generateToken(null, user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId()) // Include userId in the response
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            var authResult = authenticationManager.authenticate(authToken);

            var users = userService.findBy("username", request.getUsername());
            if (users.isEmpty()) {
                throw new UserNotFoundException("username", request.getUsername());
            }

            var user = users.getFirst();
            var jwtToken = jwtService.generateToken(null, user);

            // Send login success message to RabbitMQ
            var attempt = new LoginAttempt(null, request.getUsername(), LocalDateTime.now(), true);
            rabbitMQSender.sendLoginAttempt(attempt);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .userId(user.getId()) // Include userId in the response
                    .build();
        } catch (Exception ex) {
            // Send login failure message to RabbitMQ
            var attempt = new LoginAttempt(null, request.getUsername(), LocalDateTime.now(), false);
            rabbitMQSender.sendLoginAttempt(attempt);
            throw ex;
        }
    }
}
