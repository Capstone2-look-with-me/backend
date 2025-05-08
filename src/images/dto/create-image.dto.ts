import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  
  @ApiProperty({
    description: 'Image encoding là danh sách các vector 128 số thực được sinh ra từ ảnh',
    example: [
      Array(128).fill(0).map(() => parseFloat((Math.random() * 2 - 1).toFixed(5)))
    ],
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'number' },
    },
  })
  @IsArray()
  @IsArray({ each: true })
  @IsNumber({}, { each: true })
  image_encoding: number[][];
  
}

