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
import { User } from 'modules/models/user/user.entity';
import { UserRepository } from 'modules/models/user/user.repository';

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
      useFactory: (userRepository: UserRepository, jwtService: JwtService, config: AppConfigService) =>
                    new AuthHelper(userRepository, jwtService, config.jwtSecret, config.jwtExpiresIn),
      inject:     [getRepositoryToken(User), JwtService, AppConfigService, UserRepository],
    },
  ],

  controllers: [AuthController],
})
export class AuthModule {
}