package com.nilanjan.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nilanjan.backend.entity.User;
import com.nilanjan.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public User createOrUpdateUser(@RequestBody User user, Authentication authentication){
        try {
            if(!authentication.getName().equals(user.getClerkId())){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to perform this action");
            }
            return userService.saveOrUpdateUser(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
