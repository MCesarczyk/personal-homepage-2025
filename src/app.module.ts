import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [AuthModule, UserModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
