package com.eduverse.eduverse.controller;

import com.eduverse.eduverse.dao.AuthorityRepository;
import com.eduverse.eduverse.entity.Authority;
import com.eduverse.eduverse.entity.User;
import com.eduverse.eduverse.error.exception.UserNotFoundException;
import com.eduverse.eduverse.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public  UserController(UserService pUserService, AuthorityRepository pAuthorityRepository){
        userService = pUserService;
        authorityRepository = pAuthorityRepository;
    }

    @PostConstruct
    public  void initialize(){
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.findAll();
    }

    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable int userId){

        User result = userService.findById(userId);

        if (result == null)
        {
            throw new UserNotFoundException(userId);
        }

        return result;
    }


    @PostMapping("/users")
    private User addUser(@RequestBody User pUser) {
        // set User ID to 0 just in case it was passed in request, so that it does not break auto ID assignment in DB

        var allAuthorities = authorityRepository.findAll();
        var authorityMap = allAuthorities.stream()
                .collect(Collectors.toMap(Authority::getName, authority -> authority));

        Set<Authority> newAuthorities = new HashSet<>();

        pUser.getAuthorities().forEach(authority -> {
            if (authorityMap.containsKey(authority.getName())) {
                newAuthorities.add(authorityMap.get(authority.getName()));
            } else {
                throw new RuntimeException("Authority not found: " + authority.getName());
            }
        });

        pUser.setAuthorities(newAuthorities);

        User dbUser = userService.updateOrSave(pUser);

        return dbUser;
    }


    @PutMapping("/users/{userId}")
    public User updateUser(@PathVariable int userId, @RequestBody User pUser) {
        return updateUser(pUser);
    }


//    @CrossOrigin
@PutMapping("/users")
public User updateUser(@RequestBody User pUser) {

    var dbUsers = userService.findBy("username", pUser.getUsername());

    if (dbUsers.isEmpty()) {
        throw new UserNotFoundException("username", pUser.getUsername());
    }

    var dbUser = dbUsers.get(0);

    dbUser.setUsername(pUser.getUsername());
    dbUser.setPassword(pUser.getPassword());
    dbUser.setProvider(pUser.getProvider());

    dbUser.setFirstName(pUser.getFirstName());
    dbUser.setLastName(pUser.getLastName());
    dbUser.setAbout(pUser.getAbout());
    dbUser.setEmail(pUser.getEmail());

    dbUser.setNotes(pUser.getNotes());

    dbUser.setEnabled(pUser.getEnabled());
    dbUser.setAccountNonExpired(pUser.getAccountNonExpired());
    dbUser.setAccountNonLocked(pUser.getAccountNonLocked());
    dbUser.setCredentialsNonExpired(pUser.getCredentialsNonExpired());

    var allAuthorities = authorityRepository.findAll();
    var authorityMap = allAuthorities.stream()
            .collect(Collectors.toMap(Authority::getName, authority -> authority));

    Set<Authority> newAuthorities = new HashSet<>();

    pUser.getAuthorities().forEach(authority -> {
        if (authorityMap.containsKey(authority.getName())) {
            newAuthorities.add(authorityMap.get(authority.getName()));
        } else {
            throw new RuntimeException("Authority not found: " + authority.getName());
        }
    });

    dbUser.setAuthorities(newAuthorities);

    dbUser = userService.updateOrSave(dbUser);
    return dbUser;
}



    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable int userId){
        User dbUser = userService.findById(userId);

        if (dbUser == null){
            throw new UserNotFoundException(userId);
        }

        userService.deleteById(userId);

        return "Deleted user with ID: " + userId;
    }
}
