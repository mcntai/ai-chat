import { Module } from '@nestjs/common';
import { LinkedAccountsService } from './linked-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedAccountsRepository } from './linked-accounts.repository';

@Module({
  imports:   [TypeOrmModule.forFeature([LinkedAccountsRepository])],
  providers: [LinkedAccountsService],
  exports:   [LinkedAccountsService],
})
export class LinkedAccountsModule {
}