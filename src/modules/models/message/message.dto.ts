import { IsBoolean } from 'class-validator';

export class CreateMessageDto {
  @IsBoolean()
  public readonly archived: boolean;

  @IsBoolean()
  public readonly pinned: boolean;
}