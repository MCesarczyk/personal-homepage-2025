import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Personal Homepage API - development')
    .setDescription(
      `Backend for Personal Homepage website. Available on: ${process.env.PUBLIC_URL}. This API is used to manage the content of the homepage.`,
    )
    .setVersion('1.0')
    .addServer(`${process.env.PUBLIC_URL}`, 'Development')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0', () => {
    console.log(`API listening on port ${port} 🚀`);
  });
}
bootstrap();
