import { IsBoolean, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ToBoolean } from 'common/decorators/transformers';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageBaseDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  public readonly chatId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ToBoolean()
  @ApiProperty()
  public readonly subscribed: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly text: string;
}