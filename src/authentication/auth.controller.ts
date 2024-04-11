import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto, RegisterResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  public async register(): Promise<RegisterResponseDto> {
    const user = await this.authService.register();

    return {
      id:          user.id,
      authToken:   user.authToken,
      accessToken: user.accessToken,
    };
  }

  @Post('login')
  public login(@Body() payload: LoginDto): Promise<string> {
    return this.authService.login(payload);
  }
}