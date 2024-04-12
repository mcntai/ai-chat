import { CreateMessageBaseDto } from 'modules/models/message/dtos/create-message-base.dto';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Express } from 'express';
import { OmitType } from '@nestjs/swagger';

export class ScanImageDto extends OmitType(CreateMessageBaseDto, ['text']) {
  @IsOptional()
  @IsString()
  public readonly text?: string;

  public readonly image: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  public readonly language: string;
}