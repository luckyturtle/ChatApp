package com.test.chat.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.test.chat.models.User;
import com.test.chat.repository.UserRepository;

@CrossOrigin
@RestController
class UserController {
	private final UserRepository repository;

	UserController(UserRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/users")
	List<User> all() {
		return repository.findAll();
	}

	@PostMapping("/users")
	User newUser(@RequestBody User newUser) {
		return repository.save(newUser);
	}
}
