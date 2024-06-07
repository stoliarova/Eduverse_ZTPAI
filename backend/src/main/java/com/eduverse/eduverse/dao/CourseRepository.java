package com.eduverse.eduverse.dao;

import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
}
