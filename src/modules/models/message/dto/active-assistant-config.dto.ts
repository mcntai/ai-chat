import { IsString, IsNotEmpty } from 'class-validator';
import { ACTIVE_AI_TYPE } from 'common/constants/message';
import { ApiProperty } from '@nestjs/swagger';

export class ActiveAssistantConfigDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ACTIVE_AI_TYPE })
  public readonly aiType: ACTIVE_AI_TYPE;
}