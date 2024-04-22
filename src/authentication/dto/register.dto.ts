import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsBoolean()
  @ApiProperty()
  public readonly addCoins: boolean;
}

export class RegisterResponseDto {
  @IsString()
  @ApiProperty()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  public readonly authToken: string;

  @IsString()
  @ApiProperty()
  public readonly accessToken: string;
}