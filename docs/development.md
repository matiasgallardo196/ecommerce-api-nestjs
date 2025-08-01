# 🔧 Development and Technical Details

## Special Configurations

### Image Validation

- Supported formats: JPEG, PNG, WebP
- Maximum size: 200 KB
- Automatic file type validation

### Pagination

- Parameters: `page` and `limit`
- Default values: page=1, limit=10

### Logging

- Custom middleware for request logging
- Includes HTTP method, URL, timestamp and duration

## Testing

The project includes complete testing configuration:

- **Unit tests** with Jest
- **End-to-end tests** with Supertest
- **Code coverage** configured
- **Testing configuration** in `jest-e2e.json`

## Docker

### Dockerfile

- Based on Node.js 22.14.0-slim
- Optimized for production
- Exposes port 3000

### Docker Compose

- NestJS application service
- PostgreSQL database service
- Persistent volume for data
- Configured environment variables

## Development Notes

- The project uses **TypeScript** for type safety
- Implements **Repository pattern** for data access
- Uses **decorators** for validation and authorization
- Includes **interceptors** for file handling
- Implements **custom pipes** for validation

## Technologies Used

### Backend

- **NestJS** - Node.js framework
- **TypeScript** - Programming language
- **TypeORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication and authorization
- **bcryptjs** - Password encryption
- **Cloudinary** - Image storage service
- **Swagger** - API documentation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Docker** - Containerization
- **Docker Compose** - Container orchestration 