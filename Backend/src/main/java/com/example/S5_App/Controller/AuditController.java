package com.example.S5_App.Controller;


import com.example.S5_App.Model.Audit;
import com.example.S5_App.Services.AuditService;
import org.bson.types.ObjectId;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/audit")
public class AuditController {

    private final AuditService auditService;

    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE')")
    public ResponseEntity<Audit> createAudit(@RequestBody Audit audit) {
        return ResponseEntity.ok(auditService.createAudit(audit));
    }

    // ✅ All roles can view
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<List<Audit>> getAllAudits() {
        return ResponseEntity.ok(auditService.getAllAudits());
    }

    // ✅ All roles can view by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<Audit> getAuditById(@PathVariable("id") String id) {
        return ResponseEntity.ok(auditService.getAuditById(id));
    }


    // ✅ Only ADMIN can delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAudit(@PathVariable("id") String id) {
        auditService.deleteAudit(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ All roles can filter by status
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<List<Audit>> getAuditsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(auditService.getAuditsByStatus(status));
    }

    // ✅ All roles can filter by location
    @GetMapping("/location/{location}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public ResponseEntity<List<Audit>> getAuditsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(auditService.getAuditsByLocation(location));
    }

    // ✅ All roles can filter by date range
    @GetMapping("/date-range")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE', 'OPERATOR')")
    public List<Audit> getAuditsByDateRange(
            @RequestParam String start,
            @RequestParam String end) {

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = sdf.parse(start);
            Date endDate = sdf.parse(end);

            return auditService.getAuditsBetweenDates(startDate, endDate);

        } catch (ParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid date format. Expected yyyy-MM-dd");
        }
    }


}
