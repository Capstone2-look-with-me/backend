import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecognitionResultsService } from './recognition_results.service';
import { CreateRecognitionResultDto } from './dto/create-recognition_result.dto';
import { UpdateRecognitionResultDto } from './dto/update-recognition_result.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';

@ApiTags('recognition-results')
@Controller('recognition-results')
export class RecognitionResultsController {
  constructor(private readonly recognitionResultsService: RecognitionResultsService) { }
  @ApiBody({ type: CreateRecognitionResultDto })
  @ResponseMessage("Create a recognition result")
  @Post()
  async create(
    @Body() createRecognitionResultDto: CreateRecognitionResultDto
  ) {

    let newRecognitionResults = await this.recognitionResultsService.create(createRecognitionResultDto);
    return {
      _id: newRecognitionResults?._id,
      createdAt: newRecognitionResults?.createdAt
    }
  }

  @Get()
  @ResponseMessage('Fetch List Recognition Result with paginate')
  @ApiQuery({ name: 'current', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sắp xếp danh sách theo tên biến. Sử dụng `+name` để sắp xếp tăng dần, `-name` để sắp xếp giảm dần.',
  })
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.recognitionResultsService.findAll(+currentPage, +limit, qs);
  }

  @Get('image/:imageId')
  @ResponseMessage("Fetch recognition result by image_id")
  async findByImageId(@Param('imageId') imageId: string) {
    return this.recognitionResultsService.findByImageId(imageId);
  }

  
  @Get('detected_object/:detectedObjecId')
  @ResponseMessage("Fetch recognition result by detected_object_id")
  async findByDetectedObjectId(@Param('detectedObjecId') detectedObjecId: string) {
    return this.recognitionResultsService.findByDetectedObjectId(detectedObjecId);
  }

  @Get('detected_person/:detectedPersonId')
  @ResponseMessage("Fetch recognition result by detected_person_id")
  async findByDetectedPersonId(@Param('detectedPersonId') detectedPersonId: string) {
    return this.recognitionResultsService.findByDetectedPersonId(detectedPersonId);
  }

  
  @Public()
  @Get(':id')
  @ResponseMessage("Fetch Recognition Result by id")
  async findOne(@Param('id') id: string) {
    const found = await this.recognitionResultsService.findOne(id)
    return found
  }

  @ResponseMessage("Update a Recognition Result")
  @Patch()
  update(@Body() updateRecognitionResultDto) {
    return this.recognitionResultsService.update(updateRecognitionResultDto);
  }

  @ResponseMessage("Delete a Recognition Result")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recognitionResultsService.remove(id);
  }

}
