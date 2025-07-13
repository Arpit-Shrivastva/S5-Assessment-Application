package com.example.S5_App.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.S5_App.Exception.ApplicationException;
import com.example.S5_App.Model.Users;
import com.example.S5_App.Services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    // Register new user
    @PostMapping("/register")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) throws ApplicationException {
        Users savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Login
    @PostMapping("/logIn")
    public ResponseEntity<Map<String, String>> login(@RequestBody Users user) throws ApplicationException {
        String token = userService.login(user);
        Users loggedInUser = userService.getUserByEmail(user.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", loggedInUser.getRole());
        response.put("name", loggedInUser.getName());
        return ResponseEntity.ok(response);
    }

    // ✅ ADMIN only: Get all users
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    // ✅ ADMIN & SHIFT_IN_CHARGE can fetch user
    @GetMapping("/{email}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE')")
    public ResponseEntity<Users> getUserByEmail(@PathVariable String email) throws ApplicationException {
        Users user = userService.getUserByName(email);
        return ResponseEntity.ok(user);
    }

    // ✅ ADMIN & SHIFT_IN_CHARGE can update user
    @PutMapping("/{email}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SHIFT_IN_CHARGE')")
    public ResponseEntity<Users> updateUser(@PathVariable String email, @RequestBody Users updatedUser) throws ApplicationException {
        Users user = userService.updateUser(updatedUser, email);
        return ResponseEntity.ok(user);
    }


    // ✅ ADMIN only: Delete user
    @DeleteMapping("/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable String email) throws ApplicationException {
        boolean deleted = userService.deleteAccount(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", deleted ? "User deleted successfully" : "User deletion failed");
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/password/{email}")
    public ResponseEntity<Users> updatePassword(@PathVariable String email, @RequestBody Users users) throws ApplicationException {
        Users updatedUser = userService.forgotPassword(users, email);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

}
