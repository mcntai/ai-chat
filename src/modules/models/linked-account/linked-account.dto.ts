import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { AccountType } from 'modules/models/linked-account/linked-account.interface';

export class CreateLinkedAccountDTO {
  @IsEnum(AccountType, { message: `type must be one of ${Object.values(AccountType).join(',')}` })
  @IsNotEmpty()
  public readonly type: AccountType;

  @IsString()
  @IsNotEmpty()
  public readonly identifier: string;
}