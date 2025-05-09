import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CreateDetectedObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';


@ApiTags('objects')

@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @ApiBody({ type: CreateDetectedObjectDto })
  @ResponseMessage("Create a object")
  @Post()
  async create(
    @Body() createDetectedObjectDto: CreateDetectedObjectDto
  ) {

    let newObject = await this.objectsService.create(createDetectedObjectDto);
    return {
      _id: newObject?._id,
      createdAt: newObject?.createdAt
    }
  }

  @Get()
  @ResponseMessage('Fetch List Object with paginate')
  @ApiQuery({ name: 'current', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.objectsService.findAll(+currentPage, +limit, qs);
  }

  @Get('user/:userId')
  @ResponseMessage("Fetch object by user_id")
  async findByUserId(@Param('userId') userId: string) {
    return this.objectsService.findByUserId(userId);
}

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch Object by id")
  async findOne(@Param('id') id: string) {
    const foundContact = await this.objectsService.findOne(id)
    return foundContact
  }

  @ResponseMessage("Update a Object")
  @Patch()
  update(@Body() updateObjectDto) {
    return this.objectsService.update(updateObjectDto);
  }

  @ResponseMessage("Delete a Object")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectsService.remove(id);
  }

}
