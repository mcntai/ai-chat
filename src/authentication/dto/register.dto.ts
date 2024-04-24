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
  @ApiProperty({ description: 'token to be used in request body for /login endpoint' })
  public readonly authToken: string;

  @IsString()
  @ApiProperty({ description: 'token to be used in Authorization header for the following requests' })
  public readonly accessToken: string;
}