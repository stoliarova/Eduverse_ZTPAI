package com.eduverse.eduverse.service.impl;

import com.eduverse.eduverse.dto.CourseDto;
import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.exception.ResourceNotFoundException;
import com.eduverse.eduverse.mapper.CourseMapper;
import com.eduverse.eduverse.repository.CourseRepository;
import com.eduverse.eduverse.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private CourseRepository courseRepository;

    @Override
    public CourseDto createCourse(CourseDto courseDto) {

        Course course = CourseMapper.mapToCourse(courseDto);
        Course savedCourse = courseRepository.save(course);

        return CourseMapper.mapToCourseDto(savedCourse);
    }

    @Override
    public CourseDto getCourseById(Long courseId) {

        Course course =
        courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course is not exist with a given ID: " +courseId));

        return CourseMapper.mapToCourseDto(course);
    }
}
