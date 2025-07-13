package com.example.S5_App.Services;

import com.example.S5_App.Model.FiveSAssessment;
import com.example.S5_App.Repository.SAssessmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SAssessmentServiceImpl implements SAssessmentService{


    private final SAssessmentRepository assessmentRepository;

    public SAssessmentServiceImpl(SAssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }


    @Override
    public FiveSAssessment createAssessment(FiveSAssessment assessment) {
        assessment.setDate(new Date());
        return assessmentRepository.save(assessment);
    }

    @Override
    public List<FiveSAssessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    @Override
    public FiveSAssessment getAssessmentById(String id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found with ID: " + id));
    }

    @Override
    public List<FiveSAssessment> getAssessmentsByAuditor(String auditor) {
        return assessmentRepository.findByAuditor(auditor);
    }

    @Override
    public List<FiveSAssessment> getAssessmentsByScope(String scope) {
        return assessmentRepository.findByScope(scope);
    }

    @Override
    public List<FiveSAssessment> getAssessmentsByDate(Date date) {
        return assessmentRepository.findByDate(date);
    }


    @Override
    public void deleteAssessment(String id) {
        if (!assessmentRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete — assessment not found with ID: " + id);
        }
        assessmentRepository.deleteById(id);
    }



}
