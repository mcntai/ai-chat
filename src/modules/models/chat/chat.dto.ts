import { IsBoolean, IsOptional, IsString, IsArray, IsDate } from 'class-validator';
import { MessageResponseDto } from 'modules/models/message/dto/get-message-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly archived: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly pinned: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly name: string;
}

export class ChatBaseResponseDto {
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

export class ChatUpdatedResponseDto extends ChatBaseResponseDto {
  @IsDate()
  @ApiProperty()
  public readonly updated: Date;
}

export class ChatWithMessagesResponseDto extends ChatBaseResponseDto {
  @IsArray()
  @ApiProperty({ type: MessageResponseDto, isArray: true })
  public readonly messages: MessageResponseDto[];
}