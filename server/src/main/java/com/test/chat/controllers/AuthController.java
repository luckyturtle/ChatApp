package com.test.chat.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import com.test.chat.repository.UserRepository;
import com.test.chat.models.User;
import com.test.chat.utils.JwtTokenUtil;
import com.test.chat.dto.TokenDTO;
import com.test.chat.dto.UserTokenDTO;

@CrossOrigin
@RestController
class AuthController {
	private final UserRepository repository;
	private final JwtTokenUtil jwtTokenUtil;

	AuthController(UserRepository repository, JwtTokenUtil jwtTokenUtil) {
		this.repository = repository;
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@PostMapping("/login")
	ResponseEntity<TokenDTO> login(@RequestBody User request) {
		String username = request.getUsername();
		Boolean isExist = repository.existsByUsername(username);
		User user;

		if (isExist) {
			user = repository.findByUsername(username).get();
		} else {
			user = repository.save(request);
		}

		String token = jwtTokenUtil.generateAccessToken(user);
		TokenDTO response = new TokenDTO(token);

		return new ResponseEntity(response, HttpStatus.OK);
	}

	@GetMapping("/whoami")
	ResponseEntity<UserTokenDTO> whoami(@RequestHeader("Authorization") String authorization) {
		String token = authorization.split(" ")[1];
		Boolean isTokenExpired = jwtTokenUtil.getIsTokenExpired(token);

		if (isTokenExpired) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Failed to persist user");
		}

		User user = jwtTokenUtil.getProfileFromToken(token);
		String newToken = jwtTokenUtil.generateAccessToken(user);
		UserTokenDTO response = new UserTokenDTO(user, newToken);

		return new ResponseEntity(response, HttpStatus.OK);
	}
}
