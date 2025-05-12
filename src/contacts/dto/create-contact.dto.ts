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
    description: 'Mảng mã hóa avatar (2 chiều)',
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
  avatar_encoding: number[][];
}
