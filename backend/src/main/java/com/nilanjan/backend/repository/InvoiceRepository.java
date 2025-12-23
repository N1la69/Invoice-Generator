package com.nilanjan.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nilanjan.backend.entity.Invoice;
import java.util.List;
import java.util.Optional;
 

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    List<Invoice> findByClerkId(String clerkId);

    Optional<Invoice> findByClerkIdAndId(String clerkId, String id);
}
