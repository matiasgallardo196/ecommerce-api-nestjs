# 📁 Project Structure

```
src/
├── common/                 # Common services
│   └── services/
│       ├── bcrypt.service.ts
│       └── jwt.service.ts
├── config/                 # Configurations
│   ├── cloudinary.ts
│   ├── env.loader.ts
│   └── typeorm.ts
├── database/               # Database configuration
│   └── database.module.ts
├── decorators/             # Custom decorators
│   ├── role.enum.ts
│   └── roles.decorators.ts
├── dtos/                   # Data Transfer Objects
│   ├── auth.dto.ts
│   ├── order.dto.ts
│   ├── orderResponse.dto.ts
│   ├── pagination.dto.ts
│   ├── product.dto.ts
│   ├── productUpdate.dto.ts
│   ├── User.dto.ts
│   └── userSignUp.dto.ts
├── entities/               # Database entities
│   ├── category.entity.ts
│   ├── order.entity.ts
│   ├── orderDetail.entity.ts
│   ├── products.entity.ts
│   └── users.entity.ts
├── interfaces/             # TypeScript interfaces
│   ├── product.interface.ts
│   └── User.interface.ts
├── middlewares/            # Custom middlewares
│   └── logger/
│       └── logger.middleware.ts
├── modules/                # Application modules
│   ├── auth/              # Authentication
│   ├── categories/        # Categories
│   ├── cloudinary/        # Image management
│   ├── orders/            # Orders
│   ├── products/          # Products
│   └── users/             # Users
├── pipes/                  # Validation pipes
│   └── validateImage.pipe.ts
└── main.ts                 # Entry point
```

## Module Descriptions

### Common Services

- **bcrypt.service.ts**: Password encryption and validation
- **jwt.service.ts**: JWT token generation and validation

### Configurations

- **cloudinary.ts**: Cloudinary image service configuration
- **env.loader.ts**: Environment variables loader
- **typeorm.ts**: Database connection configuration

### Decorators

- **role.enum.ts**: User role definitions
- **roles.decorators.ts**: Role-based authorization decorators

### DTOs (Data Transfer Objects)

- **auth.dto.ts**: Authentication request schemas
- **order.dto.ts**: Order creation schemas
- **orderResponse.dto.ts**: Order response schemas
- **pagination.dto.ts**: Pagination parameters
- **product.dto.ts**: Product creation schemas
- **productUpdate.dto.ts**: Product update schemas
- **User.dto.ts**: User registration and update schemas
- **userSignUp.dto.ts**: User signup with password confirmation

### Entities

- **category.entity.ts**: Product category model
- **order.entity.ts**: Order model with relationships
- **orderDetail.entity.ts**: Order detail model with product relationships
- **products.entity.ts**: Product model with category relationship
- **users.entity.ts**: User model with order relationships

### Middlewares

- **logger.middleware.ts**: Request logging middleware

### Modules

- **auth/**: Authentication and authorization logic
- **categories/**: Category management
- **cloudinary/**: Image upload and management
- **orders/**: Order processing and management
- **products/**: Product catalog management
- **users/**: User management

### Pipes

- **validateImage.pipe.ts**: Image file validation

### Interfaces

- **product.interface.ts**: Product type definitions
- **User.interface.ts**: User type definitions
