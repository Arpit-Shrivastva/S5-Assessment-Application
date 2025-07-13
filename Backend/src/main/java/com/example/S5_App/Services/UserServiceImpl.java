package com.example.S5_App.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.S5_App.Config.JwtService;
import com.example.S5_App.Exception.ApplicationException;
import com.example.S5_App.Model.Users;
import com.example.S5_App.Repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @Override
    public Users saveUser(Users user) throws ApplicationException {

        Optional<Users> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            throw new ApplicationException("User already exists with this email");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole("ROLE_OPERATOR");
        } else {
            String role = user.getRole().trim().toUpperCase();
            if (!role.startsWith("ROLE_")) {
                role = "ROLE_" + role;
            }
            user.setRole(role);
        }

        return userRepository.save(user);
    }

    @Override
    public List<Users> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Users getUserByName(String email) throws ApplicationException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new ApplicationException("User not found with this email");
        }
        return optionalUser.get();
    }

    @Override
    public Users updateUser(Users user, String email) throws ApplicationException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new ApplicationException("User not found for update");
        }

        Users existingUser = optionalUser.get();
        existingUser.setName(user.getName());
        existingUser.setRole(user.getRole());
        return userRepository.save(existingUser);
    }


    @Override
    public boolean deleteAccount(String email) throws ApplicationException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new ApplicationException("User not found for deletion");
        }

        userRepository.delete(optionalUser.get());
        return true;
    }

    @Override
    public String login(Users users) throws ApplicationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(users.getEmail(), users.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new ApplicationException("Invalid credentials");
        }

        Optional<Users> userOptional = userRepository.findByEmail(users.getEmail());
        if (userOptional.isEmpty()) {
            throw new ApplicationException("User not found during login");
        }

        Users user = userOptional.get();
        return jwtService.generateToken(user.getEmail());
    }

    @Override
    public Users getUserByEmail(String email) throws ApplicationException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new ApplicationException("User not found with email: " + email);
        }
    }

    @Override
    public Users forgotPassword(Users user, String email) throws ApplicationException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new ApplicationException("User not found for password update");
        }

        Users existingUser = optionalUser.get();
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(existingUser);
    }

}
