import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LinkedAccountsModule } from 'models/linked-accounts/linked-accounts.module';
import { LinkedAccountsService } from 'models/linked-accounts/linked-accounts.service';

@Module({
  imports:   [UsersModule, LinkedAccountsModule],
  providers: [LinkedAccountsService],
})
export class ModelsModule {
}
