package com.gaurav.dao;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaurav.model.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
