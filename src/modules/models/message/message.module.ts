import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'modules/models/message/message.service';
import { Message } from 'modules/models/message/message.entity';
import { MessageRepository } from 'modules/models/message/message.repository';
import { MessageController } from 'modules/models/message/message.controller';
import { CommonModule } from 'modules/common/common.module';
import { UserModule } from 'modules/models/user/user.module';
import { ChatModule } from 'modules/models/chat/chat.module';
import { AiModule } from 'modules/ai/ai.module';
import { MinioClientModule } from 'providers/fs/minio/minio-client.module';

@Module({
  imports:     [
    TypeOrmModule.forFeature([Message]),
    MinioClientModule,
    CommonModule,
    UserModule,
    ChatModule,
    AiModule,
  ],
  controllers: [MessageController],
  providers:   [MessageRepository, MessageService],
})
export class MessageModule {
}