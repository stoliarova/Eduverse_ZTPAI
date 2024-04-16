package com.eduverse.eduverse.controller;

import com.eduverse.eduverse.dto.CourseDto;
import com.eduverse.eduverse.exception.ResourceNotFoundException;
import com.eduverse.eduverse.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
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

    //Build Get Course REST API
    @GetMapping({"/{courseId}"})
    public ResponseEntity<CourseDto> getCourseById(@PathVariable("courseId") Long courseId){
        CourseDto courseDto=courseService.getCourseById(courseId);
        return ResponseEntity.ok(courseDto);
    }
}
