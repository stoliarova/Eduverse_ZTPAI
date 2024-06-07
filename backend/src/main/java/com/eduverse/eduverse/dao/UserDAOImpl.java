package com.eduverse.eduverse.dao;

import com.eduverse.eduverse.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO {

    private final EntityManager entityManager;

    @Autowired
    public UserDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void save(User pUser) {
        entityManager.persist(pUser);
    }

    @Override
    public User findById(int pId) {
        return entityManager.find(User.class, pId);
    }

    @Override
    public List<User> findBy(String pFieldName, Object pFieldValue) {
        var queryString = String.format("FROM %s WHERE %s=:%s", User.class.getSimpleName(), pFieldName, "valueData");

        TypedQuery<User> query = entityManager.createQuery(queryString, User.class);
        query.setParameter("valueData", pFieldValue);

        return query.getResultList();
    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> query = entityManager.createQuery("FROM " + User.class.getSimpleName(), User.class);
        return query.getResultList();
    }

    @Override
    public User update(User pUser) {
        return entityManager.merge(pUser);
    }

    @Override
    public void delete(int pId) {
        var user = entityManager.find(User.class, pId);

        if (user == null) {
            throw new RuntimeException("User not found! Id: " + pId);
        }

        entityManager.remove(user);
    }

    @Override
    public int deleteBy(String pFieldName, Object pFieldValue) {
        var queryString = String.format("DELETE FROM %s WHERE %s = :valueData", User.class.getSimpleName(), pFieldName);

        Query query = entityManager.createQuery(queryString);
        query.setParameter("valueData", pFieldValue);

        return query.executeUpdate();
    }

    @Override
    public int deleteAll() {
        return entityManager.createQuery("DELETE FROM " + User.class.getSimpleName()).executeUpdate();
    }

    @Override
    public List<User> findByRole(String roleName) {
        var queryString = String.format("SELECT u FROM User u JOIN u.authorities a WHERE a.name = :roleName");

        TypedQuery<User> query = entityManager.createQuery(queryString, User.class);
        query.setParameter("roleName", roleName);

        return query.getResultList();
    }
}
