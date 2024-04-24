import { Controller, Delete, Get, Inject, Param, Post, Req, UseGuards, Body } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { LinkedAccountService } from 'modules/models/linked-account/linked-account.service';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { CreateLinkedAccountDto } from 'modules/models/linked-account/linked-account.dto';
import { CreateLinkedAccountResponseDto } from 'modules/models/linked-account/linked-account.dto';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GuardParams } from 'common/decorators/metadata';
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiHeader } from '@nestjs/swagger';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { REQUEST_HEADERS, RESPONSE_OPTIONS } from 'common/constants/swagger';

@Controller('accounts')
@ApiTags('Linked Accounts')
@GuardParams({ repository: 'LinkedAccountRepository', column: 'id', reqIdentifier: 'id' })
export class LinkedAccountController {
  @Inject(LinkedAccountService)
  private readonly linkedAccountService: LinkedAccountService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiOkResponse({ type: CreateLinkedAccountResponseDto, isArray: true })
  public getLinkedAccounts(@Req() req: Request): Promise<LinkedAccount[]> {
    return this.linkedAccountService.getLinkedAccounts(req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiCreatedResponse({
    type:        CreateLinkedAccountResponseDto,
    description: 'Creates new account for user or returns an existing account with old userId if it exists',
  })
  public createLinkedAccount(
    @Req() req: Request,
    @Body() createLinkedAccountDto: CreateLinkedAccountDto,
  ): Promise<LinkedAccount> {
    return this.linkedAccountService.createLinkedAccount(req.user, createLinkedAccountDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiNoContentResponse({ description: 'Resource deleted' })
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND)
  public async deleteLinkedAccount(@Req() req: Request, @Param('id') id: string): Promise<void> {
    await this.linkedAccountService.deleteLinkedAccount(id);
  }
}