import { Injectable } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';

@Injectable()
export class ObjectsService {
  create(createObjectDto: CreateObjectDto) {
    return 'This action adds a new object';
  }

  findAll() {
    return `This action returns all objects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} object`;
  }

  update(id: number, updateObjectDto: UpdateObjectDto) {
    return `This action updates a #${id} object`;
  }

  remove(id: number) {
    return `This action removes a #${id} object`;
  }
}
