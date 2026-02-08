import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit, filter }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {filter === 'active' && 'No active todos. Time to add some!'}
          {filter === 'completed' && 'No completed todos yet.'}
          {filter === 'all' && 'No todos yet. Start by adding one above!'}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTodos.map(todo => (
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
