package com.test.chat.dto;

import java.util.Date;

import com.test.chat.dto.TokenDTO;
import com.test.chat.dto.UserDTO;

public class ChatDTO {
	private Long id;
	private UserDTO user;
	private String content;
	private Date date;

	public ChatDTO(Long id, String content, UserDTO user, Date date) {
		this.id = id;
		this.content = content;
		this.user = user;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
