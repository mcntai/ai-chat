import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'modules/user/user.entity';
import { UserRepository } from 'modules/user/user.repository';
import * as assert from 'assert';

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly jwtSecret: string,
    private readonly jwtExpiresIn: string,
  ) {
    this.jwt = jwtService;
    this.secret = jwtSecret;
    this.expiresIn = jwtExpiresIn;
  }

  encode(payload: any, shouldExpire = false): string {
    assert(payload, 'payload is required');

    const signOptions = shouldExpire ? { expiresIn: this.expiresIn } : {};

    return this.jwt.sign(payload, signOptions);
  }

  decode(token: string): object {
    assert(token, 'token is required');

    return this.jwt.decode(token);
  }

  findUser(payload: { id: string; authToken: string }): Promise<User | null> {
    assert(payload, 'payload is required');
    assert(payload.id, 'payload.id is required');
    assert(payload.authToken, 'payload.authToken is required');

    return this.userRepository.findOne({
      where:  { id: payload.id, authToken: payload.authToken },
      select: ['id'],
    });
  }
}
