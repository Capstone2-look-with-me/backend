import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'ID của user sở hữu contact này',
    example: '661cad644d77b8b78f370abb',
  })
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'Tên contact',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://dichvuxaydung.com.vn/upload/images/210452baoxaydung_image001%20(1)(1).jpg',
    description: 'avatar',
  })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    description: 'Avatar encoding là danh sách các vector 128 số thực được sinh ra từ ảnh',
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
  avatar_encoding: number[][];
}
