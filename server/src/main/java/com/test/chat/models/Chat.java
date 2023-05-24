package com.test.chat.models;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(
	name = "chats"
)
public class Chat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 1000)
	private String content;

	private Date date;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnoreProperties("chats")
	private User user;

	public Chat() {
	}

	public Chat(String content, User user, Date date) {
		this.date = date;
		this.content = content;
		this.user = user;
	}

	public Chat(String content, User user) {
		this.date = new Date();
		this.content = content;
		this.user = user;
	}

	public String stringifyInstance() throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(this);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date user) {
		this.date = date;
	}
}
