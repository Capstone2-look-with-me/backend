import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmergencyContactDto {
  @ApiProperty({
    description: 'ID của user liên kết',
    example: '661cad644d77b8b78f370abb',
  })
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @ApiPropertyOptional({
    description: 'ID của contact nếu có trong danh bạ',
    example: '661dad321cc8f1a57f100caa',
  })
  @IsOptional()
  @IsMongoId()
  contact_id?: string;

  @ApiPropertyOptional({
    description: 'Tên người liên hệ khẩn cấp (nếu nhập tay)',
    example: 'Công An',
  })
  @IsOptional()
  @IsString()
  contact_name?: string;

  @ApiPropertyOptional({
    description: 'Số điện thoại người liên hệ khẩn cấp (nếu nhập tay)',
    example: '113',
  })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
