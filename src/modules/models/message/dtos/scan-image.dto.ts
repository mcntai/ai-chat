import { CreateMessageBaseDto } from 'modules/models/message/dtos/create-message-base.dto';
import { IsOptional, IsString } from 'class-validator';
import { Express } from 'express';
import { OmitType } from '@nestjs/swagger';

export class ScanImageDto extends OmitType(CreateMessageBaseDto, ['text']) {
  @IsOptional()
  @IsString()
  public readonly text?: string;

  public readonly attachment: Express.Multer.File;
}