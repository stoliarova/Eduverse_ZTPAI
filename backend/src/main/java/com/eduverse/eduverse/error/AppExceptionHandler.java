package com.eduverse.eduverse.error;

import com.eduverse.eduverse.error.exception.UserNotFoundException;
import com.eduverse.eduverse.error.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex){

        var error = new ErrorResponse();

        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        error.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(Exception ex){

        var errorResponse = new ErrorResponse();

        errorResponse.setStatus(444);
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTimeStamp(System.currentTimeMillis());
        errorResponse.setException(ex.getClass().getName());
//        errorResponse.setError(ex.getCause().);

        return new ResponseEntity<>(errorResponse, HttpStatus.SEE_OTHER);
    }
}
