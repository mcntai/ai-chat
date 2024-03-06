import { Injectable } from '@nestjs/common';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { LinkedAccountRepository } from 'modules/models/linked-account/linked-account.repository';
import { CreateLinkedAccountDTO } from 'modules/models/linked-account/linked-account.dto';

@Injectable()
export class LinkedAccountService {
  constructor(
    private readonly linkedAccountRepository: LinkedAccountRepository,
  ) {
  }

  public getLinkedAccounts(user): Promise<LinkedAccount[]> {
    return this.linkedAccountRepository.findAll({ where: { owner: user } });
  }

  public createLinkedAccount(user, payload: CreateLinkedAccountDTO): Promise<LinkedAccount> {
    const { type, identifier } = payload;

    return this.linkedAccountRepository.create({
      accountType: type,
      externalId:  identifier,
      owner:       user,
    });
  }

  public async deleteLinkedAccount(accountId: string): Promise<void> {
    await this.linkedAccountRepository.delete(accountId);
  }

  public exists(criteria: any): Promise<boolean> {
    return this.linkedAccountRepository.exists(criteria);
  }
}
