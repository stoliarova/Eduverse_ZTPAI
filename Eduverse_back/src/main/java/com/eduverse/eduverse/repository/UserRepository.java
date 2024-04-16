package com.eduverse.eduverse.repository;

import com.eduverse.eduverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
