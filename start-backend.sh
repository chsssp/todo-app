#!/bin/bash

echo "========================================="
echo "Starting Todo App Backend..."
echo "========================================="

cd backend

# Check if Maven wrapper exists
if [ -f "mvnw" ]; then
    echo "Using Maven wrapper..."
    ./mvnw spring-boot:run
else
    echo "Using system Maven..."
    mvn spring-boot:run
fi
