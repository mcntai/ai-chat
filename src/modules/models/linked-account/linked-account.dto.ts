import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { AccountType } from 'modules/models/linked-account/linked-account.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkedAccountDto {
  @IsEnum(AccountType)
  @IsNotEmpty()
  @ApiProperty()
  public readonly type: AccountType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly identifier: string;
}

export class CreateLinkedAccountResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly externalId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly ownerId: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  @ApiProperty()
  public readonly type: AccountType;
}