<template>
  <div class="todo-list">
    <div class="list-header">
      <h3>
        {{ filteredTodos.length }} 
        {{ filteredTodos.length === 1 ? 'tarea' : 'tareas' }}
        <span v-if="filter !== 'all'">
          {{ filter === 'active' ? 'pendientes' : 'completadas' }}
        </span>
      </h3>
      <div class="filters">
        <button
          @click="setFilter('all')"
          :class="{ active: filter === 'all' }"
          class="filter-btn"
        >
          Todas ({{ todos.length }})
        </button>
        <button
          @click="setFilter('active')"
          :class="{ active: filter === 'active' }"
          class="filter-btn"
        >
          Pendientes ({{ activeTodos }})
        </button>
        <button
          @click="setFilter('completed')"
          :class="{ active: filter === 'completed' }"
          class="filter-btn"
        >
          Completadas ({{ completedTodos }})
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>⏳ Cargando tareas...</p>
    </div>

    <div v-else-if="filteredTodos.length === 0" class="empty-state">
      <p v-if="todos.length === 0">
        📝 No hay tareas aún. ¡Agrega tu primera tarea!
      </p>
      <p v-else>
        🎯 No hay tareas {{ filter === 'active' ? 'pendientes' : 'completadas' }}
      </p>
    </div>

    <ul v-else class="todos">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
        @update="updateTodo"
      />
    </ul>

    <div v-if="completedTodos > 0" class="list-actions">
      <button @click="clearCompleted" class="clear-btn">
        🗑️ Eliminar completadas ({{ completedTodos }})
      </button>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-todo', 'delete-todo', 'update-todo', 'clear-completed'],
  data() {
    return {
      filter: 'all'
    }
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.completed)
        case 'completed':
          return this.todos.filter(todo => todo.completed)
        default:
          return this.todos
      }
    },
    activeTodos() {
      return this.todos.filter(todo => !todo.completed).length
    },
    completedTodos() {
      return this.todos.filter(todo => todo.completed).length
    }
  },
  methods: {
    setFilter(filter) {
      this.filter = filter
    },
    toggleTodo(id) {
      this.$emit('toggle-todo', id)
    },
    deleteTodo(id) {
      this.$emit('delete-todo', id)
    },
    updateTodo(id, updates) {
      this.$emit('update-todo', id, updates)
    },
    clearCompleted() {
      if (confirm(`¿Eliminar ${this.completedTodos} tareas completadas?`)) {
        this.$emit('clear-completed')
      }
    }
  }
}
</script>

<style scoped>
.todo-list {
  width: 100%;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e9ecef;
}

.list-header h3 {
  margin: 0;
  color: #495057;
  font-size: 18px;
}

.filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: #f8f9fa;
}

.filter-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 16px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.todos {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-actions {
  margin-top: 20px;
  text-align: center;
}

.clear-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.clear-btn:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .filters {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .filter-btn {
    font-size: 12px;
    padding: 4px 8px;
  }
}
</style>