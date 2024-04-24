import { Controller, Inject, Get, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Request } from 'express';
import { ApiNoContentResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { REQUEST_HEADERS } from 'common/constants/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('balance')
  @ApiOkResponse({ schema: { type: 'number' } })
  @UseGuards(JwtAuthGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  public getUserBalance(@Req() req: Request): Promise<number> {
    return this.userService.getUserBalance(req.user);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiNoContentResponse({ description: 'Resource deleted' })
  public async deleteUser(@Req() req: Request): Promise<void> {
    await this.userService.deleteUser(req.user);
  }

  @Delete('data')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiNoContentResponse({ description: 'Resource deleted' })
  public async deleteUserData(@Req() req: Request): Promise<void> {
    await this.userService.deleteUserData(req.user);
  }
}