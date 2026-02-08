#!/bin/bash

echo "========================================="
echo "Starting Todo App Frontend..."
echo "========================================="

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting React development server..."
npm start
