package com.example.S5_App.Services;

import com.example.S5_App.Model.FiveSAssessment;

import java.util.Date;
import java.util.List;

public interface SAssessmentService {

    // Create a new assessment
    FiveSAssessment createAssessment(FiveSAssessment assessment);

    // Get all assessments
    List<FiveSAssessment> getAllAssessments();

    // Get assessment by ID
    FiveSAssessment getAssessmentById(String id);

    // Get assessments by auditor
    List<FiveSAssessment> getAssessmentsByAuditor(String auditor);

    // Get assessments by scope
    List<FiveSAssessment> getAssessmentsByScope(String scope);

    // Get assessments by date
    List<FiveSAssessment> getAssessmentsByDate(Date date);

    // Delete by ID
    void deleteAssessment(String id);

}
