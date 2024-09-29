package com.example.demo.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {

    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter = 0;
    static {
        todos.add(new Todo(++idCounter, "suhail akhtar", "Learn to code good", new Date(), false));
        todos.add(new Todo(++idCounter, "Hello there", "Revise more about microservices", new Date(), false));
        todos.add(new Todo(++idCounter, "Oi Let us come", "Visit India", new Date(), false));
    }
    public List<Todo> findAll(){
        return todos;
    }

}
