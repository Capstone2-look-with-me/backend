import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRecognitionResultDto {
  @ApiProperty({
    description: 'ID của hình ảnh',
    example: '6620123456abcdef12345678',
  })
  @IsMongoId()
  @IsNotEmpty()
  image_id: string;

  @ApiPropertyOptional({
    description: 'ID của đối tượng được phát hiện (nếu có)',
    example: '6620aabbccdd112233445566',
  })
  @IsOptional()
  @IsMongoId()
  detected_object_id?: string;

  @ApiProperty({
    description: 'Độ chính xác của nhận diện đối tượng',
    example: 0.92,
  })
  @IsNumber()
  confidence: number;

  @ApiPropertyOptional({
    description: 'ID của người được phát hiện (nếu có)',
    example: '6620ddeeff00112233445566',
  })
  @IsOptional()
  @IsMongoId()
  detected_person_id?: string;


}
