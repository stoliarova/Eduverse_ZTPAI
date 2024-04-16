package com.eduverse.eduverse.repository;

import com.eduverse.eduverse.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
