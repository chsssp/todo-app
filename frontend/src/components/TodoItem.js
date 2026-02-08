import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
