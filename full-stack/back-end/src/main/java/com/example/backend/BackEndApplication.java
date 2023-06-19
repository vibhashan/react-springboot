package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(BackEndApplication.class, args);

		} catch (Exception e) {
			System.out.println("Error : " + e.getMessage());
		}
	}

}
