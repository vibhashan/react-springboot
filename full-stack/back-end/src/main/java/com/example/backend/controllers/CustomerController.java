package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Customer;
import com.example.backend.models.Login;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private MongoTemplate mt;

    private static Query query;

    @GetMapping("/")
    public String getAllCustomers() {
        return "Hello Spring Boot";

    }

    // Login functionality
    @PostMapping("/api/v1/login")
    public String login(@RequestBody Login login) {
        // Verify the credentials
        if (login.username().equals("admin") && login.pwd().equals("admin")) {
            return "Login successful";
        } else {
            return "Login unsuccessful";
        }
    }

    @GetMapping("/api/v1/customers/{id}")
    public Customer getCustomer(@PathVariable int id) {

        query = new Query().addCriteria(Criteria.where("customerID").is(id));

        Customer customer = mt.findOne(query, Customer.class);

        return customer;
    }

    @GetMapping("/api/v1/customers")
    public List<Customer> getCustomers() {
        return mt.findAll(Customer.class);
    }

    @PostMapping("/api/v1/customers")
    public String addCustomer(@RequestBody Customer customer) {

        Customer newCustomer = mt.save(customer);

        if (newCustomer != null) {
            return "Added successfully";
        } else {
            return "Failed to add customer";
        }

    }

    @PutMapping("/api/v1/customers/{id}")
    public String updateCustomer(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        query = new Query().addCriteria(Criteria.where("customerID").is(id));

        Customer customer = mt.findOne(query, Customer.class);

        if (customer != null) {
            Update update = new Update();
            update.set("name", updatedCustomer.getName());
            update.set("age", updatedCustomer.getAge());

            UpdateResult us = mt.updateFirst(query, update, Customer.class);

            if (us != null) {
                return "Successfully updated customer";
            } else {
                return "Failed to update customer";
            }

        } else {
            return "Failed to find customer";
        }
    }

    @DeleteMapping("/api/v1/customers/{id}")
    public String deleteCustomer(@PathVariable int id) {
        query = new Query().addCriteria(Criteria.where("customerID").is(id));

        DeleteResult ds = mt.remove(query, Customer.class);

        if (ds != null) {
            return "Deleted successfully";
        } else {
            return "Unable to delete";
        }
    }
}
