# Architecture Diagram

## Full Stack Todo Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                      http://localhost:3000                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   App.js     │  │  TodoForm    │  │  TodoList    │          │
│  │ (Main State) │→ │ (Create/Edit)│→ │  (Display)   │          │
│  └──────┬───────┘  └──────────────┘  └──────────────┘          │
│         │                                                        │
│         │ Uses                                                   │
│         ↓                                                        │
│  ┌──────────────────────────────────────────┐                   │
│  │      todoService.js (API Client)         │                   │
│  │  - getAllTodos()                         │                   │
│  │  - createTodo()                          │                   │
│  │  - updateTodo()                          │                   │
│  │  - deleteTodo()                          │                   │
│  │  - toggleComplete()                      │                   │
│  └──────────────────┬───────────────────────┘                   │
│                     │                                            │
└─────────────────────┼────────────────────────────────────────────┘
                      │
                      │ HTTP Requests (Axios)
                      │ JSON Data
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Spring Boot)                       │
│                      http://localhost:8080                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────┐                   │
│  │       TodoController (REST API)          │                   │
│  │  GET    /api/todos                       │                   │
│  │  GET    /api/todos/{id}                  │                   │
│  │  POST   /api/todos                       │                   │
│  │  PUT    /api/todos/{id}                  │                   │
│  │  DELETE /api/todos/{id}                  │                   │
│  │  PATCH  /api/todos/{id}/toggle           │                   │
│  └──────────────────┬───────────────────────┘                   │
│                     │                                            │
│                     │ Calls                                      │
│                     ↓                                            │
│  ┌──────────────────────────────────────────┐                   │
│  │         TodoService (Business Logic)     │                   │
│  │  - getAllTodos()                         │                   │
│  │  - getTodoById()                         │                   │
│  │  - createTodo()                          │                   │
│  │  - updateTodo()                          │                   │
│  │  - deleteTodo()                          │                   │
│  │  - toggleComplete()                      │                   │
│  └──────────────────┬───────────────────────┘                   │
│                     │                                            │
│                     │ Uses                                       │
│                     ↓                                            │
│  ┌──────────────────────────────────────────┐                   │
│  │    TodoRepository (Data Access Layer)    │                   │
│  │  - findAll()                             │                   │
│  │  - findById()                            │                   │
│  │  - save()                                │                   │
│  │  - delete()                              │                   │
│  │  - findByCompleted()                     │                   │
│  └──────────────────┬───────────────────────┘                   │
│                     │                                            │
│                     │ JPA/Hibernate                              │
│                     ↓                                            │
│  ┌──────────────────────────────────────────┐                   │
│  │         H2 Database (In-Memory)          │                   │
│  │                                          │                   │
│  │  Table: TODOS                            │                   │
│  │  ├─ id (Primary Key)                     │                   │
│  │  ├─ title                                │                   │
│  │  ├─ description                          │                   │
│  │  ├─ completed                            │                   │
│  │  ├─ created_at                           │                   │
│  │  └─ updated_at                           │                   │
│  └──────────────────────────────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘


## Request Flow Example: Creating a Todo

1. User fills form in TodoForm component
2. User clicks "Add Todo" button
3. TodoForm calls onSubmit() → App.js handleAddOrUpdateTodo()
4. App.js calls todoService.createTodo(todoData)
5. todoService sends POST request to http://localhost:8080/api/todos
6. TodoController @PostMapping receives request
7. TodoController calls TodoService.createTodo()
8. TodoService calls TodoRepository.save()
9. TodoRepository persists to H2 Database via JPA
10. Database returns saved Todo with generated ID
11. Response travels back through layers
12. Frontend receives new Todo object
13. App.js updates state, adding new todo to list
14. React re-renders TodoList with new todo
15. User sees new todo appear on screen


## Technology Stack by Layer

Frontend:
├─ React 18 (UI Framework)
├─ Axios (HTTP Client)
└─ CSS3 (Styling)

Backend:
├─ Spring Boot 3.2.1 (Framework)
├─ Spring Web (REST API)
├─ Spring Data JPA (Database Access)
├─ Hibernate (ORM)
├─ Bean Validation (Input Validation)
└─ H2 Database (In-Memory Database)

Build Tools:
├─ Maven (Java Dependencies)
└─ npm (JavaScript Dependencies)


## Design Patterns Used

1. MVC (Model-View-Controller)
   - Model: Todo.java
   - View: React Components
   - Controller: TodoController.java

2. Repository Pattern
   - TodoRepository.java (Data Access Abstraction)

3. Service Layer Pattern
   - TodoService.java (Business Logic Separation)

4. Component-Based Architecture
   - Reusable React Components

5. RESTful API Design
   - Standard HTTP Methods
   - Resource-Based URLs
   - JSON Data Format
```
