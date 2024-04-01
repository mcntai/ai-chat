import { Injectable } from '@nestjs/common';
import { UserRepository } from 'modules/models/user/user.repository';
import { User } from 'modules/models/user/user.entity';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { Chat } from 'modules/models/chat/chat.entity';
import { Message } from 'modules/models/message/message.entity';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private dataSource: DataSource,
  ) {
  }

  private async invokeTransaction(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw new Error('transaction failed: ' + err.message);
    } finally {
      await queryRunner.release();
    }
  }

  private async prepareUserDataRemovalTransaction(userId): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(LinkedAccount)
      .where({ owner: userId })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('chatId IN (:chatIds)', {
        chatIds: queryRunner.manager
                   .createQueryBuilder()
                   .select('chat.id')
                   .from(Chat, 'chat')
                   .where('chat.ownerId = :userId', { userId })
                   .getQuery(),
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Chat)
      .where('ownerId = :userId', { userId })
      .execute();

    return queryRunner;
  }

  public getUserBalance(user): Promise<number> {
    return this.userRepository.getUserBalance(user.id);
  }

  public async deleteUser(user): Promise<void> {
    const queryRunner = await this.prepareUserDataRemovalTransaction(user);

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :userId', { userId: user.id })
      .execute();

    await this.invokeTransaction(queryRunner);

    //TODO: delete files related to user
  }

  public async deleteUserData(user): Promise<void> {
    const queryRunner = await this.prepareUserDataRemovalTransaction(user);

    await this.invokeTransaction(queryRunner);

    //TODO: delete files related to user
  }

  public deductUserBalance(user): Promise<void> {
    const dbUser = this.userRepository.findById(user.id);

    return this.userRepository.deductUserBalance(user.id);
  }

  public getUserById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}
