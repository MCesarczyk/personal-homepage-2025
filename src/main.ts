import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  const options = new DocumentBuilder()
    .setTitle(`${process.env.DOCS_TITLE || 'Your API Title'}`)
    .setDescription(`${process.env.DOCS_DESCRIPTION || 'Your API description'}`)
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT}/`, 'Development')
    .addServer(`${process.env.PRODUCTION_URL}`, 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
