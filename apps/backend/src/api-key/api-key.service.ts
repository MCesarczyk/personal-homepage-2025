import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import { PrismaService } from '../prisma.service';
import { ApiKeyDataDto } from './dto/api-key-data.dto';

@Injectable()
export class ApiKeyService {
  private readonly saltRounds = 10;

  constructor(private prisma: PrismaService) {}

  async generateApiKey(userId: string, description?: string): Promise<string> {
    const rawApiKey = randomBytes(32).toString('hex');

    const hashedKey = await bcrypt.hash(rawApiKey, this.saltRounds);

    await this.prisma.apiKey.create({
      data: {
        userId,
        keyHash: hashedKey,
        description,
        isActive: true,
        createdAt: new Date(),
        lastUsedAt: null,
      },
    });

    return rawApiKey;
  }

  async validateApiKey(rawApiKey: string): Promise<boolean> {
    const apiKeys = await this.prisma.apiKey.findMany({
      where: { isActive: true },
    });

    for (const apiKey of apiKeys) {
      const isMatch = await bcrypt.compare(rawApiKey, apiKey.keyHash);

      if (isMatch) {
        await this.prisma.apiKey.update({
          where: { id: apiKey.id },
          data: {
            lastUsedAt: new Date(),
          },
        });
        return true;
      }
    }

    return false;
  }

  async getKeyInfo(rawApiKey: string): Promise<any> {
    const apiKeys = await this.prisma.apiKey.findMany({
      where: { isActive: true },
    });

    for (const apiKey of apiKeys) {
      const isMatch = await bcrypt.compare(rawApiKey, apiKey.keyHash);

      if (isMatch) {
        return {
          userId: apiKey.userId,
          keyId: apiKey.id,
          description: apiKey.description,
        };
      }
    }

    throw new UnauthorizedException('Invalid API key');
  }

  async revokeApiKey(userId: string, keyId: string): Promise<void> {
    await this.prisma.apiKey.update({
      where: { userId, id: keyId },
      data: { isActive: false },
    });
  }

  async listUserApiKeys(userId: string): Promise<ApiKeyDataDto[]> {
    return this.prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        description: true,
        isActive: true,
        createdAt: true,
        lastUsedAt: true,
      },
    });
  }

  async findById(userId: string, keyId: string) {
    return this.prisma.apiKey.findUnique({ where: { id: keyId, userId } });
  }

  async rotateApiKey(userId: string, keyId: string): Promise<string> {
    const newRawApiKey = randomBytes(32).toString('hex');
    const newHashedKey = await bcrypt.hash(newRawApiKey, this.saltRounds);

    await this.prisma.apiKey.update({
      where: { id: keyId, userId },
      data: {
        keyHash: newHashedKey,
        createdAt: new Date(),
        lastUsedAt: null,
      },
    });

    return newRawApiKey;
  }
}
