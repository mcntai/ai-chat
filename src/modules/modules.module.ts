import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { LinkedAccountModule } from 'modules/linked-account/linked-account.module';
import { ChatModule } from 'modules/chat/chat.module';
import { MessageModule } from 'modules/message/message.module';
import { LinkedAccountService } from 'modules/linked-account/linked-account.service';

@Module({
  imports:   [UserModule, LinkedAccountModule, ChatModule, MessageModule],
  providers: [LinkedAccountService],
})
export class ModulesModule {
}
