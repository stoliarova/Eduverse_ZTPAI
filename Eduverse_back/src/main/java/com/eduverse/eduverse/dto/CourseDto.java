package com.eduverse.eduverse.dto;

import com.eduverse.eduverse.entity.Category;
import com.eduverse.eduverse.entity.Language;
import com.eduverse.eduverse.entity.Price;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long courseId;
    private String name;
    private String description;
    private Price price;
    //private Image photo;
    private Double rating;
    private Integer duration;
    private Integer lessonNumber;
    private Integer quizzesNumber;
    private Boolean certificate;
    private String access;
    private Set<Language> languages;
    private Set<Category> categories;
}
