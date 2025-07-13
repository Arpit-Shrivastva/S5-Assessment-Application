package com.example.S5_App.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "ASSESSMENT")
public class Assesment {

    @Id
    private String stageName;

    private int complianceRate;

    private int compliantPercentage;
    private int partiallyCompliantPercentage;
    private int nonCompliantPercentage;

}
