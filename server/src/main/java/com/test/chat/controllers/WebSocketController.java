package com.test.chat.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import com.test.chat.models.Chat;
import com.test.chat.models.User;
import com.test.chat.dto.TextMessageDTO;
import com.test.chat.repository.ChatRepository;
import com.test.chat.repository.UserRepository;
import com.test.chat.utils.JwtTokenUtil;

@Component
@Controller
public class WebSocketController extends TextWebSocketHandler {
	private List<WebSocketSession> sessions = new ArrayList<>();

	@Autowired
	private ChatRepository chatRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException, Exception {
		String payload = message.getPayload();

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(payload);

		String type = jsonNode.get("type").asText();
		String data = jsonNode.get("data").asText();
		String token = jsonNode.get("token").asText();

		Boolean isTokenExpired = jwtTokenUtil.getIsTokenExpired(token);

		if (isTokenExpired) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Failed to persist user");
		}

		User user = jwtTokenUtil.getProfileFromToken(token);
		User existUser = userRepository.findByUsername(user.getUsername()).get();

		Chat newChat = chatRepository.save(new Chat(data, existUser));
		for (WebSocketSession s : sessions) {
			if (s.isOpen()) {
				s.sendMessage(new TextMessage(new TextMessageDTO("message", newChat).stringifyInstance()));
			}
		}
	}
}
