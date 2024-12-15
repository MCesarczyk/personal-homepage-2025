import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Personal Homepage API - development')
    .setDescription(
      `Backend for Personal Homepage website. Available on: http://localhost:4600/. This API is used to manage the content of the homepage.`,
    )
    .setVersion('1.0')
    .addServer(`http://localhost:4600/`, 'Development')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
