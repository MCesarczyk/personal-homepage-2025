import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiKeyService } from './api-key.service';
import { ApiKeyDataDto } from './dto/api-key-data.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SignedRequest } from '../auth/types';

@ApiBearerAuth()
@ApiTags('api-key')
@Controller('api-key')
@UseGuards(AuthGuard)
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post('generate')
  async generateKey(
    @Req() request: SignedRequest,
    @Body()
    dto: {
      description?: string;
      permissions?: string[];
    },
  ): Promise<{ apiKey: string; message: string }> {
    const rawKey = await this.apiKeyService.generateApiKey(
      request.user.id,
      dto.description,
    );

    return {
      apiKey: rawKey,
      message: 'Save this key securely. It will not be shown again.',
    };
  }

  @Get('list')
  async listUserKeys(@Req() request: SignedRequest): Promise<ApiKeyDataDto[]> {
    return this.apiKeyService.listUserApiKeys(request.user.id);
  }

  @Delete(':keyId')
  async revokeKey(
    @Req() request: SignedRequest,
    @Param('keyId') keyId: string,
  ): Promise<{ message: string }> {
    const apiKey = await this.apiKeyService.findById(request.user.id, keyId);
    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    await this.apiKeyService.revokeApiKey(request.user.id, keyId);
    return { message: 'API key revoked successfully' };
  }

  @Post(':keyId/rotate')
  async rotateKey(
    @Req() request: SignedRequest,
    @Param('keyId') keyId: string,
  ) {
    const apiKey = await this.apiKeyService.findById(request.user.id, keyId);
    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    if (!apiKey.isActive) {
      throw new ForbiddenException('Cannot rotate an inactive API key');
    }

    const newKey = await this.apiKeyService.rotateApiKey(
      request.user.id,
      keyId,
    );

    return {
      apiKey: newKey,
      message: 'API key rotated successfully. Save the new key.',
    };
  }
}
