package com.example.chatback;

import java.util.ArrayList;
import java.util.HashMap;

public class Users {
	
	HashMap<String, String> users = new HashMap<>();
	
	Users(){}
	
	public HashMap<String, String> getUsers() {
		return users;
	}
	
	public void setUsers(String i, String j) {
		users.put(i, j);
	}
	
	public String getUser(String i) {
		return users.get(i);
	}
	
	public void removeUsers (String i) {
		users.remove(i);
	}

}
