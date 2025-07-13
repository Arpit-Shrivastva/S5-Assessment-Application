package com.example.S5_App.Exception;

import java.time.LocalDateTime;

import lombok.Data;


@Data
public class MyErrorClass {
    private LocalDateTime dateTime;
    private String msg;
    private String des;

}
