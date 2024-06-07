package com.eduverse.eduverse.dao;

import com.eduverse.eduverse.entity.User;

import java.util.List;

public interface UserDAO {

    void save(User pUser);

    User findById(int pId);

    List<User> findBy(String pFieldName, Object pFieldValue);

    List<User> findAll();

    User update(User pUser);

    void delete(int pId);

    int deleteBy(String pFieldName, Object pFieldValue);

    int deleteAll();

    List<User> findByRole(String roleName);
}
