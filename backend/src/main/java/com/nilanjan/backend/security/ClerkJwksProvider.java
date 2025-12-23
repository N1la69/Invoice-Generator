package com.nilanjan.backend.security;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.math.BigInteger;
import java.net.URI;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;

@Component
public class ClerkJwksProvider {
    
    @Value("${clerk.jwks-url}")
    private String jwksUrl;

    private final Map<String, PublicKey> keyCache = new HashMap<>();
    private long lastFetchedTime = 0;
    private static final long CACHE_TTL = 1 * 60 * 60 * 1000; // 1 hour

    public PublicKey getPublicKey(String kid) throws Exception{
        if(keyCache.containsKey(kid) && System.currentTimeMillis() - lastFetchedTime < CACHE_TTL){
            return keyCache.get(kid);
        }

        refreshKeys();

        return keyCache.get(kid);
    }

    private void refreshKeys() throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        URI uri = URI.create(jwksUrl);
        JsonNode jwks;

        try (InputStream is = uri.toURL().openStream()) {
            jwks = mapper.readTree(is);
        }

        JsonNode keys = jwks.path("keys");
        for (JsonNode keyNode : keys) {
            String kid = keyNode.path("kid").asText();
            String kty = keyNode.path("kty").asText();
            String alg = keyNode.path("alg").asText();

            if ("RSA".equals(kty) && "RS256".equals(alg)) {
                String n = keyNode.path("n").asText();
                String e = keyNode.path("e").asText();

                if (kid != null && n != null && e != null) {
                    PublicKey publicKey = createPublicKey(n, e);
                    keyCache.put(kid, publicKey);
                }
            }
        }

        lastFetchedTime = System.currentTimeMillis();
    }

    private PublicKey createPublicKey(String n, String e) throws Exception {
        byte[] modulusBytes = Base64.getUrlDecoder().decode(n);
        byte[] exponentBytes = Base64.getUrlDecoder().decode(e);

        BigInteger modulusBigInt = new BigInteger(1, modulusBytes);
        BigInteger exponentBigInt = new BigInteger(1, exponentBytes);

        RSAPublicKeySpec spec = new RSAPublicKeySpec(modulusBigInt, exponentBigInt);
        KeyFactory factory = KeyFactory.getInstance("RSA");
        return factory.generatePublic(spec);
    }
}
