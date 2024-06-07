package com.eduverse.eduverse.controller;

import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.entity.Lesson;
import com.eduverse.eduverse.entity.User;
import com.eduverse.eduverse.service.CourseService;
import com.eduverse.eduverse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;

    @Autowired
    public CourseController(CourseService courseService, UserService userService) {
        this.courseService = courseService;
        this.userService = userService;
    }

    // CRUD Courses
    @PostMapping("/courses")
    public Course addCourse(@RequestBody Course course) {
        var dbCourse = courseService.save(course);

        var creator = userService.findById(course.getCreators().get(0).getUserId());
        creator.getCreatedCourses().add(dbCourse);
        userService.save(creator);

        return dbCourse;
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return courseService.findAll();
    }

    @GetMapping("/courses/{courseId}")
    public Course getCourse(@PathVariable int courseId) {
        return courseService.findById(courseId);
    }

    @PutMapping("/courses/{courseId}")
    public Course updateCourse(@PathVariable int courseId, @RequestBody Course course) {

        var dbCourse = courseService.findById(course.getId());

        course.setLessons(dbCourse.getLessons());
        return courseService.save(course);
    }

    @DeleteMapping("/courses/{courseId}")
    public String deleteCourse(@PathVariable int courseId) {
        courseService.deleteById(courseId);
        return "Deleted course with ID: " + courseId;
    }

    // CRUD Lessons from Course
    @PostMapping("/courses/{courseId}/lessons")
    public Lesson addLessonToCourse(@PathVariable int courseId, @RequestBody Lesson lesson) {
        return courseService.addLessonToCourse(courseId, lesson);
    }

    @GetMapping("/courses/{courseId}/lessons")
    public List<Lesson> getLessonsFromCourse(@PathVariable int courseId) {
        return courseService.findLessonsByCourseId(courseId);
    }

    @PutMapping("/courses/{courseId}/lessons/{lessonId}")
    public Lesson updateLessonInCourse(@PathVariable int courseId, @PathVariable int lessonId, @RequestBody Lesson lesson) {
        return courseService.updateLessonInCourse(courseId, lesson);
    }

    @DeleteMapping("/courses/{courseId}/lessons/{lessonId}")
    public String deleteLessonFromCourse(@PathVariable int courseId, @PathVariable int lessonId) {
        courseService.deleteLessonFromCourse(courseId, lessonId);
        return "Deleted lesson with ID: " + lessonId;
    }

    // Add course to user cart
    @PostMapping("/user/{userId}/cart/{courseId}")
    public String addCourseToCart(@PathVariable int userId, @PathVariable int courseId) {
        userService.addCourseToCart(userId, courseId);
        return "Added course with ID: " + courseId + " to user cart with ID: " + userId;
    }

    // Remove course from user cart
    @DeleteMapping("/user/{userId}/cart/{courseId}")
    public String removeCourseFromCart(@PathVariable int userId, @PathVariable int courseId) {
        userService.removeCourseFromCart(userId, courseId);
        return "Removed course with ID: " + courseId + " from user cart with ID: " + userId;
    }

    // Purchase courses from user cart
    @PostMapping("/user/{userId}/purchase")
    public String purchaseCoursesFromCart(@PathVariable int userId) {
        userService.purchaseCoursesFromCart(userId);
        return "Purchased courses from cart for user ID: " + userId;
    }

    @PostMapping("/user/{userId}/purchaseSpecific")
    public String purchaseSpecificCourses(@PathVariable int userId, @RequestBody List<Integer> courseIds) {
        userService.purchaseSpecificCoursesFromCart(userId, courseIds);
        return "Purchased selected courses from cart for user ID: " + userId;
    }

    @PutMapping("/user/{userId}/learnedLessons/{lessonId}")
    public User addLearnedLesson(@PathVariable int userId, @PathVariable int lessonId) {
        User user = userService.findById(userId);
        user.getLearnedLessons().add(lessonId);
        return userService.save(user);
    }

    @DeleteMapping("/user/{userId}/learnedLessons/{lessonId}")
    public User removeLearnedLesson(@PathVariable int userId, @PathVariable int lessonId) {
        User user = userService.findById(userId);
        user.getLearnedLessons().remove(lessonId);
        return userService.save(user);
    }
}
