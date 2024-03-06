import { Module } from '@nestjs/common';
import { UserModule } from 'modules/models/user/user.module';
import { LinkedAccountModule } from 'modules/models/linked-account/linked-account.module';
import { ChatModule } from 'modules/models/chat/chat.module';
import { MessageModule } from 'modules/models/message/message.module';

@Module({
  imports: [UserModule, LinkedAccountModule, ChatModule, MessageModule],
})
export class ModelsModule {
}
