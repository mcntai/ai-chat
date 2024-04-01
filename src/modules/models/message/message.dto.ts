import { IsBoolean, IsString, IsEnum, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { AttachmentType } from './message.entity';
import { Express } from 'express';
import { ToBoolean } from 'common/decorators/transformers';

export class CreateMessageDto {
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
  @IsEnum(AttachmentType)
  @IsNotEmpty()
  public readonly attachmentType: AttachmentType;

  @IsOptional()
  public readonly attachment: Express.Multer.File;
}