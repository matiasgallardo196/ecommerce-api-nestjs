# 📡 API Endpoints

## Authentication (`/auth`)

- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Sign in

## Products (`/products`)

- `GET /products` - Get all products (with pagination)
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product (requires auth)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (requires auth)
- `POST /products/seed` - Load test products

## Orders (`/orders`)

- `POST /orders` - Create new order (requires auth)
- `GET /orders/:id` - Get order by ID (requires auth)

## Categories (`/categories`)

- `GET /categories/all` - Get all categories
- `POST /categories/seeder` - Load default categories (requires auth)

## Users (`/users`)

- `GET /users` - Get all users (admin only, requires auth)
- `GET /users/:id` - Get user by ID (same user or admin, requires auth)
- `PUT /users/:id` - Update user (same user or admin, requires auth)
- `DELETE /users/:id` - Delete user (same user or admin, requires auth)

## Cloudinary (`/uploadImage`)

- `PUT /uploadImage/:id` - Upload user image (requires auth)

## API Documentation

Once the application is running, you can access the automatic Swagger documentation at:

```
http://localhost:3000/api
```

The documentation includes:

- All available endpoints
- Data schemas (DTOs)
- Request and response examples
- Bearer Token authentication
- HTTP status codes
