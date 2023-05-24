package com.test.chat.controllers;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.test.chat.models.Chat;
import com.test.chat.models.User;
import com.test.chat.repository.ChatRepository;
import com.test.chat.dto.UserDTO;
import com.test.chat.dto.ChatDTO;

@CrossOrigin
@RestController
class ChatController {
	private final ChatRepository repository;

	ChatController(ChatRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/chats")
	List<ChatDTO> all() {
		List<Chat> chats = repository.findAll();
		List<ChatDTO> chatDTOs = new ArrayList<>();
		for (Chat chat : chats) {
			User user = chat.getUser();
			chatDTOs.add(
				new ChatDTO(
					chat.getId(),
					chat.getContent(),
					new UserDTO(
						user.getId(),
						user.getUsername(),
						user.getName()
					),
					chat.getDate()
				)
			);
		}
		return chatDTOs;
	}

	@PostMapping("/chats")
	Chat newChat(@RequestBody Chat newChat) {
		return repository.save(newChat);
	}
}
