package com.example.S5_App.Services;

import com.example.S5_App.Model.InspectionSheet;
import com.example.S5_App.Repository.InspectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class InspectionServiceImpl implements InspectionService{

    @Autowired
    private InspectionRepository repository;

    @Override
    public InspectionSheet save(InspectionSheet sheet) {
        return repository.save(sheet);
    }

    @Override
    public List<InspectionSheet> getAll() {
        return repository.findAll();
    }

    @Override
    public InspectionSheet getById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

    // ✅ Implementation of new method
    @Override
    public List<InspectionSheet> getByAuditor(String auditedBy) {
        return repository.findByAuditedBy(auditedBy);
    }
}
