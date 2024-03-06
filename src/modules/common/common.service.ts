import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'modules/models/chat/chat.repository';
import { LinkedAccountRepository } from 'modules/models/linked-account/linked-account.repository';
import { argumentsAssert } from 'common/errors';

@Injectable()
export class CommonService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly linkedAccountRepository: LinkedAccountRepository,
  ) {
  }

  private getRepository(repoName: string): ChatRepository | LinkedAccountRepository {
    const ReposMap = {
      ChatRepository:          this.chatRepository,
      LinkedAccountRepository: this.linkedAccountRepository,
    };

    const repository = ReposMap[repoName];

    argumentsAssert(repository, `Repository for ${repoName} not found`);

    return repository;
  }

  public entityExists(repoName: string, criteria: any): Promise<boolean> {
    const repository = this.getRepository(repoName);

    return repository.exists(criteria);
  }
}