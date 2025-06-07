import axios from 'axios'

const API_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const todoService = {
  // Obtener todas las tareas
  async getAllTodos() {
    try {
      const response = await api.get('/todos')
      return response.data
    } catch (error) {
      console.error('Error fetching todos:', error)
      throw error
    }
  },

  // Crear nueva tarea
  async createTodo(todo) {
    try {
      const newTodo = {
        ...todo,
        id: Date.now(), // Generamos un ID único
        completed: false,
        createdAt: new Date().toISOString()
      }
      const response = await api.post('/todos', newTodo)
      return response.data
    } catch (error) {
      console.error('Error creating todo:', error)
      throw error
    }
  },

  // Actualizar tarea
  async updateTodo(id, updates) {
    try {
      const response = await api.patch(`/todos/${id}`, updates)
      return response.data
    } catch (error) {
      console.error('Error updating todo:', error)
      throw error
    }
  },

  // Eliminar tarea
  async deleteTodo(id) {
    try {
      await api.delete(`/todos/${id}`)
      return id
    } catch (error) {
      console.error('Error deleting todo:', error)
      throw error
    }
  },

  // Marcar tarea como completada/incompleta
  async toggleTodo(id, completed) {
    try {
      const response = await api.patch(`/todos/${id}`, { completed })
      return response.data
    } catch (error) {
      console.error('Error toggling todo:', error)
      throw error
    }
  }
}