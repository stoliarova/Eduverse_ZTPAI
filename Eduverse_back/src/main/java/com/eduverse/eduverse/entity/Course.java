package com.eduverse.eduverse.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(name = "name",nullable = false, length = 255)
    private String name;

    @Column(name = "description",nullable = false)
    private String description;

    @ManyToOne()
    @JoinColumn(name = "priceId")
    private Price price;

    //@Column(name = "image",nullable = false)
    //private Image photo;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "lessonnumber")
    private Integer lessonNumber;

    @Column(name= "quizzesnumber")
    private Integer quizzesNumber;

    @Column(name= "certificate")
    private Boolean certificate;

    @Column(name = "access")
    private String access;

    @ManyToMany()
    @JoinTable(
            name = "course_languages",
            joinColumns = @JoinColumn(name = "courseId"),
            inverseJoinColumns = @JoinColumn(name = "languageId")
    )
    private Set<Language> languages;

    @ManyToMany()
    @JoinTable(
            name = "course_categories",
            joinColumns = @JoinColumn(name = "courseId"),
            inverseJoinColumns = @JoinColumn(name = "categoryId")
    )
    private Set<Category> categories;


}
