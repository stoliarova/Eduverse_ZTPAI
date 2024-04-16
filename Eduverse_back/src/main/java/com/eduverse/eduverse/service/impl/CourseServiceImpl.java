package com.eduverse.eduverse.service.impl;

import com.eduverse.eduverse.dto.CourseDto;
import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.mapper.CourseMapper;
import com.eduverse.eduverse.repository.CourseRepository;
import com.eduverse.eduverse.service.CourseService;
import lombok.AllArgsConstructor;
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
}
