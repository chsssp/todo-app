import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit, searchTerm }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>
          {searchTerm 
            ? `No todos found matching "${searchTerm}"`
            : 'No todos yet. Start by adding one above!'}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-count">
        Showing {todos.length} {todos.length === 1 ? 'todo' : 'todos'}
      </div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
