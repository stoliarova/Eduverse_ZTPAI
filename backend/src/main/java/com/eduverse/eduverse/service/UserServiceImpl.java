package com.eduverse.eduverse.service;

import com.eduverse.eduverse.dao.UserDAO;
import com.eduverse.eduverse.entity.Course;
import com.eduverse.eduverse.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;
    private CourseService courseService;

    @Autowired
    public UserServiceImpl(UserDAO pUserDAO, CourseService pCourseService) {
        userDAO = pUserDAO;
        this.courseService = pCourseService;
    }

    @Override
    @Transactional
    public User save(User pUser) {
        userDAO.save(pUser);
        return pUser;
    }

    @Override
    public User findById(int pId) {
        return userDAO.findById(pId);
    }

    @Override
    public List<User> findBy(String pFieldName, Object pFieldValue) {
        return userDAO.findBy(pFieldName, pFieldValue);
    }

    @Override
    public List<User> findAll() {
        return userDAO.findAll();
    }

    @Override
    @Transactional
    public User updateOrSave(User pUser) {
        return userDAO.update(pUser);
    }

    @Override
    @Transactional
    public void deleteById(int pId) {
        userDAO.delete(pId);
    }

    @Override
    @Transactional
    public int deleteBy(String pFieldName, Object pFieldValue) {
        return userDAO.deleteBy(pFieldName, pFieldValue);
    }

    @Override
    @Transactional
    public int deleteAll() {
        return userDAO.deleteAll();
    }

    @Override
    @Transactional
    public void addCourseToCart(int userId, int courseId) {
        User user = findById(userId);
        Course course = courseService.findById(courseId);
        user.getCartCourses().add(course);
        userDAO.update(user);
    }

    @Override
    @Transactional
    public void removeCourseFromCart(int userId, int courseId) {
        User user = findById(userId);
        Course course = courseService.findById(courseId);
        user.getCartCourses().remove(course);
        userDAO.update(user);
    }

    @Override
    @Transactional
    public void purchaseCoursesFromCart(int userId) {
        User user = findById(userId);
        List<Course> cartCourses = new ArrayList<>(user.getCartCourses());
        user.getCartCourses().clear();
        user.getPurchasedCourses().addAll(cartCourses);
        userDAO.update(user);
    }

    @Override
    @Transactional
    public void purchaseSpecificCoursesFromCart(int userId, List<Integer> courseIds) {
        User user = findById(userId);
        List<Course> cartCourses = user.getCartCourses();
        List<Course> purchasedCourses = new ArrayList<>();

        for (Integer courseId : courseIds) {
            for (Course course : cartCourses) {
                if (course.getId() == courseId) {
                    purchasedCourses.add(course);
                }
            }
        }

        cartCourses.removeAll(purchasedCourses);
        user.getPurchasedCourses().addAll(purchasedCourses);
        userDAO.update(user);
    }


    @Override
    public List<User> findByRole(String roleName) {
        return userDAO.findByRole(roleName);
    }
}
