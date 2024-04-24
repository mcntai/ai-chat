import { IsDate, IsString } from 'class-validator';
import { ACTOR, ATTACHMENT_TYPE } from 'common/constants/message';
import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @IsString()
  @ApiProperty()
  public readonly id: string;

  @IsString()
  @ApiProperty({ nullable: true })
  public readonly text: string | null;

  @IsString()
  @ApiProperty({ nullable: true })
  public readonly attachment: string;

  @IsString()
  @ApiProperty({ enum: ATTACHMENT_TYPE, nullable: true })
  public readonly attachmentType: ATTACHMENT_TYPE | null;

  @IsString()
  @ApiProperty({ enum: ACTOR })
  public readonly actor: ACTOR;

  @IsDate()
  @ApiProperty()
  public readonly created: Date;
}