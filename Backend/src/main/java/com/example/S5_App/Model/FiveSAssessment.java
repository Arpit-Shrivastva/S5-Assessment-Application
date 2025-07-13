package com.example.S5_App.Model;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Document(collection = "fiveSAssessments")
public class FiveSAssessment {

    @Id
    private String id;

    private String scope;
    private String auditor;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date;

    private String comment;

    private List<Assesment> stages = new ArrayList<>();
}
