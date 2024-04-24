import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto, RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { pick } from 'common/utils/object';
import { ApiOkResponse, ApiTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  @ApiCreatedResponse({ type: RegisterResponseDto })
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.authService.register(registerDto.addCoins);

    return pick(user, ['id', 'authToken', 'accessToken']);
  }

  @Post('login')
  @ApiOkResponse({
    type:        String,
    description: 'Returns accessToken to be used as a value of Authorization header in the following requests.',
  })
  @ApiBadRequestResponse({ description: 'Invalid authToken' })
  public login(@Body() payload: LoginDto): Promise<string> {
    return this.authService.login(payload);
  }
}