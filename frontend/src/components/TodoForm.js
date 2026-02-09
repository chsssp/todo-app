import React, { useState, useEffect } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, editingTodo, onCancel, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority || 'MEDIUM');
      setCategory(editingTodo.category || '');
      setDueDate(editingTodo.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setCategory('');
      setDueDate('');
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
      priority: priority,
      category: category.trim(),
      dueDate: dueDate || null,
      completed: editingTodo ? editingTodo.completed : false
    });

    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setCategory('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <div className="form-group flex-2">
          <input
            type="text"
            placeholder="Todo title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            maxLength="100"
          />
        </div>
        
        <div className="form-group flex-1">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="LOW">🟢 Low Priority</option>
            <option value="MEDIUM">🟡 Medium Priority</option>
            <option value="HIGH">🔴 High Priority</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group flex-1">
          <input
            type="text"
            placeholder="Category (e.g., Work, Personal)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
            list="category-suggestions"
            maxLength="50"
          />
          <datalist id="category-suggestions">
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} />
            ))}
          </datalist>
        </div>
        
        <div className="form-group flex-1">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
            placeholder="Due date"
          />
        </div>
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
          {editingTodo ? '✏️ Update Todo' : '➕ Add Todo'}
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
