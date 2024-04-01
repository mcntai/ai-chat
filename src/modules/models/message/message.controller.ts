import { Controller, Get, Post, Req, Query, Body } from '@nestjs/common';
import { UseGuards, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageService } from 'modules/models/message/message.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Message } from 'modules/models/message/message.entity';
import { Request, Express } from 'express';
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
  @UseInterceptors(FileInterceptor('attachment'))
  public createMessage(
    @Req() req: Request,
    @UploadedFile() attachment: Express.Multer.File,
    @Body(new ValidationPipe({ transform: true })) createMessageDTO: CreateMessageDto,
  ): Promise<void> {
    return this.messageService.createMessage(req.user, createMessageDTO, attachment);
  }
}