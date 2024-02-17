import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'models/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InvalidArgumentsError } from 'common/errors';
import { AppConfigService } from 'config/app/config.service';

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;
  private readonly secret: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: AppConfigService,
    jwt: JwtService,
  ) {
    this.jwt = jwt;
    this.secret = configService.jwtSecret;
  }

  encode(payload: any, shouldExpire = false): string {
    const signOptions = shouldExpire ? { expiresIn: '1h' } : {};

    return this.jwt.sign(payload, signOptions);
  }

  decode(token: string): string {
    return this.jwt.decode(token);
  }

  verify(token: string): any {
    try {
      return this.jwt.verify(token);
    } catch (error) {
      throw new InvalidArgumentsError('Invalid token');
    }
  }

  findUser(payload: { id: string, authToken: string }): Promise<User | null> {
    return this.userRepository.findOne({ where: payload });
  }
}