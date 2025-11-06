import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    try {
      const keyInfo = await this.apiKeyService.getKeyInfo(apiKey);

      const payload = {
        id: keyInfo.userId,
      };

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    // @ts-expect-error: Custom header access
    const apiKeyHeader = request.headers['x-api-key'];
    if (Array.isArray(apiKeyHeader)) {
      return apiKeyHeader[0];
    } else if (typeof apiKeyHeader === 'string') {
      return apiKeyHeader;
    }
    return undefined;
  }
}
