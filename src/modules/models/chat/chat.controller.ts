import { ChatService } from 'modules/models/chat/chat.service';
import { Controller, Req, Get, Put, Delete, Param, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { Chat } from 'modules/models/chat/chat.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { UpdateChatDTO } from 'modules/models/chat/chat.dto';
import { OwnershipGuard } from 'common/guards';
import { GuardParams } from 'common/decorators/metadata';

@Controller('chats')
@GuardParams({ repository: 'ChatRepository', column: 'id', reqIdentifier: 'id' })
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public getChats(@Req() req: Request): Promise<Chat[]> {
    return this.chatService.getChats(req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public updateChat(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) updateChatDto: UpdateChatDTO,
  ): Promise<Chat> {
    return this.chatService.updateChat(id, updateChatDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public deleteChat(@Req() req: Request, @Param('id') id: string): Promise<void> {
    return this.chatService.deleteChat(id);
  }
}