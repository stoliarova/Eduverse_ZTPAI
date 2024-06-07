package com.eduverse.eduverse.service;

import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.entity.Lesson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseService {
    Course save(Course course);
    Course findById(int courseId);
    List<Course> findAll();
    void deleteById(int courseId);
    Lesson addLessonToCourse(int courseId, Lesson lesson);
    List<Lesson> findLessonsByCourseId(int courseId);
    Lesson updateLessonInCourse(int courseId, Lesson lesson);
    void deleteLessonFromCourse(int courseId, int lessonId);
}