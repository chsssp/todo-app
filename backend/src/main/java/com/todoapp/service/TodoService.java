package com.todoapp.service;

import com.todoapp.model.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        todo.setPriority(todoDetails.getPriority());
        todo.setCategory(todoDetails.getCategory());
        todo.setDueDate(todoDetails.getDueDate());
        
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
    
    // SEARCH: Find todos by title
    public List<Todo> searchTodosByTitle(String searchTerm) {
        return todoRepository.findByTitleContainingIgnoreCase(searchTerm);
    }
    
    // Get todos by category
    public List<Todo> getTodosByCategory(String category) {
        return todoRepository.findByCategory(category);
    }
    
    // Get todos by priority
    public List<Todo> getTodosByPriority(Todo.Priority priority) {
        return todoRepository.findByPriority(priority);
    }
    
    // Get overdue todos
    public List<Todo> getOverdueTodos() {
        return todoRepository.findByDueDateBeforeAndCompletedFalse(LocalDate.now());
    }
    
    // Get all unique categories
    public List<String> getAllCategories() {
        return todoRepository.findAll().stream()
                .map(Todo::getCategory)
                .filter(category -> category != null && !category.isEmpty())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
