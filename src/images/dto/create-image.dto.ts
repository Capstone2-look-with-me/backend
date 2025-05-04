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
    description: 'Image encoding là vector 128 số thực được sinh ra từ ảnh',
    example: Array(128).fill(0).map((_, i) => parseFloat((Math.random() * 2 - 1).toFixed(5))),
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  image_encoding: number[];
}

