package com.todoapp.repository;

import com.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // Find all completed todos
    List<Todo> findByCompleted(boolean completed);
    
    // Find todos by title containing (case-insensitive)
    List<Todo> findByTitleContainingIgnoreCase(String title);
}
