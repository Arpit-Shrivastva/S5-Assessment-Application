package com.example.S5_App.Services;

import com.example.S5_App.Model.Audit;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

public interface AuditService {


    Audit createAudit(Audit audit);

    void deleteAudit(String id);

    Audit getAuditById(String id);

    List<Audit> getAllAudits();

    List<Audit> getAuditsByStatus(String status);

    List<Audit> getAuditsByLocation(String location);

//    List<Audit> searchAuditByName(String name);

    List<Audit> getAuditsBetweenDates(Date start, Date end);
}
