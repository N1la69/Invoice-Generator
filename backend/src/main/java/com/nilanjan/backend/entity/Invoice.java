package com.nilanjan.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import java.time.Instant;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "invoices")
public class Invoice {

    @Id
    private String id;

    private Company company;
    private Billing billing;
    private Shipping shipping;
    private InvoiceDetails invoice;
    private List<Item> items;
    private String notes;
    private String logo;
    private double tax;
    private String thumbnailUrl;
    private String template;
    private String title;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedBy
    private Instant lastUpdatedAt;

    @Data
    public static class Company{
        private String name;
        private String address;
        private String phone;
    }

    @Data
    public static class Billing{
        private String name;
        private String address;
        private String phone;
    }

    @Data
    public static class Shipping{
        private String name;
        private String address;
        private String phone;
    }

    @Data
    public static class InvoiceDetails{
        private String number;
        private String date;
        private String dueDate;
    }

    @Data
    public static class Item{
        private String name;
        private int quantity;
        private double amount;
        private String description;
    }
}
