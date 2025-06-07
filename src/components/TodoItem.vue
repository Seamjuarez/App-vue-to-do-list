<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo"
        class="todo-checkbox"
      />
      <span
        class="todo-text"
        :class="{ 'line-through': todo.completed }"
        @dblclick="startEditing"
        v-if="!isEditing"
      >
        {{ todo.text }}
      </span>
      <input
        v-if="isEditing"
        type="text"
        v-model="editText"
        @blur="saveEdit"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
        class="edit-input"
        ref="editInput"
      />
    </div>
    <div class="todo-actions">
      <button @click="startEditing" class="edit-btn" v-if="!isEditing">
        ✏️
      </button>
      <button @click="deleteTodo" class="delete-btn">
        🗑️
      </button>
    </div>
    <div class="todo-date">
      {{ formatDate(todo.createdAt) }}
    </div>
  </li>
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle', 'delete', 'update'],
  data() {
    return {
      isEditing: false,
      editText: ''
    }
  },
  methods: {
    toggleTodo() {
      this.$emit('toggle', this.todo.id)
    },
    deleteTodo() {
      if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        this.$emit('delete', this.todo.id)
      }
    },
    async startEditing() {
      this.isEditing = true
      this.editText = this.todo.text
      await nextTick()
      this.$refs.editInput?.focus()
    },
    saveEdit() {
      if (this.editText.trim()) {
        this.$emit('update', this.todo.id, { text: this.editText.trim() })
      } else {
        this.cancelEdit()
      }
      this.isEditing = false
    },
    cancelEdit() {
      this.isEditing = false
      this.editText = this.todo.text
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: white;
  transition: all 0.3s ease;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  opacity: 0.6;
  background-color: #f8f9fa;
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.todo-text:hover {
  background-color: #f5f5f5;
}

.line-through {
  text-decoration: line-through;
  color: #6c757d;
}

.edit-input {
  flex: 1;
  padding: 6px 8px;
  border: 2px solid #007bff;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

.todo-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #e3f2fd;
}

.delete-btn:hover {
  background-color: #ffebee;
}

.todo-date {
  font-size: 12px;
  color: #6c757d;
  margin-left: 12px;
  min-width: 120px;
  text-align: right;
}

@media (max-width: 768px) {
  .todo-item {
    flex-direction: column;
    align-items: stretch;
  }
  
  .todo-content {
    margin-bottom: 8px;
  }
  
  .todo-actions {
    justify-content: center;
    margin-left: 0;
  }
  
  .todo-date {
    text-align: center;
    margin-left: 0;
    margin-top: 4px;
  }
}
</style>