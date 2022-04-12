package com.example.application.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import com.example.application.data.entity.Company;
import com.example.application.data.entity.Contact;
import com.example.application.data.entity.Status;
import com.example.application.data.repository.CompanyRepository;
import com.example.application.data.repository.ContactRepository;
import com.example.application.data.repository.StatusRepository;


@Endpoint
@AnonymousAllowed
public class CrmEndpoint {
    private ContactRepository contactRepository;
    private CompanyRepository companyRepository;
    private StatusRepository statusRepository;

    public CrmEndpoint(ContactRepository contactRepository, CompanyRepository companyRepository, StatusRepository statusRepository) {
        this.contactRepository = contactRepository;
        this.companyRepository = companyRepository;
        this.statusRepository = statusRepository;
    }

    public static class CrmData {
        @Nonnull
        public List<@Nonnull Contact> contacts = Collections.emptyList();
        @Nonnull
        public List<@Nonnull Company> companies = Collections.emptyList();
        @Nonnull
        public List<@Nonnull Status> statuses = Collections.emptyList();
    }


    @Nonnull
    public CrmData getCrmData() {
        CrmData crmData = new CrmData();
        crmData.contacts = contactRepository.findAll();
        crmData.companies = companyRepository.findAll();
        crmData.statuses = statusRepository.findAll();
        return crmData;
    }

    @Nonnull
    public Contact saveContact(Contact contact){
        contact.setCompany(companyRepository.findById(contact.getCompany().getId()).orElseThrow(() -> new RuntimeException("Impossible de trouver l'entreprise avec l'ID " + contact.getCompany().getId())));
        contact.setStatus(statusRepository.findById(contact.getStatus().getId()).orElseThrow(() -> new RuntimeException("Impossible de trouver l'entreprise avec l'ID " + contact.getStatus().getId())));
        return contactRepository.save(contact);
    }

    public void deleteContact(UUID contactId){
        contactRepository.deleteById(contactId);
    }
}
