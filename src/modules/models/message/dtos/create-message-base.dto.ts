import { IsBoolean, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ToBoolean } from 'common/decorators/transformers';

export class CreateMessageBaseDto {
  @IsOptional()
  @IsString()
  public readonly chatId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ToBoolean()
  public readonly subscribed: boolean;

  @IsString()
  @IsNotEmpty()
  public readonly text: string;
}