import { IsBoolean } from 'class-validator';

export class UpdateChatDTO {
  @IsBoolean()
  public readonly archived: boolean;

  @IsBoolean()
  public readonly pinned: boolean;
}