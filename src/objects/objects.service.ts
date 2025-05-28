import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetectedObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DetectedObject, DetectedObjectDocument } from './schemas/object.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(DetectedObject.name) private detectedObjectModel: Model<DetectedObjectDocument>
  ) {}
  async create(createObjectDto: CreateDetectedObjectDto) {
    let newObject = await this.detectedObjectModel.create({
      ...createObjectDto,
    })
    return {
      _id: newObject?._id,
      createdAt: newObject?.createdAt
    }
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * limit;
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.detectedObjectModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.detectedObjectModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hien tai
        pageSize: limit, //so luong ban ghi da lay
        pages: totalPages, //tong so trang voi dieu kien query
        total: totalItems, //tong so phan tu (so ban ghi)
      },
      result, //kết quả query
    };
  }
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException( `Not found object with id ${id}`);
    return this.detectedObjectModel
      .findOne({
        _id: id,
      })
  }
  async update(updateObjectDto) {
    return await this.detectedObjectModel.updateOne(
      { _id: updateObjectDto._id },
      {
        ...updateObjectDto,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException( `Not found object`);
    }
    return this.detectedObjectModel.deleteOne({
      _id: id,
    });
  }

  // async findByUserId(userId: string) {
  //   if (!mongoose.Types.ObjectId.isValid(userId)) {
  //     throw new BadRequestException(`Invalid user_id: ${userId}`);
  //   }
  
  //   return this.detectedObjectModel.find({ user_id: userId }).exec();
  // }
}
