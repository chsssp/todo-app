import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#ff4757';
      case 'MEDIUM': return '#ffa502';
      case 'LOW': return '#26de81';
      default: return '#ffa502';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'HIGH': return '🔴';
      case 'MEDIUM': return '🟡';
      case 'LOW': return '🟢';
      default: return '🟡';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    
    const isOverdue = dueDate < today && !todo.completed;
    const isToday = dueDate.getTime() === today.getTime();
    
    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isOverdue,
      isToday
    };
  };

  const dueDateInfo = formatDate(todo.dueDate);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${dueDateInfo?.isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        <div className="todo-text">
          <div className="todo-header">
            <h3 className="todo-title">{todo.title}</h3>
            <div className="todo-badges">
              <span 
                className="priority-badge" 
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                {getPriorityIcon(todo.priority)} {todo.priority}
              </span>
              {todo.category && (
                <span className="category-badge">
                  🏷️ {todo.category}
                </span>
              )}
              {dueDateInfo && (
                <span className={`due-date-badge ${dueDateInfo.isOverdue ? 'overdue' : ''} ${dueDateInfo.isToday ? 'today' : ''}`}>
                  📅 {dueDateInfo.text}
                </span>
              )}
            </div>
          </div>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
        </div>
      </div>
      
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="btn-edit">
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
