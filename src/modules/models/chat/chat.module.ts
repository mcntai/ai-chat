import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from 'modules/models/chat/chat.service';
import { ChatController } from 'modules/models/chat/chat.controller';
import { Chat } from 'modules/models/chat/chat.entity';
import { ChatRepository } from 'modules/models/chat/chat.repository';
import { CommonModule } from 'modules/common/common.module';
import { OwnershipGuard } from 'common/guards';

@Module({
  imports:     [TypeOrmModule.forFeature([Chat]), CommonModule],
  controllers: [ChatController],
  providers:   [ChatRepository, ChatService, OwnershipGuard],
  exports:     [ChatService],
})
export class ChatModule {
}