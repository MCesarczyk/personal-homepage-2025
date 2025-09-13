import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { ProjectImageModule } from './project-image/project-image.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { TechnologyModule } from 'src/technology/technology.module';

@Module({
  imports: [
    HealthCheckModule,
    AuthModule,
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
