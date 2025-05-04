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
    description: 'Link avatar (tuỳ chọn)',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'Avartar encoding là vector 128 số thực được sinh ra từ ảnh',
    example: Array(128).fill(0).map((_, i) => parseFloat((Math.random() * 2 - 1).toFixed(5))),
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  avatar_encoding: number[];
}
