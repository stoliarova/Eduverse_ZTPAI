package com.eduverse.eduverse.error.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(int id) {
        super("User not found for ID: " + id);
    }

    public  UserNotFoundException(String fieldName, String fieldValue){
        super("User not found for " + fieldName + ": " + fieldValue);
    }
}
