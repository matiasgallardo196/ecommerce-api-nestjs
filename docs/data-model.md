# 🗄️ Data Model

## Main Entities

### User

- `id` (UUID) - Unique identifier
- `name` (string) - User name
- `email` (string, unique) - User email
- `password` (string, encrypted) - Password
- `phone` (bigint, optional) - Phone number
- `country` (string, optional) - Country
- `address` (text, optional) - Address
- `city` (string, optional) - City
- `isAdmin` (boolean) - Admin role
- `orders` (relation) - User's orders

### Product

- `id` (UUID) - Unique identifier
- `name` (string) - Product name
- `description` (text) - Description
- `price` (decimal) - Price
- `stock` (int) - Available stock
- `imgUrl` (string) - Image URL
- `category` (relation) - Product category
- `orderDetails` (relation) - Order details containing this product

### Order

- `id` (UUID) - Unique identifier
- `date` (timestamp) - Order date
- `user` (relation) - User who made the order
- `orderDetail` (relation) - Order details

### OrderDetail

- `id` (UUID) - Unique identifier
- `price` (decimal) - Total price of the order
- `order` (relation) - Associated order
- `products` (relation) - Products in this order

### Category

- `id` (UUID) - Unique identifier
- `name` (string) - Category name
- `products` (relation) - Products in this category

## Authentication and Authorization

### Authentication Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/signin` - Login

### Roles

- **User**: Basic access to products and order creation
- **Administrator**: Full access, including product management

### Route Protection

- Use of `@UseGuards(AuthGuard)` for authentication
- Use of `@Roles(Role.Admin)` for role-based authorization
