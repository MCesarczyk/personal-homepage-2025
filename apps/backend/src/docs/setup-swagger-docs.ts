import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyProtectedModule } from 'src/docs/api-key-protected.module';
import { JwtProtectedModule } from 'src/docs/jwt-protected.module';

export function setupSwaggerDocs(app: INestApplication) {
  const jwtConfig = new DocumentBuilder()
    .setTitle('Personal Homepage API - Secured')
    .setDescription(
      `Backend for Personal Homepage website. Available here: ${process.env.PUBLIC_URL}. Endpoints secured with JWT`,
    )
    .setVersion('1.0')
    .addServer(`${process.env.PUBLIC_URL}`)
    .addBearerAuth()
    .build();

  const jwtDocument = SwaggerModule.createDocument(app, jwtConfig, {
    include: [JwtProtectedModule],
  });
  SwaggerModule.setup('docs', app, jwtDocument);

  const apiKeyConfig = new DocumentBuilder()
    .setTitle('Personal Homepage API - Public')
    .setDescription(
      `Backend for Personal Homepage website. Available here: ${process.env.PUBLIC_URL}. Public or API key protected endpoints`,
    )
    .setVersion('1.0')
    .addServer(`${process.env.PUBLIC_URL}`)
    .addSecurity('apiKeyAuth', {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
    })
    .build();

  const apiKeyDocument = SwaggerModule.createDocument(app, apiKeyConfig, {
    include: [ApiKeyProtectedModule],
  });
  SwaggerModule.setup('docs-public', app, apiKeyDocument);
}
