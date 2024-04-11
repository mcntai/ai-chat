import { IsBoolean, IsString, IsEnum, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { ATTACHMENT_TYPE } from 'common/constants/message';
import { Express } from 'express';
import { ToBoolean } from 'common/decorators/transformers';

export class CreateMessageBaseDto {
  @IsOptional()
  @IsString()
  public readonly chatId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ToBoolean()
  public readonly subscribed: boolean;

  @IsOptional()
  @IsString()
  @ValidateIf(({ attachment }) => attachment !== undefined)
  @IsNotEmpty()
  public readonly text: string;

  @ValidateIf(({ attachment }) => attachment !== undefined)
  @IsEnum(ATTACHMENT_TYPE)
  @IsNotEmpty()
  public readonly attachmentType: ATTACHMENT_TYPE;

  @IsOptional()
  public readonly attachment: Express.Multer.File;
}