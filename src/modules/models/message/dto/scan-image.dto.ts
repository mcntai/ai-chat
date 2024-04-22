import { CreateMessageBaseDto } from 'modules/models/message/dto/create-message-base.dto';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Express } from 'express';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class ScanImageDto extends OmitType(CreateMessageBaseDto, ['text']) {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  public readonly text?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  public readonly image: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  public readonly language: string;
}