import { Module } from '@nestjs/common';
import { LinkedAccountService } from './linked-account.service';

@Module({
  providers: [LinkedAccountService],
})
export class LinkedAccountModule {
}