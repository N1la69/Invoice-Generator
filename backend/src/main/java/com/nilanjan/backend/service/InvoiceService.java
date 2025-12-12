package com.nilanjan.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nilanjan.backend.entity.Invoice;
import com.nilanjan.backend.repository.InvoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> fetchInvoices(){
        return invoiceRepository.findAll();
    }
}
