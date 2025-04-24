import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schemas/image.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>
  ) {}
  async create(createImageDto: CreateImageDto) {
    let newImage = await this.imageModel.create({
      ...createImageDto,
    })
    return {
      _id: newImage?._id,
      createdAt: newImage?.createdAt
    }
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * limit;
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.imageModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.imageModel
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
      throw new BadRequestException( `Not found image with id ${id}`);
    return this.imageModel
      .findOne({
        _id: id,
      })
  }
  async update(updateImageDto) {
    return await this.imageModel.updateOne(
      { _id: updateImageDto._id },
      {
        ...updateImageDto,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException( `Not found image`);
    }
    return this.imageModel.deleteOne({
      _id: id,
    });
  }
}
