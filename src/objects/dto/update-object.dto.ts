import { PartialType } from '@nestjs/mapped-types';
import { CreateDetectedObjectDto } from './create-object.dto';

export class UpdateObjectDto extends PartialType(CreateDetectedObjectDto) {}
