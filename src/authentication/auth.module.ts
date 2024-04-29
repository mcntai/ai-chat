import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from 'config/configs.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthHelper } from './auth.helper';
import { AppConfigService } from 'config/app/config.service';
import { UserModule } from 'modules/models/user/user.module';
import { User } from 'modules/models/user/user.entity';
import { UserRepository } from 'modules/models/user/user.repository';

@Module({
  imports:   [
    ConfigsModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject:     [AppConfigService],
      imports:    [ConfigsModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret:      appConfigService.jwtSecret,
        signOptions: { expiresIn: appConfigService.jwtExpiresIn },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide:    AuthHelper,
      useFactory: (userRepository: UserRepository, jwtService: JwtService, config: AppConfigService) =>
                    new AuthHelper(userRepository, jwtService, config.jwtSecret, config.jwtExpiresIn),
      inject:     [getRepositoryToken(User), JwtService, AppConfigService, UserRepository],
    },
  ],

  controllers: [AuthController],
})
export class AuthModule {
}