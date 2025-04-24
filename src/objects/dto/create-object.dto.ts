import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDetectedObjectDto {
  @ApiProperty({ description: 'Name of the detected object', example: 'Bottle' })
  @IsString()
  @IsNotEmpty()
  object_name: string;

  @ApiProperty({ description: 'Category of the detected object', example: 'Plastic', required: false })
  @IsOptional()
  @IsString()
  category?: string;
}
