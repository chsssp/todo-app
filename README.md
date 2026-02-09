# Enhanced Full Stack Todo Application

A modern, feature-rich full-stack todo application with **Spring Boot** backend and **React** frontend.

## ✨ New Features Added!

### 🔍 1. Search Functionality
- Real-time search by todo title
- Instant filtering as you type
- Clear search button

### 📅 2. Due Dates
- Add due dates to todos
- Visual indicators for overdue items (red border + animation)
- "Today" and "Overdue" badges
- Automatic sorting by due date

### 🎯 3. Priority Levels
- Three priority levels: High (🔴), Medium (🟡), Low (🟢)
- Color-coded priority badges
- Filter todos by priority
- Automatic sorting (High → Medium → Low)

### 🏷️ 4. Categories/Tags
- Add custom categories (Work, Personal, Shopping, etc.)
- Filter by category
- Auto-suggest from existing categories
- Dynamic category list

### 🌓 5. Dark Mode Toggle
- Beautiful dark mode (default)
- Smooth light mode option
- Preference saved in localStorage
- Animated gradient background
- Transparent glassmorphism design

## 🎨 Design Highlights

- **Transparent Black Theme**: Glassmorphism with backdrop blur
- **Animated Gradient Background**: Smooth color transitions
- **Color-Coded Priorities**: Visual hierarchy
- **Overdue Animations**: Pulsing red border for overdue items
- **Responsive Design**: Works on all devices

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (in-memory)
- Maven

### Frontend
- React 18
- Axios
- CSS3 with Glassmorphism
- LocalStorage for theme preference

## 📁 Project Structure

```
fullstack-todo-app-enhanced/
├── backend/
│   ├── src/main/java/com/todoapp/
│   │   ├── controller/TodoController.java    (NEW: Search, category, priority endpoints)
│   │   ├── model/Todo.java                   (NEW: priority, category, dueDate fields)
│   │   ├── repository/TodoRepository.java    (NEW: Search queries)
│   │   ├── service/TodoService.java          (NEW: Enhanced methods)
│   │   └── TodoApplication.java
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js                   (NEW: Priority, category, due date inputs)
│   │   │   ├── TodoItem.js                   (NEW: Badges, overdue indicator)
│   │   │   ├── TodoList.js                   (Enhanced with search)
│   │   │   └── SearchBar.js                  (NEW: Search component)
│   │   ├── services/todoService.js           (NEW: Search, category endpoints)
│   │   ├── App.js                            (NEW: Filters, dark mode toggle)
│   │   └── App.css                           (NEW: Dark/light themes)
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven
- Node.js 16+
- npm

### Running the Application

#### Backend (Terminal 1)
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

#### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## 🎯 New API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos/search?q={term}` | Search todos by title |
| GET | `/api/todos/category/{category}` | Get todos by category |
| GET | `/api/todos/priority/{priority}` | Get todos by priority |
| GET | `/api/todos/overdue` | Get overdue todos |
| GET | `/api/todos/categories` | Get all unique categories |

## 📊 Data Model Updates

```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the todo app",
  "completed": false,
  "priority": "HIGH",           // NEW: LOW | MEDIUM | HIGH
  "category": "Work",           // NEW: Custom category
  "dueDate": "2026-02-15",     // NEW: Due date
  "createdAt": "2026-02-07T...",
  "updatedAt": "2026-02-07T..."
}
```

## 🎨 Theme Customization

The app includes a beautiful dark mode by default with these features:
- Animated gradient background
- Transparent glassmorphism cards
- Smooth transitions
- Light mode toggle
- Saved preference in localStorage

## 📝 Usage Guide

### Creating a Todo
1. Enter title (required)
2. Select priority (High/Medium/Low)
3. Add category (or select from existing)
4. Set due date (optional)
5. Add description (optional)
6. Click "➕ Add Todo"

### Searching
- Type in the search bar
- Results filter instantly
- Click ✕ to clear search

### Filtering
- **Status**: All, Active, Completed, Overdue
- **Priority**: All, High, Medium, Low
- **Category**: Dynamic list based on your categories

### Dark/Light Mode
- Click "☀️ Light" or "🌙 Dark" button in header
- Preference is saved automatically

## 🔮 What's Different from Original

| Feature | Original | Enhanced |
|---------|----------|----------|
| Search | ❌ | ✅ Real-time search |
| Priority | ❌ | ✅ 3 levels with colors |
| Categories | ❌ | ✅ Custom tags |
| Due Dates | ❌ | ✅ With overdue alerts |
| Dark Mode | ❌ | ✅ Toggle with localStorage |
| Background | Gradient | Transparent glassmorphism |
| Sorting | Creation date | Priority + Due date + Creation |



