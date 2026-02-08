# 🚀 Quick Start Guide - Mac Users

## Prerequisites Check

Open Terminal and run these commands to verify you have everything:

```bash
# Check Java (need 17+)
java -version

# Check Maven
mvn -version

# Check Node.js (need 16+)
node -v

# Check npm
npm -v
```

### Missing Something?

**Install Java:**
```bash
brew install openjdk@17
```

**Install Maven:**
```bash
brew install maven
```

**Install Node.js:**
```bash
brew install node
```

## Running the App (2 Terminals)

### Terminal 1 - Backend
```bash
cd fullstack-todo-app/backend
./mvnw spring-boot:run
```
Wait for: "Todo Application Started Successfully!"

### Terminal 2 - Frontend
```bash
cd fullstack-todo-app/frontend
npm install          # First time only
npm start
```
Browser opens automatically at http://localhost:3000

## Using Cursor AI

1. Open Cursor AI
2. File → Open Folder
3. Select `fullstack-todo-app`
4. Start coding!

## Adding to GitHub Later

```bash
cd fullstack-todo-app
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## Troubleshooting

**Port 8080 in use?**
```bash
lsof -i :8080
kill -9 <PID>
```

**Port 3000 in use?**
- Press 'y' when asked to use different port

**Backend not connecting?**
- Make sure backend terminal shows "Started Successfully!"
- Visit http://localhost:8080/api/todos (should show `[]`)

## What You Get

✅ Full-stack Java + React application
✅ Professional project structure
✅ Complete documentation
✅ Ready for GitHub
✅ Easy to extend

## Features

- Create, edit, delete todos
- Mark as complete/incomplete  
- Filter by status
- Beautiful responsive UI
- RESTful API
- In-memory database

Enjoy! 🎉
