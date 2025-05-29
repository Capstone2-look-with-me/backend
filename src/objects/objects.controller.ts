import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CreateDetectedObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import type { Cache } from 'cache-manager'; 
import { RedisService } from 'src/redis/redis.service';

@ApiTags('objects')

@Controller('objects')
export class ObjectsController {
  constructor(
    private readonly objectsService: ObjectsService,
    // @Inject('CACHE_MANAGER') private cacheManager: Cache
    // private readonly redisService: RedisService
  ) {}

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
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sắp xếp danh sách theo tên biến. Sử dụng `+name` để sắp xếp tăng dần, `-name` để sắp xếp giảm dần.',
  })

  @ApiQuery({
    name: 'object_name',
    required: false,
    description: '(e.g: /ReactJs/i)',
    type: String,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: '(e.g: /ReactJs/i)',
    type: String,
  })
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.objectsService.findAll(+currentPage, +limit, qs);
  }

//   @Get('user/:userId')
//   @ResponseMessage("Fetch object by user_id")
//   async findByUserId(@Param('userId') userId: string) {
//     return this.objectsService.findByUserId(userId);
// }
// @Public()
// @Get('set')
// async setCache() {
//   await this.redisService.set ('hello', 'world'); // TTL 60s
//   return '✅ Saved to Redis!';
// }

// @Public()
// @Get('get')
// async getCache() {
//   const value = await this.redisService.get('hello');
//   return value ? `🌍 Value: ${value}` : '❌ Key not found';
// }
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
