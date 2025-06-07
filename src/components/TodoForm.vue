<template>
  <form @submit.prevent="addTodo" class="todo-form">
    <div class="form-group">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Escribe una nueva tarea..."
        class="todo-input"
        :disabled="loading"
        ref="todoInput"
      />
      <button
        type="submit"
        class="add-btn"
        :disabled="!newTodo.trim() || loading"
      >
        <span v-if="loading">⏳</span>
        <span v-else>➕</span>
        {{ loading ? 'Agregando...' : 'Agregar' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  emits: ['add-todo'],
  data() {
    return {
      newTodo: '',
      loading: false
    }
  },
  methods: {
    async addTodo() {
      if (!this.newTodo.trim()) return
      
      this.loading = true
      try {
        await this.$emit('add-todo', this.newTodo.trim())
        this.newTodo = ''
        this.$refs.todoInput.focus()
      } catch (error) {
        console.error('Error adding todo:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.$refs.todoInput.focus()
  }
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.todo-input:focus {
  border-color: #007bff;
}

.todo-input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.add-btn {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
}

.add-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.add-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-group {
    flex-direction: column;
  }
  
  .todo-input {
    width: 100%;
  }
  
  .add-btn {
    width: 100%;
  }
}
</style>