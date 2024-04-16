package com.eduverse.eduverse.controller;

import com.eduverse.eduverse.dto.CourseDto;
import com.eduverse.eduverse.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private CourseService courseService;

    //Build Add Course REST API
    @PostMapping
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto courseDto){
        CourseDto savedCourse = courseService.createCourse(courseDto);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }
}
