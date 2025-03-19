import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecognitionResultsService } from './recognition_results.service';
import { CreateRecognitionResultDto } from './dto/create-recognition_result.dto';
import { UpdateRecognitionResultDto } from './dto/update-recognition_result.dto';

@Controller('recognition-results')
export class RecognitionResultsController {
  constructor(private readonly recognitionResultsService: RecognitionResultsService) {}

  @Post()
  create(@Body() createRecognitionResultDto: CreateRecognitionResultDto) {
    return this.recognitionResultsService.create(createRecognitionResultDto);
  }

  @Get()
  findAll() {
    return this.recognitionResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recognitionResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecognitionResultDto: UpdateRecognitionResultDto) {
    return this.recognitionResultsService.update(+id, updateRecognitionResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recognitionResultsService.remove(+id);
  }
}
