package com.nilanjan.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.nilanjan.backend.entity.Invoice; 

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    
}
