package com.nilanjan.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nilanjan.backend.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByClerkId(String clerkId);
    boolean existsByClerkId(String clerkId);
}
