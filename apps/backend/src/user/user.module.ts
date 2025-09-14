import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { TechnologyService } from '../technology/technology.service';

@Module({
  providers: [UserService, PrismaService, AuthService, TechnologyService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
