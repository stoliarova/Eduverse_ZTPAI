package com.eduverse.eduverse.dao;

import com.eduverse.eduverse.entity.CourseTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseTagRepository extends JpaRepository<CourseTag, Integer> {
}
