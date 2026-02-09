# Setup Guide for Mac

This guide will help you set up and run the Full Stack Todo Application on your Mac.

## Prerequisites Installation

### 1. Install Java 17 or Higher

Check if Java is installed:
```bash
java -version
```

If not installed, download from:
- **Option 1 (Recommended):** Install via Homebrew
  ```bash
  brew install openjdk@17
  ```

- **Option 2:** Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [AdoptOpenJDK](https://adoptium.net/)

### 2. Install Maven

Check if Maven is installed:
```bash
mvn -version
```

If not installed:
```bash
brew install maven
```

### 3. Install Node.js and npm

Check if Node.js is installed:
```bash
node -version
npm -version
```

If not installed:
```bash
brew install node
```

Or download from [nodejs.org](https://nodejs.org/)

## Running the Application

### Step 1: Start the Backend

1. Open Terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   Or if you have Maven installed globally:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. Wait for the message: "Todo Application Started Successfully!"

4. The backend will be running at: `http://localhost:8080`

### Step 2: Start the Frontend

1. Open a NEW Terminal window/tab

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies (first time only):
   ```bash
   npm install
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

5. The app will automatically open in your browser at: `http://localhost:3000`

## Verifying Everything Works

1. **Backend Health Check:**
   - Visit: `http://localhost:8080/api/todos`
   - You should see an empty array: `[]`

2. **H2 Database Console (Optional):**
   - Visit: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:tododb`
   - Username: `sa`
   - Password: (leave blank)

3. **Frontend:**
   - Visit: `http://localhost:3000`
   - You should see the Todo App interface

## Testing the Application

1. Click "Add Todo" to create a new todo
2. Mark todos as complete by clicking the checkbox
3. Edit todos by clicking "Edit"
4. Delete todos by clicking "Delete"
5. Filter todos using the "All", "Active", "Completed" buttons

## Troubleshooting

### Backend Won't Start

**Problem:** Port 8080 is already in use

**Solution:**
```bash
# Find what's using port 8080
lsof -i :8080

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

### Frontend Won't Start

**Problem:** Port 3000 is already in use

**Solution:** 
- The terminal will ask if you want to use another port (press 'y')
- Update the backend CORS settings in `application.properties` if using a different port

### Cannot Connect to Backend

**Problem:** Frontend shows "Failed to load todos"

**Solution:**
1. Make sure backend is running (`http://localhost:8080/api/todos` should work)
2. Check console for CORS errors
3. Verify both services are running

## Stopping the Application

### Stop Backend
- Press `Ctrl + C` in the backend terminal

### Stop Frontend
- Press `Ctrl + C` in the frontend terminal

## Opening in Cursor AI

1. Open Cursor AI application
2. Click "File" → "Open Folder"
3. Navigate to and select the `fullstack-todo-app` folder
4. The entire project will load in Cursor

## Next Steps

### Adding to GitHub

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Full Stack Todo App"
   ```

2. Create a new repository on GitHub

3. Link and push:
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

### Future Enhancements

Consider adding:
- User authentication (Spring Security + JWT)
- PostgreSQL database for production
- Docker containers
- Deployment to cloud (AWS, Heroku, etc.)
- Unit and integration tests
- CI/CD pipeline

## Project Structure

```
fullstack-todo-app/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/todoapp/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   └── TodoApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## Support

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify all prerequisites are installed
3. Ensure ports 8080 and 3000 are available
4. Review the error messages carefully

Happy coding! 🚀
