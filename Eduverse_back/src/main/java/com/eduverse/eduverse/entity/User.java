package com.eduverse.eduverse.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name= "username")
    private String username;

    @Column(name= "email")
    private String email;

    @Column(name= "password")
    private String password;

    @Column(name= "is_author")
    private Boolean isAuthor;
}
