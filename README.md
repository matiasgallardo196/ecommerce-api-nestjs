# 🛒 E-Commerce API - Matías Gallardo

## 📋 Descripción

API RESTful desarrollada con **NestJS** para un sistema de e-commerce completo. Esta aplicación proporciona funcionalidades para gestión de usuarios, productos, categorías, órdenes y autenticación, con integración de Cloudinary para el manejo de imágenes.

## 🚀 Características Principales

- **Autenticación JWT** con roles de usuario y administrador
- **Gestión completa de productos** con categorías
- **Sistema de órdenes** con detalles de compra
- **Subida de imágenes** integrada con Cloudinary
- **Base de datos PostgreSQL** con TypeORM
- **Documentación automática** con Swagger
- **Validación de datos** con class-validator
- **Encriptación de contraseñas** con bcrypt
- **Dockerización** completa del proyecto
- **Logging** de requests con middleware personalizado

## 🛠️ Tecnologías Utilizadas

### Backend

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **TypeORM** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación y autorización
- **bcryptjs** - Encriptación de contraseñas
- **Cloudinary** - Servicio de almacenamiento de imágenes
- **Swagger** - Documentación de API

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

## 📁 Estructura del Proyecto

```
src/
├── common/                 # Servicios comunes
│   └── services/
│       ├── bcrypt.service.ts
│       └── jwt.service.ts
├── config/                 # Configuraciones
│   ├── cloudinary.ts
│   ├── env.loader.ts
│   └── typeorm.ts
├── database/               # Configuración de base de datos
│   └── database.module.ts
├── decorators/             # Decoradores personalizados
│   ├── role.enum.ts
│   └── roles.decorators.ts
├── dtos/                   # Data Transfer Objects
│   ├── auth.dto.ts
│   ├── order.dto.ts
│   ├── product.dto.ts
│   └── user.dto.ts
├── entities/               # Entidades de base de datos
│   ├── category.entity.ts
│   ├── order.entity.ts
│   ├── orderDetail.entity.ts
│   ├── products.entity.ts
│   └── users.entity.ts
├── middlewares/            # Middlewares personalizados
│   └── logger/
│       └── logger.middleware.ts
├── modules/                # Módulos de la aplicación
│   ├── auth/              # Autenticación
│   ├── categories/        # Categorías
│   ├── cloudinary/        # Gestión de imágenes
│   ├── orders/            # Órdenes
│   ├── products/          # Productos
│   └── users/             # Usuarios
├── pipes/                  # Pipes de validación
│   └── validateImage.pipe.ts
└── main.ts                 # Punto de entrada
```

## 🗄️ Modelo de Datos

### Entidades Principales

#### User

- `id` (UUID) - Identificador único
- `name` (string) - Nombre del usuario
- `email` (string, único) - Email del usuario
- `password` (string, encriptado) - Contraseña
- `phone` (bigint, opcional) - Teléfono
- `country` (string, opcional) - País
- `address` (text, opcional) - Dirección
- `city` (string, opcional) - Ciudad
- `isAdmin` (boolean) - Rol de administrador

#### Product

- `id` (UUID) - Identificador único
- `name` (string) - Nombre del producto
- `description` (text) - Descripción
- `price` (decimal) - Precio
- `stock` (int) - Stock disponible
- `imgUrl` (string) - URL de la imagen
- `category` (relación) - Categoría del producto

#### Order

- `id` (UUID) - Identificador único
- `date` (timestamp) - Fecha de la orden
- `user` (relación) - Usuario que realizó la orden
- `orderDetail` (relación) - Detalles de la orden

#### Category

- `id` (UUID) - Identificador único
- `name` (string) - Nombre de la categoría

## 🔐 Autenticación y Autorización

### Endpoints de Autenticación

- `POST /auth/signup` - Registro de usuarios
- `POST /auth/signin` - Inicio de sesión

### Roles

- **Usuario**: Acceso básico a productos y creación de órdenes
- **Administrador**: Acceso completo, incluyendo gestión de productos

### Protección de Rutas

- Uso de `@UseGuards(AuthGuard)` para autenticación
- Uso de `@Roles(Role.Admin)` para autorización por roles

## 📡 Endpoints de la API

### Autenticación (`/auth`)

- `POST /auth/signup` - Registrar nuevo usuario
- `POST /auth/signin` - Iniciar sesión

### Productos (`/products`)

- `GET /products` - Obtener todos los productos (con paginación)
- `GET /products/:id` - Obtener producto por ID
- `POST /products` - Crear nuevo producto (requiere auth)
- `PUT /products/:id` - Actualizar producto (solo admin)
- `DELETE /products/:id` - Eliminar producto (requiere auth)
- `POST /products/seed` - Cargar productos de prueba

### Órdenes (`/orders`)

- `POST /orders` - Crear nueva orden (requiere auth)
- `GET /orders/:id` - Obtener orden por ID (requiere auth)

### Categorías (`/categories`)

- `GET /categories` - Obtener todas las categorías
- `POST /categories` - Crear nueva categoría (requiere auth)

### Usuarios (`/users`)

- `GET /users` - Obtener todos los usuarios (requiere auth)
- `GET /users/:id` - Obtener usuario por ID (requiere auth)
- `PUT /users/:id` - Actualizar usuario (requiere auth)

### Cloudinary (`/uploadImage`)

- `PUT /uploadImage/:id` - Subir imagen de usuario (requiere auth)

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 22.13.0 o superior
- PostgreSQL
- Docker y Docker Compose (opcional)

### Variables de Entorno

Crear archivo `.env.development` con las siguientes variables:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos

# JWT
JWT_SECRET=tu_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Puerto de la aplicación
PORT=3000
```

### Instalación Local

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd ecommerce-matiasgallardo196
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar base de datos**

```bash
# Crear base de datos PostgreSQL
# Ejecutar migraciones
npm run migration:run
```

4. **Ejecutar en desarrollo**

```bash
npm run start:dev
```

### Instalación con Docker

1. **Construir y ejecutar con Docker Compose**

```bash
docker-compose up --build
```

2. **Ejecutar solo la aplicación**

```bash
docker build . -t ecommerce-docker
docker run -p 3001:3000 ecommerce-docker
```

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Ejecutar en modo desarrollo
npm run start:debug        # Ejecutar en modo debug

# Producción
npm run build             # Construir el proyecto
npm run start:prod        # Ejecutar en producción

# Testing
npm run test              # Ejecutar tests
npm run test:watch        # Ejecutar tests en modo watch
npm run test:cov          # Ejecutar tests con coverage
npm run test:e2e          # Ejecutar tests end-to-end

# Base de datos
npm run migration:run     # Ejecutar migraciones
npm run migration:generate # Generar nueva migración
npm run migration:create  # Crear migración vacía
npm run migration:revert  # Revertir última migración
npm run migration:show    # Mostrar migraciones

# Linting y formateo
npm run lint              # Ejecutar ESLint
npm run format            # Formatear código con Prettier
```

## 📖 Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación automática de Swagger en:

```
http://localhost:3000/api
```

La documentación incluye:

- Todos los endpoints disponibles
- Esquemas de datos (DTOs)
- Ejemplos de requests y responses
- Autenticación con Bearer Token
- Códigos de estado HTTP

## 🔧 Configuraciones Especiales

### Validación de Imágenes

- Soporte para formatos: JPEG, PNG, WebP
- Tamaño máximo: 200 KB
- Validación automática de tipo de archivo

### Paginación

- Parámetros: `page` y `limit`
- Valores por defecto: page=1, limit=10

### Logging

- Middleware personalizado para logging de requests
- Incluye método HTTP, URL, timestamp y duración

## 🧪 Testing

El proyecto incluye configuración completa para testing:

- **Tests unitarios** con Jest
- **Tests end-to-end** con Supertest
- **Coverage de código** configurado
- **Configuración de testing** en `jest-e2e.json`

## 🐳 Docker

### Dockerfile

- Basado en Node.js 22.14.0-slim
- Optimizado para producción
- Exposición del puerto 3000

### Docker Compose

- Servicio de aplicación NestJS
- Servicio de base de datos PostgreSQL
- Volumen persistente para datos
- Variables de entorno configuradas

## 📝 Notas de Desarrollo

- El proyecto utiliza **TypeScript** para type safety
- Implementa **patrón Repository** para acceso a datos
- Usa **decoradores** para validación y autorización
- Incluye **interceptores** para manejo de archivos
- Implementa **pipes** personalizados para validación

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia UNLICENSED.

## 👨‍💻 Autor

**Matías Gallardo** - Desarrollador Full Stack

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella!
