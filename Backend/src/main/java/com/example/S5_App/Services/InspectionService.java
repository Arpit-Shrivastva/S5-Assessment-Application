package com.example.S5_App.Services;

import com.example.S5_App.Model.InspectionSheet;

import java.util.List;

public interface InspectionService {

    InspectionSheet save(InspectionSheet sheet);

    List<InspectionSheet> getAll();

    InspectionSheet getById(String id);

    void deleteById(String id);

    // ✅ New method to get by auditor name
    List<InspectionSheet> getByAuditor(String auditedBy);

}
