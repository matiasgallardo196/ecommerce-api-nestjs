# 🛒 E-Commerce API - NestJS

E-commerce API developed with NestJS, TypeORM and PostgreSQL.

## 🚀 Technologies

- **Backend**: NestJS 11
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT + bcrypt
- **Documentation**: Swagger
- **Storage**: Cloudinary
- **Validation**: class-validator
- **Deployment**: Fly.io (Docker + GitHub Actions)
- **Database Hosting**: PostgreSQL (Unmanaged) on Fly.io

## 🌐 Live Demo

**API URL**: https://ecommerce-api-nestjs.fly.dev

**API Documentation**: https://ecommerce-api-nestjs.fly.dev/api

## 🚀 Deployment

This project is deployed on **Fly.io** using:

- **Backend**: Docker container with GitHub Actions for CI/CD
- **Database**: PostgreSQL (Unmanaged) on Fly.io
- **Production URL**: https://ecommerce-api-nestjs.fly.dev

### Deployment Configuration

The project includes:

- `Dockerfile` for containerization
- `docker-compose.yml` for local development
- `fly.toml` for Fly.io configuration
- GitHub Actions for deployment automation

## 📋 Features

### Users

- User registration and login
- User roles (admin/user)
- Profile with personal information (name, email, phone, address)

### Products

- Product CRUD operations
- Product categorization
- Stock management
- Product images (Cloudinary)

### Categories

- Product category management

### Orders

- Order creation and management
- Order details with products

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ecommerce-api-nestjs
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create `.env.development` file with:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Run with Docker**

```bash
docker-compose up
```

Or **run locally**

```bash
npm run start:dev
```

## 📚 API Documentation

**Local Development**: `http://localhost:3000/api`

**Production**: https://ecommerce-api-nestjs.fly.dev/api

## 🗄️ Database

### Main entities:

- **Users**: System users
- **Products**: Product catalog
- **Categories**: Product categories
- **Orders**: Purchase orders
- **OrderDetails**: Order details

## 🔧 Available Scripts

- `npm run start:dev` - Development with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Run in production
- `npm run test` - Run tests
- `npm run migration:run` - Run migrations
- `npm run migration:generate` - Generate migrations

## 📝 Author

Matías Gallardo
