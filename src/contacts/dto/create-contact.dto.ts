import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional, IsString } from 'class-validator';

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
}
