import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'modules/models/message/message.service';
import { Message } from 'modules/models/message/message.entity';
import { MessageRepository } from 'modules/models/message/message.repository';
import { MessageController } from 'modules/models/message/message.controller';
import { CommonModule } from 'modules/common/common.module';
import { UserModule } from 'modules/models/user/user.module';
import { ChatModule } from 'modules/models/chat/chat.module';
import { AiAssistantModule } from 'providers/ai-assistant/ai-assistant.module';
import { FsModule } from 'providers/fs/fs.module';

@Module({
  imports:     [
    TypeOrmModule.forFeature([Message]),
    FsModule,
    CommonModule,
    UserModule,
    ChatModule,
    AiAssistantModule,
  ],
  controllers: [MessageController],
  providers:   [MessageRepository, MessageService],
})
export class MessageModule {
}