import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { FsModule } from 'providers/fs/fs.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FsModule],
  controllers: [UserController],
  providers:   [UserRepository, UserService],
  exports:     [UserRepository, UserService],
})
export class UserModule {
}