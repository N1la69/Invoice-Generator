package com.nilanjan.backend.service;

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
}
