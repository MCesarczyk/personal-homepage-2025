import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [UserService, PrismaService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
