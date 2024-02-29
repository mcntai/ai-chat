import { Controller, Inject, Get, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('balance')
  @UseGuards(JwtAuthGuard)
  public getUserBalance(@Req() req: Request): Promise<number> {
    return this.userService.getUserBalance(req.user);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  public deleteUser(@Req() req: Request): Promise<void> {
    return this.userService.deleteUser(req.user);
  }

  @Delete('data')
  @UseGuards(JwtAuthGuard)
  public deleteUserData(@Req() req: Request): Promise<void> {
    return this.userService.deleteUserData(req.user);
  }
}