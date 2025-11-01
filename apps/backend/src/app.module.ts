import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtProtectedModule } from './docs/jwt-protected.module';
import { ApiKeyProtectedModule } from './docs/api-key-protected.module';

@Module({
  imports: [JwtProtectedModule, ApiKeyProtectedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
