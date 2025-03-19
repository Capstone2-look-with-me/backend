import { PartialType } from '@nestjs/mapped-types';
import { CreateRecognitionResultDto } from './create-recognition_result.dto';

export class UpdateRecognitionResultDto extends PartialType(CreateRecognitionResultDto) {}
