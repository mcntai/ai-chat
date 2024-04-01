import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'modules/models/message/message.repository';
import { Message } from 'modules/models/message/message.entity';
import { UserService } from 'modules/models/user/user.service';
import { AiService } from 'modules/ai/ai.service';
import { ChatService } from 'modules/models/chat/chat.service';
import { argumentsAssert } from 'common/errors';
import { InputType } from 'common/constants/message';
import { MinioClientService } from 'providers/fs/minio/minio-client.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userService: UserService,
    private readonly aiService: AiService,
    private readonly chatService: ChatService,
    private readonly fileService: MinioClientService,
  ) {
  }

  public getMessages(chatId): Promise<Message[]> {
    return this.messageRepository.findAll({ where: { chatId } });
  }

  private getMessagesHistory(chatId): Promise<Message[]> {
    return this.messageRepository.findAll({
      where:  { 'chat.id': chatId, attachment: null },
      select: ['text', 'actor'],
      order:  { created: 'ASC' },
    });
  }

  private async validateChatOwnership(user, chatId): Promise<void> {
    const chat = await this.chatService.getChatByCriteria({ id: chatId, 'owner.id': user.id });

    argumentsAssert(chat, 'Invalid chatId provided');
  }

  // private createImageRecognitionMessage(user, payload): Promise<Message> {
  //   const { chatId, attachmentType, attachment } = payload;
  // }
  //
  // private createImageGenerationMessage(user, payload): Promise<Message> {
  //   const { chatId, attachmentType, attachment } = payload;
  // }

  public async createMessage(user, payload, attachment): Promise<void> {
    const { chatId, text, subscribed, attachmentType } = payload;

    await this.fileService.upload(attachment);

    // if (chatId) {
    //   await this.validateChatOwnership(user, chatId);
    //
    //   return this.messageRepository.create({});
    // }
    //
    // const inputType = attachmentType ? attachmentType : InputType.TEXT;
    //
    // if (inputType === InputType.TEXT) {
    //   const messages = await this.getMessagesHistory(chatId);
    // }
    //
    // const dbUser = this.userService.getUserById(user.id);
    // const aiClient = this.aiService.getAiService(inputType);
  }
}
