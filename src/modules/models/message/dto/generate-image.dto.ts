import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateMessageBaseDto } from 'modules/models/message/dto/create-message-base.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { OPEN_AI_IMAGE_RESOLUTION } from 'common/constants/message';

export class GenerateImageDto extends OmitType(CreateMessageBaseDto, ['text']) {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  public readonly text?: string;

  @ApiProperty({ enum: OPEN_AI_IMAGE_RESOLUTION })
  @IsIn(Object.values(OPEN_AI_IMAGE_RESOLUTION))
  public readonly size: OPEN_AI_IMAGE_RESOLUTION;
}