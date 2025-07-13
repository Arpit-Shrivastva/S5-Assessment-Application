package com.example.S5_App.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Data
@Document
public class InspectionSheet {

    @Id
    private String id;
    private String zone;
    private String zoneLeader;
    private Date auditDate;
    private String auditedBy;
    private List<InspectionItem> entries;
    private float totalScore;

}
