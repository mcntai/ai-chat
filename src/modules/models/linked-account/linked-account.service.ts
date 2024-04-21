import { Injectable } from '@nestjs/common';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { LinkedAccountRepository } from 'modules/models/linked-account/linked-account.repository';
import { CreateLinkedAccountDto } from 'modules/models/linked-account/linked-account.dto';

@Injectable()
export class LinkedAccountService {
  constructor(
    private readonly linkedAccountRepository: LinkedAccountRepository,
  ) {
  }

  public getLinkedAccounts(user): Promise<LinkedAccount[]> {
    return this.linkedAccountRepository.findAll({ where: { owner: user.id } });
  }

  public createLinkedAccount(user, payload: CreateLinkedAccountDto): Promise<LinkedAccount> {
    const { type, identifier } = payload;

    const criteria = { accountType: type, externalId: identifier };

    const existingAccount = this.linkedAccountRepository.findOne({ where: criteria });

    return existingAccount || this.linkedAccountRepository.create({ ...criteria, owner: user.id });
  }

  public async deleteLinkedAccount(accountId: string): Promise<void> {
    await this.linkedAccountRepository.delete(accountId);
  }
}
