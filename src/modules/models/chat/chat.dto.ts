import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateChatDto {
  @IsBoolean()
  @IsOptional()
  public readonly archived: boolean;

  @IsBoolean()
  @IsOptional()
  public readonly pinned: boolean;
}