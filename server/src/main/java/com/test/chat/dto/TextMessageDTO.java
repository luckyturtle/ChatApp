package com.test.chat.dto;

import com.test.chat.models.Chat;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TextMessageDTO {
	private Chat message;
	private String type;
	private ObjectMapper objectMapper = new ObjectMapper();

	public TextMessageDTO(String type, Chat message) {
		this.message = message;
		this.type = type;
	}

	public Chat getMessage() {
		return message;
	}

	public void setMessage(Chat message) {
		this.message = message;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String stringifyInstance() throws Exception {
		return objectMapper.writeValueAsString(this);
	}
}
