import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterResponseDto } from './dto/auth.dto';
import { argumentsAssert } from 'common/errors';
import { User } from 'models/users/entities/user.entity';
import { AuthHelper } from './auth.helper';
import { UsersRepository } from 'models/users/users.repository';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: UsersRepository;

  @Inject(AuthHelper)
  private readonly authHelper: AuthHelper;

  private generateAccessToken(user: User): string {
    const payload = { id: user.id, authToken: user.authToken };
    const shouldExpire = true;

    return this.authHelper.encode(payload, shouldExpire);
  }

  async register(): Promise<RegisterResponseDto> {
    const user = new User();
    const registeredUser = await this.userRepository.create(user);

    user.authToken = this.authHelper.encode(registeredUser.id);
    user.id = registeredUser.id;

    await this.userRepository.update(user);

    return Object.assign(user, { accessToken: this.generateAccessToken(user) });
  }

  async login(body: LoginDto): Promise<string> {
    const { authToken }: LoginDto = body;

    const userId: string = this.authHelper.decode(authToken);

    const user: User = await this.userRepository.findById(userId);

    argumentsAssert(user, 'Invalid authToken');

    return this.generateAccessToken(user);
  }
}