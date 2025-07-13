package com.example.S5_App.Services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.S5_App.Model.Users;
import com.example.S5_App.Repository.UserRepository;


@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       
         Optional<Users> user = userRepository.findByEmail(username);

        if (user.isEmpty()) {

            System.out.println("User Not Find...");
            throw new UsernameNotFoundException("User Not Found...");

        }
        
        Users user1 = user.get();
        return new User(user1.getEmail(),user1.getPassword(), authorityGeneration(user1.getRole()));

    }

    private Collection<? extends GrantedAuthority> authorityGeneration(String role) {
        List<GrantedAuthority>gAutho = new ArrayList<>();
        SimpleGrantedAuthority sGrAutho = new SimpleGrantedAuthority(role);
        gAutho.add(sGrAutho);
        return gAutho;
    }


}
