import { PartialType } from '@nestjs/mapped-types';
import { CreateObjectDto } from './create-object.dto';

export class UpdateObjectDto extends PartialType(CreateObjectDto) {}
