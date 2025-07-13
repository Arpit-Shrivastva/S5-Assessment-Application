package com.example.S5_App.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.S5_App.Model.Users;

@Repository
public interface UserRepository extends MongoRepository<Users, ObjectId>{
	
	@Query
	Optional<Users> findByEmail(String email);

}
