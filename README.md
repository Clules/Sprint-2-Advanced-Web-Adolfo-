# Library Management Activity (Sprint 4)

This repository contains a complete **Book Management System**, comprised of:

1. **Backend**: A Spring Boot microservice (Java) exposing a JWT-protected REST API for CRUD operations on books, containerized with Docker.  
2. **Frontend**: A Vite + React + TypeScript application styled with Tailwind CSS, also containerized with Docker and served via NGINX in production.

Follow the instructions below to build and run both services with a single Docker Compose command.

---

## Table of Contents

- [Prerequisites](#prerequisites)  
- [Quick Start](#quick-start)  
  - [1. Clone the Repository](#1-clone-the-repository)  
  - [2. Navigate to the Project Root](#2-navigate-to-the-project-root)  
  - [3. Build and Run with Docker Compose](#3-build-and-run-with-docker-compose)  
- [Project Structure](#project-structure)  
  - [Backend (Spring Boot)](#backend-spring-boot)  
  - [Frontend (Vite + React)](#frontend-vite--react)  
- [Backend Details](#backend-details)  
  - [Configuration & Environment Variables](#configuration--environment-variables)  
  - [Available API Endpoints](#available-api-endpoints)  
  - [JWT Authentication](#jwt-authentication)  
- [Frontend Details](#frontend-details)  
  - [Environment Variables](#environment-variables)  
  - [Directory Structure](#directory-structure)  
  - [Routing & Pages](#routing--pages)  
- [Removing `node_modules` from Git](#removing-nodemodules-from-git)  
- [Contributing](#contributing)  
- [License](#license)

---

## Prerequisites

Make sure you have the following installed on your development machine:

- **Docker** & **Docker Compose** (v2+). Ensure you can run:
  ```bash
  docker --version
  docker compose version


Quick Start
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Clules/Sprint-2-Advanced-Web-Adolfo-.git
2. Navigate to the Project Root
bash
Copy
Edit
cd Sprint-2-Advanced-Web-Adolfo-/LibraryManagementActivity
You should now see:

css
Copy
Edit
├── Dockerfile
├── docker-compose.yml
├── pom.xml
├── src/                 ← Backend source code
├── Wallet_TESTDB/       ← Oracle wallet files (for ADB connection)
└── frontend/            ← Frontend (Vite + React) application
3. Build and Run with Docker Compose
bash
Copy
Edit
docker compose up --build -d
The command will:

Build the Spring Boot backend image (using Dockerfile in the root).

Build the frontend image (using frontend/Dockerfile).

Spin up two containers in one network:

library-api → Exposes :8080 (backend REST+Swagger UI).

library-ui → Exposes :3000 (frontend served by NGINX).

If you see a name conflict (e.g. “container name already in use”), stop and remove existing containers first:

bash
Copy
Edit
docker stop library-api library-ui
docker rm library-api library-ui
Once both containers are running:

Backend (Spring Boot):

Accessible at http://localhost:8080

Swagger UI: http://localhost:8080/swagger-ui.html

Health check (if enabled): http://localhost:8080/actuator/health

Frontend (React):

Accessible at http://localhost:3000

To stop and remove both containers:

bash
Copy
Edit
docker compose down
