import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { AccountType } from 'modules/models/linked-account/linked-account.interface';

export class CreateLinkedAccountDTO {
  @IsEnum(AccountType)
  @IsNotEmpty()
  public readonly type: AccountType;

  @IsString()
  @IsNotEmpty()
  public readonly identifier: string;
}