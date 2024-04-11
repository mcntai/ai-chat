import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'modules/models/message/message.repository';
import { Message } from 'modules/models/message/message.entity';
import { UserService } from 'modules/models/user/user.service';
import { AiAssistantService } from 'providers/ai-assistant/ai-assistant.service';
import { ChatService } from 'modules/models/chat/chat.service';
import { FsService } from 'providers/fs/fs.service';
import { TextExtractorStream } from 'providers/ai-assistant/open-ai/text-extractor-stream';
import { ACTIVE_AI_TYPE, ACTOR } from 'common/constants/message';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userService: UserService,
    private readonly aiService: AiAssistantService,
    private readonly chatService: ChatService,
    private readonly fileService: FsService,
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

  private async resolveChatId(user: any, chatId: string, text: string): Promise<string> {
    if (!chatId) {
      const chat = await this.chatService.createChat({
        owner: user,
        name:  text.substring(0, 50),
      });

      return chat.id;
    }

    return chatId;
  }

  private composeFilePath(userId: string, chatId: string): string {
    return `${userId}/${chatId}/${Date.now()}`;
  }

  private async saveMessage(
    chatId: string,
    actor: ACTOR,
    text?: string,
    attachment?: string,
    attachmentType?: string,
  ): Promise<void> {
    await this.messageRepository.create({ text, actor, chat: chatId, attachment, attachmentType });
  }

  public async generateText(user, payload): Promise<TextExtractorStream> {
    const { text, subscribed } = payload;

    const chatId = await this.resolveChatId(user, payload.chatId, text);

    await this.saveMessage(chatId, ACTOR.USER, text);

    const messages = await this.getMessagesHistory(chatId);

    const aiClientHandler = await AiAssistantService.getHandler(ACTIVE_AI_TYPE.TEXT_GENERATOR);

    const stream = await aiClientHandler.process(messages);

    stream.on('end', async aiResponse => {
      await this.saveMessage(chatId, ACTOR.AI, aiResponse);

      if (!subscribed) {
        await this.userService.deductUserBalance(user);
      }
    });

    return stream;
  }

  // 1. логіка перевірки того чи є вже чат айді чи його треба створювати
  // 2. логіка перевірки того чи в юзера взагалі є кредити на те шоб робити запит(це треба десь у валідацію винести)
  // 3. логіка збереження повідомлення в базу
  // 4. логіка виклику сервісу який буде відправляти запит на генерацію картинки
  // 5. логіка збереження картинки в файлову систему
  // 6. логіка збереження відповіді в базу (тобто урла на картинку уже з файлової системи)
  // 7. логіка відправки відповіді користувачу
  public async generateImage(user, payload): Promise<string> {
    const { text, size, subscribed } = payload;

    const chatId = await this.resolveChatId(user, payload.chatId, text);

    await this.saveMessage(chatId, ACTOR.USER, text);

    const aiClientHandler = await AiAssistantService.getHandler(ACTIVE_AI_TYPE.IMAGE_GENERATOR);

    const aiImageUrl = await aiClientHandler.process({ text, size });

    const localImageUrl = await this.fileService.upload({
      fileUrl: aiImageUrl,
      path:    this.composeFilePath(user.id, chatId),
    });

    await this.saveMessage(chatId, ACTOR.AI, localImageUrl);

    return localImageUrl;
  }
}
