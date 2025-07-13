package com.example.S5_App.Services;

import com.example.S5_App.Model.Audit;
import com.example.S5_App.Repository.AuditRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AuditServiceImpl implements AuditService{

    private final AuditRepository auditRepository;

    public AuditServiceImpl(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }


    @Override
    public Audit createAudit(Audit audit) {
        audit.setDate(new Date());
        return auditRepository.save(audit);
    }


    @Override
    public void deleteAudit(String id) {
        if (!auditRepository.existsById(id)) {
            throw new RuntimeException("Audit with ID " + id + " not found");
        }
        auditRepository.deleteById(id);
    }

    @Override
    public Audit getAuditById(String id) {
        return auditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Audit with ID " + id + " not found"));
    }

    @Override
    public List<Audit> getAllAudits() {
        return auditRepository.findAll();
    }

    @Override
    public List<Audit> getAuditsByStatus(String status) {
        return auditRepository.findByStatus(status);
    }

    @Override
    public List<Audit> getAuditsByLocation(String location) {
        return auditRepository.findByLocation(location);
    }

//    @Override
//    public List<Audit> searchAuditByName(String name) {
//        return auditRepository.findByAuditNameContainingIgnoreCase(name);
//    }

    @Override
    public List<Audit> getAuditsBetweenDates(Date start, Date end) {
        return auditRepository.findByDateBetween(start, end);
    }
}
