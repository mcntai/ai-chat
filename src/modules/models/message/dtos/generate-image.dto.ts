import { OmitType } from '@nestjs/swagger';
import { CreateMessageBaseDto } from 'modules/models/message/dtos/create-message-base.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { OPEN_AI_IMAGE_RESOLUTION } from 'common/constants/message';

export class GenerateImageDto extends OmitType(CreateMessageBaseDto, ['text']) {
  @IsOptional()
  @IsString()
  public readonly text?: string;

  @IsIn(Object.values(OPEN_AI_IMAGE_RESOLUTION))
  public readonly size: OPEN_AI_IMAGE_RESOLUTION;
}