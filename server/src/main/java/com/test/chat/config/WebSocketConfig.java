package com.test.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import com.test.chat.controllers.WebSocketController;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer  {

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(webSocketCustomHandler(), "/chat").setAllowedOrigins("*");
  }

  @Bean
  public WebSocketHandler webSocketCustomHandler() {
    return new WebSocketController();
  }

}