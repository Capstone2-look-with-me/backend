import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';

@ApiTags('images')

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiBody({ type: CreateImageDto })
  @ResponseMessage("Create a image")
  @Post()
  async create(
    @Body() createImageDto: CreateImageDto
  ) {

    let newImage = await this.imagesService.create(createImageDto);
    return {
      _id: newImage?._id,
      createdAt: newImage?.createdAt
    }
  }

  @Get()
  @ResponseMessage('Fetch List Image with paginate')
  @ApiQuery({ name: 'current', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.imagesService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get('user/:userId')
  @ResponseMessage("Fetch image by user_id")
  async findByUserId(@Param('userId') userId: string) {
    return this.imagesService.findByUserId(userId);
}
  @Public()
  @Get(':id')
  @ResponseMessage("Fetch Image by id")
  async findOne(@Param('id') id: string) {
    const foundImage = await this.imagesService.findOne(id)
    return foundImage
  }

  @ResponseMessage("Update a Image")
  @Patch()
  update(@Body() updateImageDto) {
    return this.imagesService.update(updateImageDto);
  }

  @ResponseMessage("Delete a Image")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }

}
