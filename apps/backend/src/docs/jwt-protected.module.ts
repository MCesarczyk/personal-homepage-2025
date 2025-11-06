import { Module } from '@nestjs/common';

import { ApiKeyController } from '../api-key/api-key.controller';
import { ApiKeyModule } from '../api-key/api-key.module';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { ProjectImageController } from '../project-image/project-image.controller';
import { ProjectImageModule } from '../project-image/project-image.module';
import { ProjectController } from '../project/project.controller';
import { ProjectModule } from '../project/project.module';
import { SkillController } from '../skill/skill.controller';
import { SkillModule } from '../skill/skill.module';
import { TechnologyController } from '../technology/technology.controller';
import { TechnologyModule } from '../technology/technology.module';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    AuthModule,
    ApiKeyModule,
    UserModule,
    TechnologyModule,
    SkillModule,
    ProjectModule,
    ProjectImageModule,
  ],
  controllers: [
    AuthController,
    ApiKeyController,
    UserController,
    TechnologyController,
    SkillController,
    ProjectController,
    ProjectImageController,
  ],
  providers: [],
})
export class JwtProtectedModule {}
