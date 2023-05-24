package com.test.chat.dto;

import com.test.chat.dto.TokenDTO;
import com.test.chat.models.User;

public class UserTokenDTO extends TokenDTO {
	private User user;

	public UserTokenDTO(User user, String token) {
		super(token);
		this.user = user;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
