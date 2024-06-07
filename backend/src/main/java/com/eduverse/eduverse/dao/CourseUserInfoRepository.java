package com.eduverse.eduverse.dao;

import com.eduverse.eduverse.entity.CourseUserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseUserInfoRepository extends JpaRepository<CourseUserInfo, Integer> {
}
