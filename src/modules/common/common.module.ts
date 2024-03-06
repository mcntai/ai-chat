import { Module } from '@nestjs/common';
import { CommonService } from 'modules/common/common.service';
import { ChatRepository } from 'modules/models/chat/chat.repository';
import { Chat } from 'modules/models/chat/chat.entity';
import { LinkedAccountRepository } from 'modules/models/linked-account/linked-account.repository';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, LinkedAccount])],
  providers: [CommonService, ChatRepository, LinkedAccountRepository],
  exports: [CommonService],
})
export class CommonModule {
}