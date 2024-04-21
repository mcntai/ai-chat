import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateChatDto {
  @IsBoolean()
  @IsOptional()
  public readonly archived: boolean;

  @IsBoolean()
  @IsOptional()
  public readonly pinned: boolean;

  @IsOptional()
  @IsString()
  public readonly name: string;
}