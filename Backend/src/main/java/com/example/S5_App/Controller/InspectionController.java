package com.example.S5_App.Controller;

import com.example.S5_App.Model.InspectionSheet;
import com.example.S5_App.Services.InspectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inspection")
public class InspectionController {

    @Autowired
    private InspectionService service;

    @PostMapping
    public InspectionSheet save(@RequestBody InspectionSheet sheet) {
        return service.save(sheet);
    }

    @GetMapping
    public List<InspectionSheet> getAll() {
        return service.getAll();
    }


    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        service.deleteById(id);
    }


    @GetMapping("/auditor/{name}")
    public List<InspectionSheet> getByAuditor(@PathVariable("name") String auditedBy) {
        return service.getByAuditor(auditedBy);
    }
}
