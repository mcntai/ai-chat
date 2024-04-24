import { IsBoolean, IsOptional, IsString, IsArray, IsDate } from 'class-validator';
import { MessageResponseDto } from 'modules/models/message/dto/get-message-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @IsBoolean()
  @IsOptional()
  public readonly archived: boolean;

  @IsBoolean()
  @IsOptional()
  public readonly pinned: boolean;

  @IsOptional()
  @IsString()
  public readonly name: string;
}

export class GetChatBaseResponseDto {
  @IsString()
  @ApiProperty()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsBoolean()
  @ApiProperty()
  public readonly archived: boolean;

  @IsBoolean()
  @ApiProperty()
  public readonly pinned: boolean;

  @IsDate()
  @ApiProperty()
  public readonly created: Date;
}

export class GetChatResponseDto extends GetChatBaseResponseDto {
  @IsArray()
  @ApiProperty({ type: MessageResponseDto, isArray: true })
  public readonly messages: MessageResponseDto[];
}