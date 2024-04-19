import { Controller, Get, Post, Req, Query, Body, Res, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { UseGuards, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageService } from 'modules/models/message/message.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Message } from 'modules/models/message/message.entity';
import { Request, Response, Express } from 'express';
import { CreateMessageBaseDto, createMsgValidationSchema } from './dtos/create-message-base.dto';
import { ScanImageDto } from './dtos/scan-image.dto';
import { GuardParams } from 'common/decorators/metadata';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GenerateImageDto } from 'modules/models/message/dtos/generate-image.dto';
import { BalanceCheckGuard } from 'common/guards/balance-check.guard';
import { ACTIVE_AI_TYPE } from 'common/constants/message';
import { activeAssistantConfigSchema } from 'modules/models/message/schemas';

const FIVE_MB = 5 * 1024 * 1024;

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
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  public async generateText(
    @Req() req: Request,
    @Res() res: Response,
    @Body() textCompletionDto: CreateMessageBaseDto,
  ): Promise<void> {
    await createMsgValidationSchema.assert(textCompletionDto);

    const stream = await this.messageService.generateText(req.user, textCompletionDto);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  }

  @Post('image-generation')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  public generateImage(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) generateImageDto: GenerateImageDto,
  ): Promise<string> {
    return this.messageService.generateImage(req.user, generateImageDto);
  }

  @Post('image-scanner')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  @UseInterceptors(FileInterceptor('image'))
  public async scanImage(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ })
        .addMaxSizeValidator({ maxSize: FIVE_MB, message: 'File can not be greater than 5 mb' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) image: Express.Multer.File,
    @Body(new ValidationPipe({ transform: true })) scanImageDto: ScanImageDto,
  ): Promise<void> {
    const stream = await this.messageService.scanImage(req.user, scanImageDto, image);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  }

  @Get('active-handler-config')
  @UseGuards(JwtAuthGuard)
  public async getActiveHandlerConfig(@Query('aiType') aiType: ACTIVE_AI_TYPE): Promise<any> {
    await activeAssistantConfigSchema.assert({ aiType });

    return this.messageService.getActiveHandlerConfig(aiType);
  }
}