package com.example.S5_App.Controller;


import com.example.S5_App.Model.FiveSAssessment;
import com.example.S5_App.Services.SAssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("assessment")
public class SAssessmentController {

    private final SAssessmentService assessmentService;

    public SAssessmentController(SAssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }


    // ✅ ADMIN + SHIFT IN CHARGE can create assessments
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE')")
    public ResponseEntity<FiveSAssessment> create(@RequestBody FiveSAssessment assessment) {
        return ResponseEntity.ok(assessmentService.createAssessment(assessment));
    }

    // ✅ All roles can view all assessments
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<List<FiveSAssessment>> getAll() {
        return ResponseEntity.ok(assessmentService.getAllAssessments());
    }

    // ✅ All roles can view by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<FiveSAssessment> getById(@PathVariable String id) {
        return ResponseEntity.ok(assessmentService.getAssessmentById(id));
    }


    // ✅ Only ADMIN can delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> delete(@PathVariable String id) {
        assessmentService.deleteAssessment(id);
        return ResponseEntity.ok("Assessment deleted successfully.");
    }

    // ✅ Optional filters
    @GetMapping("/auditor/{auditor}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<List<FiveSAssessment>> getByAuditor(@PathVariable String auditor) {
        return ResponseEntity.ok(assessmentService.getAssessmentsByAuditor(auditor));
    }

    @GetMapping("/scope/{scope}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<List<FiveSAssessment>> getByScope(@PathVariable String scope) {
        return ResponseEntity.ok(assessmentService.getAssessmentsByScope(scope));
    }
}
