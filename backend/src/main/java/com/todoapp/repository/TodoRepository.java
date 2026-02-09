package com.todoapp.repository;

import com.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // Find all completed todos
    List<Todo> findByCompleted(boolean completed);
    
    // Find todos by title containing (case-insensitive) - FOR SEARCH
    List<Todo> findByTitleContainingIgnoreCase(String title);
    
    // Find todos by category
    List<Todo> findByCategory(String category);
    
    // Find todos by priority
    List<Todo> findByPriority(Todo.Priority priority);
    
    // Find overdue todos
    List<Todo> findByDueDateBeforeAndCompletedFalse(LocalDate date);
    
    // Find all distinct categories
    
}
