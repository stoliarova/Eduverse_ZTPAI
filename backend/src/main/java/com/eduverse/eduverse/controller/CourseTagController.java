package com.eduverse.eduverse.controller;

import com.eduverse.eduverse.entity.CourseTag;
import com.eduverse.eduverse.service.CourseTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseTagController {

    private final CourseTagService courseTagService;

    @Autowired
    public CourseTagController(CourseTagService courseTagService) {
        this.courseTagService = courseTagService;
    }

    @GetMapping("/tags")
    public List<CourseTag> getAllTags() {
        return courseTagService.getAllTags();
    }
}
