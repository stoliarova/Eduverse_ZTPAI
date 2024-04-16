package com.eduverse.eduverse.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "price")
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long priceId;

    @Column()
    private Double amount;

    @Column()
    private String currency;

    private Double discount;
    @Column(name = "discountValidUntil", columnDefinition = "DATE")
    private java.sql.Date discountValidUntil;

    private Boolean isFree;

}
