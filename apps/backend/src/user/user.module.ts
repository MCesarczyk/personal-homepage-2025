import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { TechnologyService } from '../technology/technology.service';
import { UserPublicController } from 'src/user/user-public.controller';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Module({
  providers: [
    UserService,
    PrismaService,
    AuthService,
    TechnologyService,
    ApiKeyService,
  ],
  controllers: [UserController, UserPublicController],
  exports: [UserService],
})
export class UserModule {}
