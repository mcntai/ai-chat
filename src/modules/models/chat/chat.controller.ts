import { ChatService } from 'modules/models/chat/chat.service';
import { Controller, Req, Get, Put, Delete, Param, Body, UseGuards, Query, HttpCode } from '@nestjs/common';
import { Chat } from 'modules/models/chat/chat.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { UpdateChatDto } from 'modules/models/chat/chat.dto';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GuardParams } from 'common/decorators/metadata';
import { ApiTags } from '@nestjs/swagger';

@Controller('chats')
@ApiTags('Chats')
@GuardParams({ repository: 'ChatRepository', column: 'id', reqIdentifier: 'id' })
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public getChats(
    @Req() req: Request,
    @Query('archived') archived: boolean,
  ): Promise<Chat[]> {
    return this.chatService.getChats(req.user, archived);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public getChat(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Chat> {
    return this.chatService.getChatByCriteria({ id });
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