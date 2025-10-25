import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { AuthModule } from './auth/auth.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { UserModule } from './user/user.module';
import { TechnologyModule } from './technology/technology.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { ProjectImageModule } from './project-image/project-image.module';

@Module({
  imports: [
    HealthCheckModule,
    AuthModule,
    ApiKeyModule,
    UserModule,
    TechnologyModule,
    SkillModule,
    ProjectModule,
    ProjectImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
