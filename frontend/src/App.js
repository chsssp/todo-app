import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchBar from './components/SearchBar';
import todoService from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Save dark mode preference and apply to body
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
    loadCategories();
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

  const loadCategories = async () => {
    try {
      const cats = await todoService.getAllCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleAddOrUpdateTodo = async (todoData) => {
    try {
      if (editingTodo) {
        const updated = await todoService.updateTodo(editingTodo.id, todoData);
        setTodos(todos.map(t => t.id === editingTodo.id ? updated : t));
        setEditingTodo(null);
      } else {
        const newTodo = await todoService.createTodo(todoData);
        setTodos([...todos, newTodo]);
      }
      loadCategories(); // Refresh categories
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
        loadCategories(); // Refresh categories
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter todos based on all filters
  const getFilteredTodos = () => {
    let filtered = [...todos];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(t => t.priority === priorityFilter);
    }

    // Sort: High priority first, then by due date, then by creation date
    filtered.sort((a, b) => {
      const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;
  const overdueCount = todos.filter(t => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>Todo Manager</h1>
              <p className="subtitle">Stay organized with priority, categories & due dates</p>
            </div>
            <button onClick={toggleDarkMode} className="theme-toggle" title="Toggle theme">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        <TodoForm
          onSubmit={handleAddOrUpdateTodo}
          editingTodo={editingTodo}
          onCancel={handleCancelEdit}
          categories={categories}
        />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="filters-section">
          <div className="filter-group">
            <label>Status:</label>
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
              {overdueCount > 0 && (
                <button className="filter-btn overdue-badge-btn">
                  🔴 Overdue ({overdueCount})
                </button>
              )}
            </div>
          </div>

          <div className="filter-group">
            <label>Priority:</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${priorityFilter === 'all' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${priorityFilter === 'HIGH' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('HIGH')}
              >
                🔴 High
              </button>
              <button
                className={`filter-btn ${priorityFilter === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('MEDIUM')}
              >
                🟡 Medium
              </button>
              <button
                className={`filter-btn ${priorityFilter === 'LOW' ? 'active' : ''}`}
                onClick={() => setPriorityFilter('LOW')}
              >
                🟢 Low
              </button>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="filter-group">
              <label>Category:</label>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('all')}
                >
                  All
                </button>
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    🏷️ {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
