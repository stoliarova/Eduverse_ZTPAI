package com.eduverse.eduverse.service;

import com.eduverse.eduverse.dao.CourseTagRepository;
import com.eduverse.eduverse.dao.CourseUserInfoRepository;
import com.eduverse.eduverse.entity.CourseTag;
import com.eduverse.eduverse.entity.CourseTagType;
import com.eduverse.eduverse.entity.CourseUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseUserInfoService {

    private final CourseUserInfoRepository courseUserInfoRepository;

    @Autowired
    public CourseUserInfoService(CourseUserInfoRepository courseUserInfoRepository) {
        this.courseUserInfoRepository = courseUserInfoRepository;
    }

    public List<CourseUserInfo> getAllCourseUserInfo() {
        return courseUserInfoRepository.findAll();
    }

    public CourseUserInfo save(CourseUserInfo courseUserInfo) {
        return courseUserInfoRepository.save(courseUserInfo);
    }
}
