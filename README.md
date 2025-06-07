 Vue.js Todo App con JSON Server

Una aplicación de lista de tareas (To-Do List) desarrollada con Vue.js 3 y una API REST fake usando json-server.

Características

-  Agregar nuevas tareas
-  Editar tareas existentes (doble clic o botón editar)
-  Marcar tareas como completadas/pendientes
-  Eliminar tareas individuales
-  Eliminar todas las tareas completadas
-  Filtrar tareas (Todas, Pendientes, Completadas)
-  API REST con json-server
-  Diseño responsive
-  Indicador de estado de conexión
-  Interfaz reactiva y moderna

 Tecnologías utilizadas

- Vue.js 3 - Framework JavaScript progresivo
- json-server - API REST fake para desarrollo
- Axios - Cliente HTTP para las peticiones a la API
- CSS3 - Estilos modernos y responsive
- **ES6+** - JavaScript moderno

Instalación

Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

 Pasos de instalación

1. Clonar el repositorio
   ```bash
   git clone https://github.com/tu-usuario/vue-todo-app.git
   cd vue-todo-app
   ```

2. Instalar dependencias
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo
   ```bash
   # Opción 1: Iniciar ambos servidores al mismo tiempo
   npm run dev
   
   # Opción 2: Iniciar por separado
   # Terminal 1 - API Server (json-server)
   npm run json-server
   
   # Terminal 2 - Vue App
   npm run serve
   ```

4. Acceder a la aplicación
   - Aplicación Vue: `http://localhost:8080`
   - API json-server: `http://localhost:3001`

 Estructura del proyecto

```
vue-todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoForm.vue      # Formulario para agregar tareas
│   │   ├── TodoItem.vue      # Componente individual de tarea
│   │   └── TodoList.vue      # Lista de tareas con filtros
│   ├── services/
│   │   └── todoService.js    # Servicio para comunicación con API
│   ├── App.vue               # Componente principal
│   └── main.js               # Punto de entrada
├── db.json                   # Base de datos JSON para json-server
├── package.json
└── README.md
```

 Comandos disponibles

```bash
# Desarrollo
npm run serve          # Iniciar servidor de desarrollo Vue
npm run json-server    # Iniciar API json-server
npm run dev           # Iniciar ambos servidores

# Producción
npm run build         # Construir para producción
npm run lint          # Verificar y corregir código
```

 API Endpoints

La aplicación consume los siguientes endpoints de la API:

- `GET /todos` - Obtener todas las tareas
- `POST /todos` - Crear nueva tarea
- `PATCH /todos/:id` - Actualizar tarea
- `DELETE /todos/:id` - Eliminar tarea

Estructura de datos

```json
{
  "id": 1,
  "text": "Descripción de la tarea",
  "completed": false,
  "createdAt": "2025-06-06T10:00:00.000Z"
}
```

Funcionalidades

Gestión de tareas
- Agregar: Escribe en el input y presiona Enter o haz clic en "Agregar"
- Editar: Doble clic en el texto de la tarea o usa el botón de editar (✏️)
- Completar: Marca/desmarca el checkbox junto a la tarea
- Eliminar: Usa el botón de eliminar (🗑️) para cada tarea

 Filtros
- Todas: Muestra todas las tareas
- Pendientes: Solo tareas sin completar
- Completadas: Solo tareas completadas

 Características adicionales
- Contador de tareas por categoría
- Indicador de estado de conexión con la API
- Confirmación antes de eliminar tareas
- Mensajes de error informativos
- Diseño responsive para móviles

 Solución de problemas

Error de conexión
Si ves "🔴 Sin conexión a la API":
1. Verifica que json-server esté ejecutándose en el puerto 3001
2. Ejecuta `npm run json-server` en una terminal separada
3. Verifica que `http://localhost:3001/todos` responda

 Puerto ocupado
Si el puerto 8080 está ocupado:
- Vue CLI automáticamente usará el siguiente puerto disponible
- O especifica un puerto: `npm run serve -- --port 8081`

 Migración desde localStorage

Esta aplicación reemplaza el almacenamiento local (localStorage) con una API REST real:

Antes (localStorage):
```javascript
// Datos guardados en el navegador
localStorage.setItem('todos', JSON.stringify(todos))
```

Ahora (API REST):
```javascript
// Datos guardados en servidor
await todoService.createTodo(todo)
```

 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


Objetivos del ejercicio

- Implementar CRUD completo (Create, Read, Update, Delete)
-  Reemplazar localStorage con API REST
-  Usar componentes Vue.js reutilizables
-  Implementar comunicación con API usando Axios
-  Crear interfaz responsive y moderna
-  Manejar estados de carga y errores
-  Implementar filtros y búsqueda
-  Documentar el proyecto completo
