import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/todos';

const todoService = {
  // Get all todos
  getAllTodos: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Get todo by id
  getTodoById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todo) => {
    const response = await axios.post(API_BASE_URL, todo);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id, todo) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, todo);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  // Toggle completion status
  toggleComplete: async (id) => {
    const response = await axios.patch(`${API_BASE_URL}/${id}/toggle`);
    return response.data;
  },

  // Get completed todos
  getCompletedTodos: async () => {
    const response = await axios.get(`${API_BASE_URL}/completed`);
    return response.data;
  },

  // Get incomplete todos
  getIncompleteTodos: async () => {
    const response = await axios.get(`${API_BASE_URL}/incomplete`);
    return response.data;
  }
};

export default todoService;
