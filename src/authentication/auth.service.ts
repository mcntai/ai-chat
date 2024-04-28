import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register.dto';
import { argumentsAssert } from 'common/errors';
import { User } from 'modules/models/user/user.entity';
import { AuthHelper } from './auth.helper';
import { UserRepository } from 'modules/models/user/user.repository';

const DEFAULT_COINS_QTY = 3;

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authHelper: AuthHelper
    ) {
  }

  private generateAccessToken(user: User): string {
    const payload = { id: user.id, authToken: user.authToken };

    return this.authHelper.encode(payload, { shouldExpire: true });
  }

  public async register(addCoins: boolean): Promise<RegisterResponseDto> {
    const user = new User();

    if (addCoins) {
      user.coins = DEFAULT_COINS_QTY;
    }

    const registeredUser = await this.userRepository.create(user);

    user.authToken = this.authHelper.encode({ id: registeredUser.id });
    user.id = registeredUser.id;

    await this.userRepository.update(user);

    return Object.assign(user, { accessToken: this.generateAccessToken(user) });
  }

  public async login(body: LoginDto): Promise<string> {
    const { authToken }: LoginDto = body;

    const decoded: { [key: string]: any } = this.authHelper.decode(authToken);

    const user: User = await this.userRepository.findById(decoded.id);

    argumentsAssert(user, 'Invalid authToken');

    return this.generateAccessToken(user);
  }
}