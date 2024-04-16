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

    @Column()
    private Integer lessonNumber;

    @Column()
    private String title;

    @Column()
    private String contentTypes;

    @ManyToOne()
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;
}
