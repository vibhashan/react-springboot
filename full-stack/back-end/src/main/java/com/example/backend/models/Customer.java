package com.example.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("customers")
public class Customer {
    private int customerID;
    private String name;
    private int age;

    public Customer(int customerID, String name, int age) {
        this.customerID = customerID;
        this.name = name;
        this.age = age;
    }

    public int getCustomerID() {
        return this.customerID;
    }

    public int getAge() {
        return this.age;
    }

    public String getName() {
        return this.name;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
