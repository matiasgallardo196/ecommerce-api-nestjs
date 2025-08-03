import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder().setTitle('E-Commerce API').setDescription('Ecommerce API for M4-Backend').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    await app.listen(port, host);
    console.log(`Application is running on: https://${host}:${port} produccion`);
  } else {
    await app.listen(port, host);
    console.log(`Application is running on: http://${host}:${port} local`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
