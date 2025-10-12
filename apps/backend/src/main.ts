import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';

const port = process.env.BACKEND_PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });
  app.enableCors({
    origin: [
      process.env.PUBLIC_URL || 'http://localhost:5000',
      process.env.FRONTEND_URL || 'http://localhost:4200',
      process.env.ADMIN_URL || 'http://localhost:4300',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.use(cookieParser());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Origin',
        process.env.ADMIN_URL || 'http://localhost:4300',
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.sendStatus(204);
    } else {
      next();
    }
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Personal Homepage API')
    .setDescription(
      `Backend for Personal Homepage website. Available here: ${process.env.PUBLIC_URL}.`,
    )
    .setVersion('1.0')
    .addServer(`${process.env.PUBLIC_URL}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0', () => {
    console.log(`API listening on port ${port} 🚀🚀🚀`);
  });
}
bootstrap();
