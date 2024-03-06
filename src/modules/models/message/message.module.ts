import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'modules/models/message/message.service';
import { Message } from 'modules/models/message/message.entity';
import { MessageRepository } from 'modules/models/message/message.repository';
import { MessageController } from 'modules/models/message/message.controller';
import { CommonModule } from 'modules/common/common.module';
import { OwnershipGuard } from 'common/guards';

@Module({
  imports:     [TypeOrmModule.forFeature([Message]), CommonModule],
  controllers: [MessageController],
  providers:   [MessageRepository, MessageService, OwnershipGuard],
})
export class MessageModule {
}