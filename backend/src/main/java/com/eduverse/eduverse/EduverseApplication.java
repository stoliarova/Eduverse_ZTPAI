package com.eduverse.eduverse;

import com.eduverse.eduverse.dao.UserDAO;
import com.eduverse.eduverse.entity.User;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.security.Key;
import java.util.Base64;

@SpringBootApplication
public class EduverseApplication {

	public static void main(String[] args) {
		System.out.println("Application launched.");

//		Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//		String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
//		System.out.println(base64Key);


		SpringApplication.run(EduverseApplication.class, args);
	}

}
