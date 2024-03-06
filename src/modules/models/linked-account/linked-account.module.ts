import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedAccountService } from './linked-account.service';
import { LinkedAccountRepository } from './linked-account.repository';
import { LinkedAccountController } from './linked-account.controller';
import { LinkedAccount } from './linked-account.entity';
import { CommonModule } from 'modules/common/common.module';
import { OwnershipGuard } from 'common/guards';

@Module({
  imports:     [TypeOrmModule.forFeature([LinkedAccount]), CommonModule],
  controllers: [LinkedAccountController],
  providers:   [LinkedAccountRepository, LinkedAccountService, OwnershipGuard],
  exports:     [LinkedAccountService],
})
export class LinkedAccountModule {
}