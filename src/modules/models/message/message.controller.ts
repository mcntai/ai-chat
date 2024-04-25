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
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { MessageResponseDto } from 'modules/models/message/dto/get-message-response.dto';
import { plainToInstance } from 'class-transformer';
import { REQUEST_HEADERS, RESPONSE_OPTIONS } from 'common/constants/swagger';
import { AVAILABLE_FILE_FORMATS } from 'common/constants/message';
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ImageTypeValidationPipe } from 'modules/models/message/pipes/image-type-validation.pipe';

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
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiOkResponse({ type: MessageResponseDto, isArray: true })
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND_BY_CHAT_ID)
  public async getMessages(
    @Req() req: Request,
    @Query('chatId') chatId: string,
  ): Promise<MessageResponseDto[]> {
    const messages = await this.messageService.getMessages(chatId);

    return plainToInstance(MessageResponseDto, messages);
  }

  @Post('text-completion')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiCreatedResponse(RESPONSE_OPTIONS.STREAM)
  @ApiBadRequestResponse(RESPONSE_OPTIONS.NO_BALANCE)
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND_BY_CHAT_ID)
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
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiOkResponse({ type: String, description: 'Returns the URL to the generated image' })
  @ApiBadRequestResponse(RESPONSE_OPTIONS.NO_BALANCE)
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND_BY_CHAT_ID)
  public generateImage(
    @Req() req: Request,
    @Body() generateImageDto: GenerateImageDto,
  ): Promise<string> {
    return this.messageService.generateImage(req.user, generateImageDto);
  }

  @Post('image-scanner')
  @UseGuards(JwtAuthGuard, OwnershipGuard, BalanceCheckGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: ScanImageDto })
  @ApiCreatedResponse(RESPONSE_OPTIONS.STREAM)
  @ApiBadRequestResponse(RESPONSE_OPTIONS.NO_BALANCE)
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND_BY_CHAT_ID)
  @ApiUnprocessableEntityResponse(RESPONSE_OPTIONS.UNPROCESSABLE_ENTITY)
  public async scanImage(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: new RegExp(AVAILABLE_FILE_FORMATS.join('|')) })
        .addMaxSizeValidator({ maxSize: TWENTY_MB, message: TWENTY_MB_ERROR })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
      ImageTypeValidationPipe,
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
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiOkResponse({ type: Object, description: 'Returns the handler configuration object' })
  public getActiveHandlerConfig(@Query('aiType') query: ActiveAssistantConfigDto): Promise<any> {
    return this.messageService.getActiveHandlerConfig(query.aiType);
  }
}