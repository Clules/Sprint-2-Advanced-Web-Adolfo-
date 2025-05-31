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
