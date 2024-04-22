import { IsString, IsNotEmpty } from 'class-validator';
import { ACTIVE_AI_TYPE } from 'common/constants/message';

export class ActiveAssistantConfigDto {
  @IsString()
  @IsNotEmpty()
  public readonly aiType: ACTIVE_AI_TYPE;
}