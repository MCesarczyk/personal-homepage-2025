import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  controllers: [ApiKeyController],
  providers: [
    ApiKeyService,
    PrismaService,
    {
      provide: 'API_KEY_GUARD',
      useClass: ApiKeyGuard,
    },
  ],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
