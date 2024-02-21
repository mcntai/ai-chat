import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthHelper } from './auth.helper';
import { AppConfigModule } from 'config/app/config.module';
import { AppConfigService } from 'config/app/config.service';
import { User } from 'modules/user/user.entity';
import { UserModule } from 'modules/user/user.module';
import { UserRepository } from 'modules/user/user.repository';
import { Repository } from 'typeorm';

@Module({
  imports:   [
    AppConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject:     [AppConfigService],
      imports:    [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret:      appConfigService.jwtSecret,
        signOptions: { expiresIn: appConfigService.jwtExpiresIn },
      }),
    }),
  ],
  providers: [
    UserRepository,
    AuthService,
    JwtStrategy,
    {
      provide:    AuthHelper,
      useFactory: (userRepository: UserRepository, jwtService: JwtService, appConfigService: AppConfigService) =>
                    new AuthHelper(userRepository, jwtService, appConfigService.jwtSecret),
      inject:     [getRepositoryToken(User), JwtService, AppConfigService, UserRepository],
    },
  ],

  controllers: [AuthController],
})
export class AuthModule {
}