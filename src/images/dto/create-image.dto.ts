import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({
    description: 'ID của user sở hữu hình ảnh này',
    example: '661cad644d77b8b78f370abb',
  })
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'URL hình ảnh',
    example: 'https://example.com/photo.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;
}

