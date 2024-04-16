package com.eduverse.eduverse.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.awt.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "lesson")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonId;

    @Column(nullable = false)
    private Integer lessonNumber;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 5000)
    private String contentTypes;  // Could be JSON or delimited string if multiple content types are used

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;
}
