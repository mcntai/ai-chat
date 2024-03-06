import { Controller, Get, Post, Req, Query, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { MessageService } from 'modules/models/message/message.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Message } from 'modules/models/message/message.entity';
import { Request } from 'express';
import { CreateMessageDto } from 'modules/models/message/message.dto';
import { GuardParams } from 'common/decorators/metadata';
import { OwnershipGuard } from 'common/guards';

@Controller('messages')
@GuardParams({ repository: 'ChatRepository', column: 'id', reqIdentifier: 'chatId' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public getMessages(@Req() req: Request, @Query('chatId') chatId: string): Promise<Message[]> {
    return this.messageService.getMessages(chatId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public createMessage(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) createMessageDTO: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageDTO);
  }
}