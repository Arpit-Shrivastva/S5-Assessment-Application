package com.example.S5_App.Repository;


import com.example.S5_App.Model.Audit;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AuditRepository extends MongoRepository<Audit, String> {

    List<Audit> findByStatus(String status);

    List<Audit> findByLocation(String location);

//    List<Audit> findByAuditNameContainingIgnoreCase(String keyword);

    List<Audit> findByDateBetween(Date startDate, Date endDate);
}
