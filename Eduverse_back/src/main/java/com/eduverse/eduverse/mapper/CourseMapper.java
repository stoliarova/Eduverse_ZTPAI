package com.eduverse.eduverse.mapper;

import com.eduverse.eduverse.dto.CourseDto;
import com.eduverse.eduverse.entity.Course;

public class CourseMapper {


    public static CourseDto mapToCourseDto(Course course){
        return new CourseDto(
                course.getCourseId(),
                course.getName(),
                course.getDescription(),
                course.getPrice(),
                //course.getPhoto(),
                course.getRating(),
                course.getDuration(),
                course.getLessonNumber(),
                course.getQuizzesNumber(),
                course.getCertificate(),
                course.getAccess(),
                course.getLanguages(),
                course.getCategories()

        );
    }

    public static Course mapToCourse(CourseDto courseDto){
        return new Course(
                courseDto.getCourseId(),
                courseDto.getName(),
                courseDto.getDescription(),
                courseDto.getPrice(),
                //courseDto.getPhoto(),
                courseDto.getRating(),
                courseDto.getDuration(),
                courseDto.getLessonNumber(),
                courseDto.getQuizzesNumber(),
                courseDto.getCertificate(),
                courseDto.getAccess(),
                courseDto.getLanguages(),
                courseDto.getCategories()

        );
    }
}
