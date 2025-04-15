import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: '012332222',
    description: 'oldPassword',
  })
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: '233333',
    description: 'newPassword',
  })
  newPassword: string;
}
