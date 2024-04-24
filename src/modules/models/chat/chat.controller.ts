import { ChatService } from 'modules/models/chat/chat.service';
import { Controller, Req, Get, Put, Delete, Param, Body, UseGuards, Query, HttpCode } from '@nestjs/common';
import { Chat } from 'modules/models/chat/chat.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { GetChatBaseResponseDto, GetChatResponseDto, UpdateChatDto } from 'modules/models/chat/chat.dto';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GuardParams } from 'common/decorators/metadata';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('chats')
@ApiTags('Chats')
@GuardParams({ repository: 'ChatRepository', column: 'id', reqIdentifier: 'id' })
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: GetChatBaseResponseDto, isArray: true })
  public getChats(
    @Req() req: Request,
    @Query('archived') archived: boolean,
  ): Promise<GetChatBaseResponseDto[]> {
    return this.chatService.getChats(req.user, archived);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiOkResponse({ type: GetChatResponseDto })
  public async getChat(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<GetChatResponseDto> {
    const chat = await this.chatService.getChatByCriteria({ id });

    return plainToInstance(GetChatResponseDto, chat);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public updateChat(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
  ): Promise<Chat> {
    return this.chatService.updateChat(id, updateChatDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public deleteChat(@Req() req: Request, @Param('id') id: string): Promise<void> {
    return this.chatService.deleteChat(id);
  }
}