import { IsBoolean, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ToBoolean } from 'common/decorators/transformers';
import { object, string, boolean } from 'sito';

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

export const createMsgValidationSchema = object({
  chatId:     string().notEmpty(),
  subscribed: boolean().required(),
  text:       string().notEmpty().required(),
})
  .notEmpty()
  .required()
  .strict();