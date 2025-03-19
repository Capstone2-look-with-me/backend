import { Injectable } from '@nestjs/common';
import { CreateRecognitionResultDto } from './dto/create-recognition_result.dto';
import { UpdateRecognitionResultDto } from './dto/update-recognition_result.dto';

@Injectable()
export class RecognitionResultsService {
  create(createRecognitionResultDto: CreateRecognitionResultDto) {
    return 'This action adds a new recognitionResult';
  }

  findAll() {
    return `This action returns all recognitionResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recognitionResult`;
  }

  update(id: number, updateRecognitionResultDto: UpdateRecognitionResultDto) {
    return `This action updates a #${id} recognitionResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} recognitionResult`;
  }
}
