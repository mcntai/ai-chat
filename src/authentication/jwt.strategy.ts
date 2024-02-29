import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'config/app/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'modules/user/user.entity';
import { AuthHelper } from './auth.helper';
import { UnAuthorizedError } from 'common/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: AppConfigService, private readonly authHelper: AuthHelper) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:    configService.jwtSecret,
    });
  }

  protected async validate(payload: any): Promise<User | null> {
    const user = await this.authHelper.findUser(payload);

    if (!user) {
      throw new UnAuthorizedError('Unauthorized: No such user');
    }

    return user;
  }
}