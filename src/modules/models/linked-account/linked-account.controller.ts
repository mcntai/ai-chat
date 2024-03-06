import { Controller, Delete, Get, Inject, Param, Post, Req, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { LinkedAccountService } from 'modules/models/linked-account/linked-account.service';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { CreateLinkedAccountDTO } from 'modules/models/linked-account/linked-account.dto';
import { OwnershipGuard } from 'common/guards';
import { GuardParams } from 'common/decorators/metadata';

@Controller('accounts')
@GuardParams({ repository: 'LinkedAccountRepository', column: 'id', reqIdentifier: 'id' })
export class LinkedAccountController {
  @Inject(LinkedAccountService)
  private readonly linkedAccountService: LinkedAccountService;

  @Get()
  @UseGuards(JwtAuthGuard)
  public getLinkedAccounts(@Req() req: Request): Promise<LinkedAccount[]> {
    return this.linkedAccountService.getLinkedAccounts(req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public createLinkedAccount(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) createLinkedAccountDto: CreateLinkedAccountDTO,
  ): Promise<LinkedAccount> {
    return this.linkedAccountService.createLinkedAccount(req.user, createLinkedAccountDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public deleteLinkedAccount(@Req() req: Request, @Param('id') id: string): Promise<void> {
    return this.linkedAccountService.deleteLinkedAccount(id);
  }
}