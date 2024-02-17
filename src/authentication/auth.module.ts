import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigService } from 'config/app/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthHelper } from './auth.helper';
import { User } from 'models/users/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService) => ({
        secret: appConfig.jwtSecret,
        signOptions: { expiresIn: appConfig.jwtExpiresIn },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, AuthHelper, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}