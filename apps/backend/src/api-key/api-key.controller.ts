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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { ApiKeyService } from './api-key.service';
import { ApiKeyDataDto } from './dto/api-key-data.dto';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { CreateApiKeyResponseDto } from './dto/create-api-key-response.dto';
import { RevokeApiKeyResponseDto } from './dto/revoke-api-key-response.dto';
import { RotateApiKeyResponseDto } from './dto/rotate-api-key-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SignedRequest } from '../auth/types';

@ApiBearerAuth()
@ApiTags('api-key')
@Controller('api-key')
@UseGuards(AuthGuard)
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate API key' })
  @ApiResponse({
    status: 201,
    description: 'An API key has been successfully created.',
    type: CreateApiKeyResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async generateKey(
    @Req() request: SignedRequest,
    @Body()
    dto: CreateApiKeyDto,
  ): Promise<CreateApiKeyResponseDto> {
    const rawKey = await this.apiKeyService.generateApiKey(
      request.user.id,
      dto.description,
      dto.expiresAt,
    );

    return {
      apiKey: rawKey,
      message: 'Save this key securely. It will not be shown again.',
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get user API keys' })
  @ApiResponse({
    status: 200,
    description: 'The user API keys have been successfully retrieved.',
    type: [ApiKeyDataDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async listUserKeys(@Req() request: SignedRequest): Promise<ApiKeyDataDto[]> {
    return this.apiKeyService.listUserApiKeys(request.user.id);
  }

  @Delete(':keyId')
  @ApiOperation({ summary: 'Revoke API key' })
  @ApiResponse({
    status: 200,
    description: 'The API key has been successfully revoked.',
    type: RevokeApiKeyResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async revokeKey(
    @Req() request: SignedRequest,
    @Param('keyId') keyId: string,
  ): Promise<RevokeApiKeyResponseDto> {
    const apiKey = await this.apiKeyService.findById(request.user.id, keyId);
    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    await this.apiKeyService.revokeApiKey(request.user.id, keyId);
    return { message: 'API key revoked successfully' };
  }

  @Post(':keyId/rotate')
  @ApiOperation({ summary: 'Rotate API key' })
  @ApiResponse({
    status: 201,
    description: 'The API key has been successfully rotated.',
    type: RotateApiKeyResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async rotateKey(
    @Req() request: SignedRequest,
    @Param('keyId') keyId: string,
  ): Promise<RotateApiKeyResponseDto> {
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
