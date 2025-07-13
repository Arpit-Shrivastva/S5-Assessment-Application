package com.example.S5_App.Repository;

import com.example.S5_App.Model.FiveSAssessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SAssessmentRepository extends MongoRepository<FiveSAssessment, String> {

    List<FiveSAssessment> findByAuditor(String auditor);

    List<FiveSAssessment> findByScope(String scope);

    List<FiveSAssessment> findByDate(Date date);

}
