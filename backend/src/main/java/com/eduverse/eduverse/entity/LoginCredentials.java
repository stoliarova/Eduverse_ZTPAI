package com.eduverse.eduverse.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LoginCredentials {
    private String email;
    private String password;
}
