import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsBoolean()
  public readonly addCoins: boolean;
}

export class RegisterResponseDto {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly authToken: string;

  @IsString()
  public readonly accessToken: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  public readonly authToken: string;
}