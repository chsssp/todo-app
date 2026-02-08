import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoService from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
      alert('Failed to load todos. Make sure the backend is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateTodo = async (todoData) => {
    try {
      if (editingTodo) {
        // Update existing todo
        const updated = await todoService.updateTodo(editingTodo.id, todoData);
        setTodos(todos.map(t => t.id === editingTodo.id ? updated : t));
        setEditingTodo(null);
      } else {
        // Add new todo
        const newTodo = await todoService.createTodo(todoData);
        setTodos([...todos, newTodo]);
      }
    } catch (error) {
      console.error('Error saving todo:', error);
      alert('Failed to save todo');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const updated = await todoService.toggleComplete(id);
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todoService.deleteTodo(id);
        setTodos(todos.filter(t => t.id !== id));
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo');
      }
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 My Todo App</h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <TodoForm
          onSubmit={handleAddOrUpdateTodo}
          editingTodo={editingTodo}
          onCancel={handleCancelEdit}
        />

        <div className="filter-section">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({activeCount})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
}

export default App;
