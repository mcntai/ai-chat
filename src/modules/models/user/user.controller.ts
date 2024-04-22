import { Controller, Inject, Get, Delete, Req, UseGuards, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Request } from 'express';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('balance')
  @ApiOkResponse({ schema: { type: 'number' } })
  @UseGuards(JwtAuthGuard)
  public getUserBalance(@Req() req: Request): Promise<number> {
    return this.userService.getUserBalance(req.user);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  public deleteUser(@Req() req: Request): Promise<void> {
    return this.userService.deleteUser(req.user);
  }

  @Delete('data')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  public deleteUserData(@Req() req: Request): Promise<void> {
    return this.userService.deleteUserData(req.user);
  }
}