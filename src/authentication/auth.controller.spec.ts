import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'modules/models/user/user.entity';
import { UserRepository } from 'modules/models/user/user.repository';
import { AuthHelper } from 'authentication/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'config/app/config.service';
import { AppConfigModule } from 'config/app/config.module';
import { MysqlConfigModule } from 'config/database/mysql/config.module';
import { MysqlConfigService } from 'config/database/mysql/config.service';
import { DatabaseType } from 'typeorm';
import { join } from 'path';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports:     [
        AppConfigModule,
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRootAsync({
          imports:    [MysqlConfigModule],
          useFactory: (mysqlConfigService: MysqlConfigService) => ({
            type:        'mysql' as DatabaseType,
            host:        mysqlConfigService.host,
            port:        mysqlConfigService.port,
            username:    mysqlConfigService.username,
            password:    mysqlConfigService.password,
            database:    mysqlConfigService.database,
            entities:    [join(process.cwd(), 'src/**/*.entity.ts')],
            synchronize: true,
          }),
          inject:     [MysqlConfigService],
        } as TypeOrmModuleAsyncOptions),
      ],
      controllers: [AuthController],
      providers:   [
        AuthService,
        UserRepository,
        JwtService,
        {
          provide:    AuthHelper,
          useFactory: (userRepository: UserRepository, jwtService: JwtService) =>
                        new AuthHelper(userRepository, jwtService, 'secret', '1h'),
          inject:     [getRepositoryToken(User), JwtService, AppConfigService, UserRepository],
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    let authToken: string;

    it('should register user and return id and tokens', async () => {
      const response = await authController.register({ addCoins: true });

      authToken = response.authToken;

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('authToken');
      expect(response).toHaveProperty('accessToken');
    });

    describe('login', () => {
      it('should return an accessToken', async () => {
        const response = await authController.login({ authToken });

        expect(typeof response).toBe('string');
      });
    });
  });
});