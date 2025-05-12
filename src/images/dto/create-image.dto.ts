import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
    description: 'Mảng mã hóa image (2 chiều)',
    type: 'number[][]',
    example: [
      [
        -0.16458487510681152,
        0.07462839782238007,
        0.035795342177152634,
        -0.09185375273227692,
        -0.11347272992134094
      ]
    ]
  })
  @IsArray()
  @IsOptional()
  image_encoding: number[][];
  
}

