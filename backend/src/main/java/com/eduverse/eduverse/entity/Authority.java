package com.eduverse.eduverse.entity;

import com.eduverse.eduverse.Constants;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = Constants.table_authority)
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "name", unique = true)
    private  String name;

    public Authority(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return getName();
    }
}
