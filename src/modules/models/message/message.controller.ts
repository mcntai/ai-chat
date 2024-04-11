import { Controller, Get, Post, Req, Query, Body, Res } from '@nestjs/common';
import { UseGuards, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageService } from 'modules/models/message/message.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Message } from 'modules/models/message/message.entity';
import { Request, Response, Express } from 'express';
import { CreateMessageBaseDto } from './dtos/create-message-base.dto';
import { ScanImageDto } from './dtos/scan-image.dto';
import { GuardParams } from 'common/decorators/metadata';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GenerateImageDto } from 'modules/models/message/dtos/generate-image.dto';

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

  @Post('text-completion')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public async generateText(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ transform: true })) textCompletionDto: CreateMessageBaseDto,
  ): Promise<void> {
    const stream = await this.messageService.generateText(req.user, textCompletionDto);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  }

  @Post('image-generation')
  @UseGuards(JwtAuthGuard)
  public generateImage(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) generateImageDto: GenerateImageDto,
  ): Promise<string> {
    return this.messageService.generateImage(req.user, generateImageDto);
  }
  //
  // @Post('image-recognition')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('attachment'))
  // public scanImage(
  //   @Req() req: Request,
  //   @UploadedFile() attachment: Express.Multer.File,
  //   @Body(new ValidationPipe({ transform: true })) createMessageDto: ScanImageDto,
  // ): Promise<void> {
  //   return this.messageService.recognizeImage(req.user, GenerateImageDto, attachment);
  // }
}