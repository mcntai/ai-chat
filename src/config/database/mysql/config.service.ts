import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toBoolean } from 'common/utils/normalize';

@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {
  }

  get host(): string {
    return this.configService.get<string>('mysql.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('mysql.port'));
  }

  get username(): string {
    return this.configService.get<string>('mysql.username');
  }

  get password(): string {
    return this.configService.get<string>('mysql.password');
  }

  get database(): string {
    return this.configService.get<string>('mysql.database');
  }

  get synchronize(): boolean {
    return toBoolean(this.configService.get<boolean>('mysql.synchronize'));
  }

  get logging(): boolean {
    return toBoolean(this.configService.get<boolean>('mysql.logging'));
  }

  get entitiesPath(): string {
    return this.configService.get<string>('mysql.entitiesPath');
  }
}