import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto, RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { pick } from 'common/utils/object';
import { ApiResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  @ApiResponse({ status: 201, type: RegisterResponseDto })
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.authService.register(registerDto.addCoins);

    return pick(user, ['id', 'authToken', 'accessToken']);
  }

  @Post('login')
  @ApiOkResponse({ type: 'string' })
  public login(@Body() payload: LoginDto): Promise<string> {
    return this.authService.login(payload);
  }
}