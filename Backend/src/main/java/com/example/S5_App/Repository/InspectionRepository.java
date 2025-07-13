package com.example.S5_App.Repository;

import com.example.S5_App.Model.InspectionSheet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionRepository extends MongoRepository<InspectionSheet, String> {
    List<InspectionSheet> findByAuditedBy(String auditedBy);
}
