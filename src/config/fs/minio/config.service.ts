import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioConfigService {
  constructor(private configService: ConfigService) {
  }

  get bucket(): string {
    return this.configService.get<string>('minio.bucket');
  }

  get host(): string {
    return this.configService.get<string>('minio.host');
  }

  get port(): number {
    return Number(this.configService.get<string>('minio.port'));
  }

  get accessKey(): string {
    return this.configService.get<string>('minio.accessKey');
  }

  get secretKey(): string {
    return this.configService.get<string>('minio.secretKey');
  }
}