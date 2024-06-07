package com.eduverse.eduverse.service;

import com.eduverse.eduverse.entity.User;

import java.util.List;

public interface UserService {

    User save(User pUser);

    User findById(int pId);

    List<User> findBy(String pFieldName, Object pFieldValue);

    List<User> findAll();

    User updateOrSave(User pUser);

    void deleteById(int pId);

    int deleteBy(String pFieldName, Object pFieldValue);

    int deleteAll();

    void addCourseToCart(int userId, int courseId);

    void removeCourseFromCart(int userId, int courseId);

    void purchaseCoursesFromCart(int userId);

    void purchaseSpecificCoursesFromCart(int userId, List<Integer> courseIds);


    List<User> findByRole(String roleName);
}
