package com.eduverse.eduverse.service;

import com.eduverse.eduverse.dao.CourseTagRepository;
import com.eduverse.eduverse.entity.CourseTag;
import com.eduverse.eduverse.entity.CourseTagType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseTagService {

    private final CourseTagRepository courseTagRepository;

    @Autowired
    public CourseTagService(CourseTagRepository courseTagRepository) {
        this.courseTagRepository = courseTagRepository;
    }

    public List<CourseTag> getAllTags() {
        return courseTagRepository.findAll();
    }

    public CourseTag save(CourseTag courseTag) {
        return courseTagRepository.save(courseTag);
    }

    public List<CourseTag> getTagsByType(CourseTagType type) {
        return courseTagRepository.findAll().stream()
                .filter(tag -> tag.getType() == type)
                .collect(Collectors.toList());
    }
}
