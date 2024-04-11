import { IsString } from 'class-validator';

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
  public readonly authToken: string;
}