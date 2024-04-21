import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto, RegisterResponseDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { pick } from 'common/utils/object';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  public async register(
    @Body(new ValidationPipe({ transform: true })) registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.authService.register(registerDto.addCoins);

    return pick(user, ['id', 'authToken', 'accessToken']);
  }

  @Post('login')
  public login(@Body() payload: LoginDto): Promise<string> {
    return this.authService.login(payload);
  }
}