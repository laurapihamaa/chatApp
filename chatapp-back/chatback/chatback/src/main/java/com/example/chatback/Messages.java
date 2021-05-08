package com.example.chatback;

import java.util.ArrayList;

public class Messages {
	
	ArrayList<String> messages = new ArrayList<>();
	
	Messages(){
		
	}
	
	void setMessage(String message) {
		if(messages.size()>10) {
			messages.remove(messages.size()-1);
		}
		messages.add(message);
	}
	
	String getMessages(int i) {
		return messages.get(i);
	}
	
	ArrayList<String> getAllMessages(){
		return messages;
	}

}
