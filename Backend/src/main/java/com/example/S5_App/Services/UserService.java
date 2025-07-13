package com.example.S5_App.Services;

import java.util.List;

import com.example.S5_App.Exception.ApplicationException;
import com.example.S5_App.Model.Users;

public interface UserService {

    Users saveUser(Users user) throws ApplicationException;

    List<Users> getAllUser();

    Users getUserByName(String email) throws ApplicationException;

    Users updateUser(Users user, String email) throws ApplicationException;

    boolean deleteAccount(String email) throws ApplicationException;

    String login(Users users) throws ApplicationException;

    Users getUserByEmail(String email) throws ApplicationException;

    Users forgotPassword(Users user, String email) throws ApplicationException;


}
