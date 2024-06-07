package com.eduverse.eduverse.service;

import com.eduverse.eduverse.dao.CourseRepository;
import com.eduverse.eduverse.dao.LessonRepository;
import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.entity.Lesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    @Autowired
    public CourseServiceImpl(CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course findById(int courseId) {
        return courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
    }

    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public void deleteById(int courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public Lesson addLessonToCourse(int courseId, Lesson lesson) {
        Course course = findById(courseId);
        lesson.setCourse(course);
        return lessonRepository.save(lesson);
    }

    @Override
    public List<Lesson> findLessonsByCourseId(int courseId) {
        return lessonRepository.findByCourseId(courseId);
    }

    @Override
    public Lesson updateLessonInCourse(int courseId, Lesson lesson) {
        Course course = findById(courseId);
        lesson.setCourse(course);
        return lessonRepository.save(lesson);
    }

    @Override
    public void deleteLessonFromCourse(int courseId, int lessonId) {
        lessonRepository.deleteById(lessonId);
    }
}