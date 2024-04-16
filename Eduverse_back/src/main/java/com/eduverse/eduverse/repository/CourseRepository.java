package com.eduverse.eduverse.repository;

import com.eduverse.eduverse.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course,Long> {
}
