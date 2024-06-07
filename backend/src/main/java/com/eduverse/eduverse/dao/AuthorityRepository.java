package com.eduverse.eduverse.dao;

import com.eduverse.eduverse.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "roles")
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
}
