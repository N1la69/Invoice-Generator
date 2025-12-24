package com.nilanjan.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nilanjan.backend.entity.User;
import com.nilanjan.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class ClerkWebhookController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    private final UserService userService;

    @PostMapping(value = "/clerk", consumes = "application/json")
    public ResponseEntity<?> handleClerkWebhook(@RequestHeader("svix-id") String svixId, 
                                                @RequestHeader("svix-timestamp") String svixTimestamp,
                                                @RequestHeader("svix-signature") String svixSignature,
                                                @RequestBody String payload ){
        try {
            verifyWebhookSignature(svixId, svixTimestamp, svixSignature, payload);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(payload);

            String eventType = rootNode.path("type").asString();

            switch (eventType) {
                case "user.created":
                    handleUserCreated(rootNode.path("data"));
                    break;
                case "user.updated":
                    handleUserUpdated(rootNode.path("data"));
                    break;
                case "user.deleted":
                    handleUserDeleted(rootNode.path("data"));
                    break;
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }
    }

    private void handleUserCreated(JsonNode data) {
        User newUser =User.builder()
            .clerkId(data.path("id").asString())
            .email(data.path("email_addresses").path(0).path("email_address").asString())
            .firstName(data.path("first_name").asString())
            .lastName(data.path("last_name").asString())
            .build();

        userService.saveOrUpdateUser(newUser);
    }

    private void handleUserUpdated(JsonNode data) {
        String clerkId = data.path("id").asString();
        User existingUser = userService.getAccountByClerkId(clerkId);

        existingUser.setEmail(data.path("email_addresses").path(0).path("email_address").asString());
        existingUser.setFirstName(data.path("first_name").asString());
        existingUser.setLastName(data.path("last_name").asString());
        existingUser.setPhotoUrl(data.path("image_url").asString());

        userService.saveOrUpdateUser(existingUser);
    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId = data.path("id").asString();
        userService.deleteAccount(clerkId);
    }

    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        return true;
    }
}
