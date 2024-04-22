import { Controller, Get, Post, Req, Query, Body, Res, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageService } from 'modules/models/message/message.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Message } from 'modules/models/message/message.entity';
import { Request, Response, Express } from 'express';
import { CreateMessageBaseDto } from 'modules/models/message/dto/create-message-base.dto';
import { ActiveAssistantConfigDto } from 'modules/models/message/dto/active-assistant-config.dto';
import { ScanImageDto } from 'modules/models/message/dto/scan-image.dto';
import { GuardParams } from 'common/decorators/metadata';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GenerateImageDto } from 'modules/models/message/dto/generate-image.dto';
import { BalanceCheckGuard } from 'common/guards/balance-check.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

const TWENTY_MB = 20 * 1024 * 1024;
const TWENTY_MB_ERROR = 'File can not be greater than 20 mb';

@ApiTags('Messages')
@Controller('messages')
@GuardParams({ repository: 'ChatRepository', column: 'id', reqIdentifier: 'chatId' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  public getMessages(
    @Req() req: Request,
    @Query('chatId') chatId: string,
  ): Promise<Message[]> {
    return this.messageService.getMessages(chatId);
  }

  @Post('text-completion')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  public async generateText(
    @Req() req: Request,
    @Res() res: Response,
    @Body() textCompletionDto: CreateMessageBaseDto,
  ): Promise<void> {
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
    @Body() generateImageDto: GenerateImageDto,
  ): Promise<string> {
    return this.messageService.generateImage(req.user, generateImageDto);
  }

  @Post('image-scanner')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: ScanImageDto })
  public async scanImage(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|gif|bmp|webp|heif|heic)$/ })
        .addMaxSizeValidator({ maxSize: TWENTY_MB, message: TWENTY_MB_ERROR })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) image: Express.Multer.File,
    @Body() scanImageDto: ScanImageDto,
  ): Promise<void> {
    const stream = await this.messageService.scanImage(req.user, scanImageDto, image);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  }

  @Get('active-handler-config')
  @UseGuards(JwtAuthGuard)
  public getActiveHandlerConfig(@Query('aiType') query: ActiveAssistantConfigDto): Promise<any> {
    return this.messageService.getActiveHandlerConfig(query.aiType);
  }
}