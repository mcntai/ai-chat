import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateChatDTO {
  @IsBoolean()
  @IsOptional()
  public readonly archived: boolean;

  @IsBoolean()
  @IsOptional()
  public readonly pinned: boolean;
}