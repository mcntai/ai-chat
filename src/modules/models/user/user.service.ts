import { Injectable } from '@nestjs/common';
import { UserRepository } from 'modules/models/user/user.repository';
import { User } from 'modules/models/user/user.entity';
import { LinkedAccount } from 'modules/models/linked-account/linked-account.entity';
import { Chat } from 'modules/models/chat/chat.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { FsService } from 'providers/fs/fs.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private dataSource: DataSource,
    private fsService: FsService,
  ) {
  }

  private async invokeTransaction(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw new Error('Transaction failed: ' + err.message);
    } finally {
      await queryRunner.release();
    }
  }

  private async prepareUserDataRemovalTransaction(userId: string): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.delete(LinkedAccount, { owner: userId });

    await queryRunner.manager
      .query(`DELETE FROM Message WHERE chatId IN (SELECT id FROM Chat WHERE ownerId = '${userId}')`);

    await queryRunner.manager.delete(Chat, { owner: userId });

    return queryRunner;
  }

  private async deleteUserFiles(userId): Promise<void> {
    const files = await this.fsService.getFilesNames(userId);

    await this.fsService.delete(files);
  }

  public async getUserBalance(user): Promise<number> {
    const dbUser = await this.userRepository.findById(user.id);

    const coins = dbUser.coins || 0;
    const paidCoins = dbUser.paidCoins || 0;

    return Number(coins + paidCoins);
  }

  public async deleteUser(user): Promise<void> {
    const queryRunner = await this.prepareUserDataRemovalTransaction(user.id);

    await queryRunner.manager.delete(User, { id: user.id });

    await this.invokeTransaction(queryRunner);

    await this.deleteUserFiles(user.id);
  }

  public async deleteUserData(user): Promise<void> {
    const queryRunner = await this.prepareUserDataRemovalTransaction(user.id);

    await this.invokeTransaction(queryRunner);

    await this.deleteUserFiles(user.id);
  }

  public async deductUserBalance(user): Promise<void> {
    await this.userRepository.update(user);
  }
}
