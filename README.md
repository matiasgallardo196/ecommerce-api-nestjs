# 🛒 E-Commerce API - Matías Gallardo

## 📋 Description

RESTful API developed with **NestJS** for a complete e-commerce system. This application provides functionalities for user management, products, categories, orders and authentication, with Cloudinary integration for image handling.

## 🚀 Main Features

- **JWT Authentication** with user and admin roles
- **Complete product management** with categories
- **Order system** with purchase details
- **Image upload** integrated with Cloudinary
- **PostgreSQL database** with TypeORM
- **Automatic documentation** with Swagger
- **Data validation** with class-validator
- **Password encryption** with bcrypt
- **Complete dockerization** of the project
- **Request logging** with custom middleware

## 🛠️ Quick Start

### Prerequisites

- Node.js 22.13.0 or higher
- PostgreSQL
- Docker and Docker Compose (optional)

### Installation

1. **Clone and install**

```bash
git clone <repository-url>
cd ecommerce-api-nestjs
npm install
```

2. **Configure environment**

```bash
# Create your environment file
cp .env.example .env.development
# Edit .env.development with your configuration
```

3. **Run the application**

```bash
npm run start:dev
```

4. **Access API documentation**

```
http://localhost:3000/api
```

## 📚 Documentation

- **[Installation Guide](docs/installation.md)** - Detailed setup instructions
- **[API Endpoints](docs/api-endpoints.md)** - Complete API reference
- **[Data Model](docs/data-model.md)** - Database schema and relationships
- **[Project Structure](docs/project-structure.md)** - Code organization
- **[Development Guide](docs/development.md)** - Technical details and configurations
- **[Contributing](docs/contributing.md)** - How to contribute to the project

## 🐳 Docker

```bash
# Run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build . -t ecommerce-docker
docker run -p 3001:3000 ecommerce-docker
```

## 📡 Available Scripts

```bash
npm run start:dev          # Development mode
npm run build             # Build for production
npm run test              # Run tests
npm run migration:run     # Run database migrations
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Register a user and get a token to access protected endpoints.

## 📖 API Documentation

Once running, visit `http://localhost:3000/api` for interactive Swagger documentation.

---

**Matías Gallardo** - Full Stack Developer

⭐ If this project was useful to you, don't forget to give it a star!
