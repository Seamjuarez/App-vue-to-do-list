<template>
  <div id="app">
    <div class="container">
      <header class="app-header">
        <h1>📝 Mi Lista de Tareas</h1>
        <p class="subtitle">Gestiona tus tareas de forma eficiente</p>
      </header>

      <main class="app-main">
        <!-- Mensaje de error -->
        <div v-if="error" class="error-message">
          <p>❌ {{ error }}</p>
          <button @click="retryConnection" class="retry-btn">
            🔄 Reintentar conexión
          </button>
        </div>

        <!-- Estado de conexión -->
        <div class="connection-status" :class="{ offline: !isOnline }">
          <span v-if="isOnline">🟢 Conectado a la API</span>
          <span v-else>🔴 Sin conexión a la API</span>
        </div>

        <!-- Formulario para agregar tareas -->
        <TodoForm @add-todo="addTodo" />

        <!-- Lista de tareas -->
        <TodoList
          :todos="todos"
          :loading="loading"
          @toggle-todo="toggleTodo"
          @delete-todo="deleteTodo"
          @update-todo="updateTodo"
          @clear-completed="clearCompleted"
        />
      </main>

      <footer class="app-footer">
        <p>
          💡 Tip: Haz doble clic en una tarea para editarla
        </p>
        <p class="credits">
          Desarrollado con Vue.js y json-server
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { todoService } from './services/todoService'

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoList
  },
  data() {
    return {
      todos: [],
      loading: false,
      error: null,
      isOnline: true
    }
  },
  async created() {
    await this.loadTodos()
    this.checkConnection()
  },
  methods: {
    async loadTodos() {
      this.loading = true
      this.error = null
      try {
        this.todos = await todoService.getAllTodos()
        this.isOnline = true
      } catch (error) {
        this.error = 'No se pudo conectar con el servidor. Asegúrate de que json-server esté ejecutándose.'
        this.isOnline = false
        console.error('Error loading todos:', error)
      } finally {
        this.loading = false
      }
    },

    async addTodo(text) {
      try {
        const newTodo = await todoService.createTodo({ text })
        this.todos.push(newTodo)
        this.error = null
        this.isOnline = true
      } catch (error) {
        this.error = 'Error al agregar la tarea'
        this.isOnline = false
        throw error
      }
    },

    async toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (!todo) return

      try {
        const updatedTodo = await todoService.toggleTodo(id, !todo.completed)
        const index = this.todos.findIndex(t => t.id === id)
        this.todos[index] = updatedTodo
        this.error = null
        this.isOnline = true
      } catch (error) {
        this.error = 'Error al actualizar la tarea'
        this.isOnline = false
        console.error('Error toggling todo:', error)
      }
    },

    async deleteTodo(id) {
      try {
        await todoService.deleteTodo(id)
        this.todos = this.todos.filter(t => t.id !== id)
        this.error = null
        this.isOnline = true
      } catch (error) {
        this.error = 'Error al eliminar la tarea'
        this.isOnline = false
        console.error('Error deleting todo:', error)
      }
    },

    async updateTodo(id, updates) {
      try {
        const updatedTodo = await todoService.updateTodo(id, updates)
        const index = this.todos.findIndex(t => t.id === id)
        this.todos[index] = updatedTodo
        this.error = null
        this.isOnline = true
      } catch (error) {
        this.error = 'Error al actualizar la tarea'
        this.isOnline = false
        console.error('Error updating todo:', error)
      }
    },

    async clearCompleted() {
      const completedTodos = this.todos.filter(t => t.completed)
      
      try {
        // Eliminar todas las tareas completadas
        await Promise.all(
          completedTodos.map(todo => todoService.deleteTodo(todo.id))
        )
        
        // Actualizar la lista local
        this.todos = this.todos.filter(t => !t.completed)
        this.error = null
        this.isOnline = true
      } catch (error) {
        this.error = 'Error al eliminar tareas completadas'
        this.isOnline = false
        console.error('Error clearing completed todos:', error)
      }
    },

    async retryConnection() {
      await this.loadTodos()
    },

    checkConnection() {
      // Verificar conexión cada 30 segundos
      setInterval(async () => {
        try {
          await todoService.getAllTodos()
          this.isOnline = true
          if (this.error && this.error.includes('servidor')) {
            this.error = null
          }
        } catch (error) {
          this.isOnline = false
        }
      }, 30000)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  text-align: center;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.app-main {
  padding: 40px;
}

.connection-status {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.connection-status.offline {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  text-align: center;
}

.error-message p {
  margin-bottom: 12px;
}

.retry-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background-color: #c82333;
}

.app-footer {
  background-color: #f8f9fa;
  padding: 20px 40px;
  text-align: center;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 14px;
}

.app-footer p {
  margin-bottom: 8px;
}

.credits {
  font-size: 12px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  .container {
    border-radius: 8px;
  }
  
  .app-header {
    padding: 30px 20px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .app-main {
    padding: 20px;
  }
  
  .app-footer {
    padding: 15px 20px;
  }
}

@media (max-width: 480px) {
  .app-header h1 {
    font-size: 1.8rem;
  }
  
  .connection-status {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>