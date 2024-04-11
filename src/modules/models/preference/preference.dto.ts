import { IsArray, ArrayNotEmpty, IsObject, IsNotEmpty } from 'class-validator';

export class AiHandlersConfigSchema {
  @IsArray()
  @ArrayNotEmpty()
  all: string[];

  @IsObject()
  @IsNotEmpty()
  active: object;
}