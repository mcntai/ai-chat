import { ChatService } from 'modules/models/chat/chat.service';
import { Controller, Req, Get, Put, Delete, Param, Body, UseGuards, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'authentication/auth.guard';
import { ChatUpdatedResponseDto, UpdateChatDto } from 'modules/models/chat/chat.dto';
import { ChatBaseResponseDto, ChatWithMessagesResponseDto } from 'modules/models/chat/chat.dto';
import { OwnershipGuard } from 'common/guards/ownership.guard';
import { GuardParams } from 'common/decorators/metadata';
import { ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiTags, ApiBody, ApiHeader } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { RESPONSE_OPTIONS, REQUEST_HEADERS } from 'common/constants/swagger';

@Controller('chats')
@ApiTags('Chats')
@GuardParams({ repository: 'ChatRepository', column: 'id', reqIdentifier: 'id' })
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiOkResponse({ type: ChatBaseResponseDto, isArray: true })
  public getChats(
    @Req() req: Request,
    @Query('archived') archived: boolean,
  ): Promise<ChatBaseResponseDto[]> {
    return this.chatService.getChats(req.user, archived);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiOkResponse({ type: ChatWithMessagesResponseDto })
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND)
  public async getChat(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ChatWithMessagesResponseDto> {
    const chat = await this.chatService.getChatByCriteria({ id });

    return plainToInstance(ChatWithMessagesResponseDto, chat);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiBody({ type: UpdateChatDto })
  @ApiOkResponse({ type: ChatUpdatedResponseDto })
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND)
  public updateChat(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
  ): Promise<ChatUpdatedResponseDto> {
    return this.chatService.updateChat(id, updateChatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiHeader(REQUEST_HEADERS.AUTHORIZATION)
  @ApiNoContentResponse({ description: 'Resource deleted' })
  @ApiNotFoundResponse(RESPONSE_OPTIONS.NOT_FOUND)
  public async deleteChat(@Req() req: Request, @Param('id') id: string): Promise<void> {
    await this.chatService.deleteChat(id);
  }
}