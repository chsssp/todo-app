# Full Stack Todo Application

A modern full-stack application built with Spring Boot (Java) and React.

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- H2 Database (in-memory for development)
- Maven

### Frontend
- React 18
- Axios for API calls
- Modern CSS

## Project Structure

```
fullstack-todo-app/
├── backend/          # Spring Boot application
├── frontend/         # React application
└── README.md
```

## Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- Maven (or use the Maven wrapper included)

## Running the Application Locally

### 1. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 2. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Features

- Create, Read, Update, Delete (CRUD) operations
- Mark todos as complete/incomplete
- Responsive UI
- RESTful API
- In-memory H2 database

## Planning to do future Enhancements (Need to work on them)

- User authentication
- Categories/Tags
- Due dates
- Priority levels
- PostgreSQL database
- Docker containerization

