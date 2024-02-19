import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'models/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InvalidArgumentsError } from 'common/errors';
import * as assert from 'assert';

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;
  private readonly secret: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly jwtSecret: string,
  ) {
    this.jwt = jwtService;
    this.secret = jwtSecret;
  }

  encode(payload: any, shouldExpire = false): string {
    assert(payload, 'payload is required');

    const signOptions = shouldExpire ? { expiresIn: '1h' } : {};

    return this.jwt.sign(payload, signOptions);
  }

  decode(token: string): string {
    assert(token, 'token is required');

    return this.jwt.decode(token);
  }

  verify(token: string): any {
    assert(token, 'token is required');

    try {
      return this.jwt.verify(token);
    } catch (error) {
      throw new InvalidArgumentsError('Invalid token');
    }
  }

  findUser(payload: { id: string; authToken: string }): Promise<User | null> {
    assert(payload, 'payload is required');
    assert(payload.id, 'payload.id is required');
    assert(payload.authToken, 'payload.authToken is required');

    return this.userRepository.findOne({ where: payload });
  }
}
