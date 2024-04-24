import { Controller, Get, Post, Req, Query, Body, Res, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageService } from 'modules/models/message/message.service';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { Request, Response, Express } from 'express';
import { CreateMessageBaseDto } from 'modules/models/message/dto/create-message-base.dto';
import { ActiveAssistantConfigDto } from 'modules/models/message/dto/active-assistant-config.dto';
import { ScanImageDto } from 'modules/models/message/dto/scan-image.dto';
import { GuardParams } from 'common/decorators/metadata';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GenerateImageDto } from 'modules/models/message/dto/generate-image.dto';
import { BalanceCheckGuard } from 'common/guards/balance-check.guard';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDto } from 'modules/models/message/dto/get-message-response.dto';
import { plainToInstance } from 'class-transformer';

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
  @ApiOkResponse({ type: MessageResponseDto, isArray: true })
  public async getMessages(
    @Req() req: Request,
    @Query('chatId') chatId: string,
  ): Promise<MessageResponseDto[]> {
    const messages = await this.messageService.getMessages(chatId);

    return plainToInstance(MessageResponseDto, messages);
  }

  @Post('text-completion')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  @ApiCreatedResponse({
    description: 'Stream of text',
    headers:     {
      'Content-Type': {
        description: 'text/plain',
        schema:      { type: 'string' },
      },
    },
  })
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
  @ApiOkResponse({ type: String, description: 'Returns the URL of the generated image' })
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
  @ApiCreatedResponse({
    description: 'Stream of text',
    headers:     {
      'Content-Type': {
        description: 'text/plain',
        schema:      { type: 'string' },
      },
    },
  })
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
  @ApiOkResponse({ type: Object, description: 'Returns the handler configuration object' })
  public getActiveHandlerConfig(@Query('aiType') query: ActiveAssistantConfigDto): Promise<any> {
    return this.messageService.getActiveHandlerConfig(query.aiType);
  }
}