# 🚀 Installation and Configuration

## Prerequisites

- Node.js 22.13.0 or higher
- PostgreSQL
- Docker and Docker Compose (optional)

## Environment Variables

1. **Create your environment file:**

```bash
cp .env.example .env.development
```

2. **Configure your environment variables in `.env.development`:**

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=ecommerce_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Local Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ecommerce-api-nestjs
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure database**

```bash
# Create PostgreSQL database
# Run migrations
npm run migration:run
```

4. **Run in development**

```bash
npm run start:dev
```

## Docker Installation

1. **Build and run with Docker Compose**

```bash
docker-compose up --build
```

2. **Run only the application**

```bash
docker build . -t ecommerce-docker
docker run -p 3001:3000 ecommerce-docker
```

## Available Scripts

```bash
# Development
npm run start:dev          # Run in development mode
npm run start:debug        # Run in debug mode

# Production
npm run build             # Build the project
npm run start:prod        # Run in production

# Testing
npm run test              # Run tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:debug        # Run tests in debug mode
npm run test:e2e          # Run end-to-end tests

# Database
npm run migration:run     # Run migrations
npm run migration:generate # Generate new migration
npm run migration:create  # Create empty migration
npm run migration:revert  # Revert last migration
npm run migration:show    # Show migrations

# Linting and formatting
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```
