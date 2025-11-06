import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';
import { setupSwaggerDocs } from './docs/setup-swagger-docs';

const port = process.env.BACKEND_PORT || 5000;
const publicUrl = process.env.PUBLIC_URL || 'http://localhost:5000';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
const adminUrl = process.env.ADMIN_URL || 'http://localhost:4300';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });
  app.enableCors({
    origin: [publicUrl, frontendUrl, adminUrl],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.use(cookieParser());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', adminUrl);
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.sendStatus(204);
    } else {
      next();
    }
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwaggerDocs(app);

  await app.listen(port, '0.0.0.0', () => {
    console.log(`API listening on port ${port} 🚀🚀🚀`);
  });
}
bootstrap();
