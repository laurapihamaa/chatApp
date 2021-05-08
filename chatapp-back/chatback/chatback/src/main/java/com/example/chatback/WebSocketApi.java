package com.example.chatback;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

	@Configuration
	@EnableWebSocket
	public class WebSocketApi implements WebSocketConfigurer {
    private final WebSocketHandler webSocketHandler;

    public WebSocketApi(WebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/chat").setAllowedOrigins("*");
    }
}
