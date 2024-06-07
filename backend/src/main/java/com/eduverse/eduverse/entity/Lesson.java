package com.eduverse.eduverse.entity;

import com.eduverse.eduverse.Constants;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = Constants.table_lesson)
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "index")
    private int index;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "completed")
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "course_id")
    // TODO: this fixes cross reference assertion error
    @JsonBackReference
    private Course course;

    @Override
    public String toString() {
        return "Lesson{" +
                "id=" + id +
                ", index=" + index +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
