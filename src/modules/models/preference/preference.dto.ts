import { IsString, IsArray, ArrayNotEmpty, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AiServiceConfig {
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['openai'], { each: true })
  all: string[];

  @IsString()
  default: string;
}

export class AiServicesSchemaDTO {
  @ValidateNested()
  @Type(() => AiServiceConfig)
  text: AiServiceConfig;

  @ValidateNested()
  @Type(() => AiServiceConfig)
  image: AiServiceConfig;
}