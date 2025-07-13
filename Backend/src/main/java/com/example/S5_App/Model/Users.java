package com.example.S5_App.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection = "users")
public class Users {

    @Id
    private ObjectId id;

    private String name;
    private String email;
    private String password;
    private String role;
    
}
