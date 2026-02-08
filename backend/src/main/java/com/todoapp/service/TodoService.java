package com.todoapp.service;

import com.todoapp.model.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    
    // Get todo by id
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    // Create a new todo
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }
    
    // Update an existing todo
    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        
        return todoRepository.save(todo);
    }
    
    // Delete a todo
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }
    
    // Toggle completion status
    public Todo toggleComplete(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        
        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }
    
    // Get completed todos
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByCompleted(true);
    }
    
    // Get incomplete todos
    public List<Todo> getIncompleteTodos() {
        return todoRepository.findByCompleted(false);
    }
}
