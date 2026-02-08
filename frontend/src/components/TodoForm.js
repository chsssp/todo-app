import React, { useState, useEffect } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, editingTodo, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: editingTodo ? editingTodo.completed : false
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Todo title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          maxLength="100"
        />
      </div>
      
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
          maxLength="500"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </button>
        {editingTodo && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
