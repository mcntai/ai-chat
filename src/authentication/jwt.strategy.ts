import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'config/app/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'modules/user/user.entity';
import { AuthHelper } from './auth.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: AppConfigService, private readonly authHelper: AuthHelper) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  protected validate(payload: { id: string, authToken: string }): Promise<User | null> {
    return this.authHelper.findUser(payload);
  }
}