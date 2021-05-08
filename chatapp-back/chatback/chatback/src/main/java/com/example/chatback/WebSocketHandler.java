package com.example.chatback;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.ArrayList;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

	@Component
	@Slf4j
	public class WebSocketHandler extends TextWebSocketHandler {
		
		private ArrayList<WebSocketSession> connections = new ArrayList<>();
		private Messages messages = new Messages();
		private Users users = new Users();
		
		@Override
		public void afterConnectionEstablished (WebSocketSession s) {
			System.out.println("user connected");
			if(!(users.getUsers().containsKey(s.getId()))) {
			connections.add(s);
			ArrayList<String> mes = messages.getAllMessages();
			for (int i=0; i<mes.size(); i++) {
				try {
					s.sendMessage(new TextMessage(mes.get(i)));
				} catch (IOException e) {
					e.printStackTrace();
				}}}
			
		}

	
		@Override
		public void afterConnectionClosed (WebSocketSession session, CloseStatus c) {
			
			String sendMessage = "\"exit" + users.getUser(session.getId()) + "\"";
			
			TextMessage m = new TextMessage(sendMessage.getBytes());
			System.out.println(sendMessage);
			for(WebSocketSession cs:connections) {
				if(cs.getId()!=session.getId()) {
				try {
					cs.sendMessage(m);
				} catch(Exception ex) {
					ex.printStackTrace();
				}
			}
		}
			
			connections.remove(session);
			users.removeUsers(session.getId());
			System.out.println("user disconnected");
		}
		
		@Override
		public void handleTextMessage(WebSocketSession s, TextMessage m) {
			
			messages.setMessage(m.getPayload());
			
			if(m.getPayload().contains("new user:")) {
				users.setUsers(s.getId(), m.getPayload().substring(9).replace('"', ' ').strip());
				for(WebSocketSession c:connections) {
					if(c.getId()!=s.getId()) {
					try {
						c.sendMessage(m);
					} catch(Exception ex) {
						ex.printStackTrace();
					}
				}
			}
			}else {
			for(WebSocketSession c:connections) {
				if(c.getId()!=s.getId()) {
				try {
					c.sendMessage(m);
				} catch(Exception ex) {
					ex.printStackTrace();
				}
			}}
			System.out.println(m.toString());
		}}
	
	}
	