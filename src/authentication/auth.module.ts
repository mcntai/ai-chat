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
import { User } from 'models/users/entities/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [AppConfigService],
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecret,
        signOptions: { expiresIn: appConfigService.jwtExpiresIn },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthHelper,
    {
      provide: AuthHelper,
      useFactory: (userRepository: Repository<User>, jwtService: JwtService, appConfigService: AppConfigService) =>
                    new AuthHelper(userRepository, jwtService, appConfigService.jwtSecret),
      inject: [getRepositoryToken(User), JwtService, AppConfigService],
    },
  ],

  controllers: [AuthController],
})
export class AuthModule {}